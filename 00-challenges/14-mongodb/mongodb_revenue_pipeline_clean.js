/**
 * Revenue Per Prop Aggregation Pipeline
 *
 * Builds a MongoDB aggregation pipeline that calculates revenue earned by each
 * prop over a given time period.
 *
 * The data model:
 *   prop  ──< order.line.inventoryID   (orders reference the props they include)
 *   order ──< invoices[]                (invoices live on orders, not on props)
 *
 * An invoice payment is allocated proportionally to each prop in that order
 * based on (this prop's rentalCost × quantity) / (order's propTotal).
 *
 * Pipeline shape change at each stage:
 *
 *   N props → $match (≤N) → $project (≤N, slimmer)
 *           → $lookup    (≤N, each with filteredOrders[])
 *           → $unwind    (N×M docs, one per prop-order pair)
 *           → $addFields (compute itemRevenue per pair)
 *           → $group     (back to ≤N, with totalRevenue summed)
 *           → $addFields (PO totals, edge-case handling)
 *           → $match     (drop zero-revenue props)
 */

function buildRevenuePipeline(data) {
  let propInvRevFilter = [
    { $ne: ["$$invoice.voided", true] },
    { $ne: ["$$invoice.type", "ld"] },
  ];

  if (data.addCriteria && data.addCriteria.createOn) {
    propInvRevFilter.push({
      $gte: ["$$invoice.createOn", data.addCriteria.createOn.$gte],
    });
    propInvRevFilter.push({
      $lte: ["$$invoice.createOn", data.addCriteria.createOn.$lte],
    });
  }

  let aggreg = [];

  aggreg.push({ $match: data.criteria });

  aggreg.push(
    {
      $project: {
        code: 1,
        description: 1,
        type: 1,
        owned: 1,
        calculatedDV: 1,
        replacementCost: 1,
        rentalCost: 1,
        location: 1,
        po: 1,
        lastRented: 1,
      },
    },

    {
      $lookup: {
        from: "order",
        localField: "_id",
        foreignField: "line.inventoryID",
        as: "filteredOrders",
        pipeline: [
          {
            $match: {
              invoices: { $exists: true, $type: "array", $ne: [] },
              "line.inventoryID": { $exists: true },
            },
          },

          {
            $addFields: {
              __tempFilteredInvoices: {
                $filter: {
                  input: "$invoices",
                  as: "invoice",
                  cond: { $and: propInvRevFilter },
                },
              },
            },
          },

          {
            $match: {
              $expr: { $gt: [{ $size: "$__tempFilteredInvoices" }, 0] },
            },
          },

          {
            $project: {
              line: 1,
              propTotal: 1,
              rental: 1,
              invoices: "$__tempFilteredInvoices",
            },
          },
        ],
      },
    },

    { $unwind: "$filteredOrders" },

    {
      $addFields: {
        itemRevenue: {
          $let: {
            vars: {
              fLines: {
                $filter: {
                  input: "$filteredOrders.line",
                  as: "fl",
                  cond: { $eq: ["$$fl.inventoryID", "$_id"] },
                },
              },
              totalAmountSum: {
                $reduce: {
                  input: "$filteredOrders.invoices",
                  initialValue: 0,
                  in: { $add: ["$$this.amount", "$$value"] },
                },
              },
            },
            in: {
              $let: {
                vars: {
                  totalLineRentalCost: {
                    $sum: {
                      $map: {
                        input: "$$fLines",
                        as: "fLine",
                        in: {
                          $multiply: ["$$fLine.rentalCost", "$$fLine.quantity"],
                        },
                      },
                    },
                  },
                },
                in: {
                  $round: [
                    {
                      $multiply: [
                        {
                          $cond: [
                            { $eq: ["$filteredOrders.propTotal", 0] },
                            0,
                            {
                              $divide: [
                                "$$totalLineRentalCost",
                                "$filteredOrders.propTotal",
                              ],
                            },
                          ],
                        },
                        "$$totalAmountSum",
                      ],
                    },
                    2,
                  ],
                },
              },
            },
          },
        },
      },
    },

    {
      $group: {
        _id: "$_id",
        code: { $first: "$code" },
        description: { $first: "$description" },
        totalRevenue: { $sum: "$itemRevenue" },
        owned: { $first: "$owned" },
        replacementCost: { $first: "$replacementCost" },
        rentalCost: { $first: "$rentalCost" },
        location: { $first: "$location" },
        acquisitionType: { $first: "$po.acquisitionType" },
        acquisitionDate: { $first: "$po.acquisitionDate" },
        po: { $first: "$po" },
        lastRented: { $first: "$lastRented" },
      },
    },

    {
      $addFields: {
        totalQty: {
          $reduce: {
            input: "$po",
            initialValue: 0,
            in: { $add: ["$$value", "$$this.qty"] },
          },
        },
        poLength: { $size: "$po" },
      },
    },

    {
      $addFields: {
        acquisitionType: {
          $cond: {
            if: {
              $and: [{ $gt: ["$totalQty", 1] }, { $gt: ["$poLength", 1] }],
            },
            then: "various",
            else: { $arrayElemAt: ["$po.acquisitionType", 0] },
          },
        },
        acquisitionDate: {
          $cond: {
            if: {
              $and: [{ $gt: ["$totalQty", 1] }, { $gt: ["$poLength", 1] }],
            },
            then: "various",
            else: { $arrayElemAt: ["$po.acquisitionDate", 0] },
          },
        },
        purchaseCost: {
          $cond: {
            if: {
              $and: [{ $gt: ["$totalQty", 1] }, { $gt: ["$poLength", 1] }],
            },
            then: "various",
            else: { $arrayElemAt: ["$po.purchaseCost", 0] },
          },
        },
      },
    },

    { $match: { totalRevenue: { $gt: 0 } } },
  );

  return aggreg;
}

// =============================================================================
// Test runner — produces the pipeline as JSON so you can read the final shape
// =============================================================================
//
// The catalog uses a 3-level taxonomy: group → class → type
// Real examples from the ISSProps catalog you can swap in:
//
//   Group only:
//     { group: "ELEC" }                                    // all electronics
//     { group: "WEPN" }                                    // all weapons
//     { group: "MEDI" }                                    // all medical/lab
//     { group: "SPRT" }                                    // all sports
//
//   Group + class:
//     { group: "ELEC", class: "VIDE" }                     // video & photographic
//     { group: "ELEC", class: "COMP" }                     // computer equipment
//     { group: "MEDI", class: "HOSP" }                     // hospital equipment
//     { group: "WEPN", class: "KNIV" }                     // knives & daggers
//     { group: "SETD", class: "FURN" }                     // set dressing furniture
//
//   Group + class + type (the deepest filter — single leaf category):
//     { group: "ELEC", class: "VIDE", type: "TVS" }        // televisions
//     { group: "ELEC", class: "VIDE", type: "CAM3" }       // 35mm cameras
//     { group: "BUSI", class: "MACH", type: "TYPE" }       // typewriters
//     { group: "WEPN", class: "KNIV", type: "TACT" }       // tactical knives
//     { group: "ANML", class: "PETS", type: "MISC" }       // misc pet supplies
//     { group: "MEDI", class: "HOSP", type: "OPER" }       // operating room items

const testData = {
  // Try this: ELEC > VIDE > TVS — televisions, a deep leaf filter.
  // Edit any of these three fields to test different parts of the taxonomy.
  criteria: {
    group: "ELEC",
    class: "VIDE",
    type: "TVS",
  },

  // Date window for invoice revenue (Q1 2026 in this example).
  // Comment out the whole `addCriteria` block to see how the pipeline
  // changes when no date range is provided — the two date filters at the
  // top of buildRevenuePipeline get skipped.
  addCriteria: {
    createOn: {
      $gte: new Date("2026-01-01"),
      $lte: new Date("2026-04-01"),
    },
  },
};

const pipeline = buildRevenuePipeline(testData);

console.log("=== Generated MongoDB Aggregation Pipeline ===\n");
console.log(JSON.stringify(pipeline, null, 2));
console.log("\n=== Stage count:", pipeline.length, "===");

// =============================================================================
// Other test cases worth running — uncomment one block at a time
// =============================================================================

// // Broader filter — group only, no class/type
// const testData = {
//   criteria: { group: "WEPN" },
//   addCriteria: {
//     createOn: {
//       $gte: new Date("2026-01-01"),
//       $lte: new Date("2026-04-01"),
//     },
//   },
// };

// // No date range — see how the conditional `if` block is skipped
// const testData = {
//   criteria: { group: "ELEC", class: "COMP", type: "LAPT" },
//   // no addCriteria field at all
// };

// // Just two of the three taxonomy levels
// const testData = {
//   criteria: { group: "MEDI", class: "HOSP" },
//   addCriteria: {
//     createOn: {
//       $gte: new Date("2025-10-01"),
//       $lte: new Date("2026-01-01"),
//     },
//   },
// };
