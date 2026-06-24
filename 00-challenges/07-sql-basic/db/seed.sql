-- Sample data for the Billing Software Report exercise.
-- Transcribed to match the assessment screenshots as closely as possible:
--   customers       -> 01-sql-basic/20260614_235040.jpg
--   balances        -> 01-sql-basic/20260614_235045.jpg
--   expected output -> 01-sql-basic/20260614_235050.jpg
--
-- All 20 customers have a balance. 8 are positive, 12 are negative. The
-- balances are intentionally scrambled relative to customer id.

INSERT INTO customers (id, iban) VALUES
  (1,  'FR03 8308 7233 40BK 6LHY HTTI 296'),
  (2,  'KZ55 828R LAKG RRTR MGEH'),
  (3,  'DE93 3002 5100 5869 7389 68'),
  (4,  'IL16 2899 3640 4350 6827 897'),
  (5,  'FO73 7625 1325 8044 80'),
  (6,  'PS22 XKTA RNGY CCDN S68S G5YE HRUP E'),
  (7,  'CZ07 8963 5878 7630 6909 2236'),
  (8,  'SE05 1B65 4389 1326 4897 5396'),
  (9,  'SA21 31QH BPI3 K6IB WHGV GJTD'),
  (10, 'KZ87 4246 EWPW SLEO 4CP6'),
  (11, 'BH89 IWIF WKDM SQA4 F4SN ZO'),
  (12, 'CR74 4202 2115 4767 9001 2'),
  (13, 'BE23 7638 2407 6334'),
  (14, 'CH69 1970 70AU 5LSO QJ4T L'),
  (15, 'FR10 4201 1613 36JQ TWTP 76NO 751'),
  (16, 'FR65 6231 0678 121K DPZV WE7M NO5'),
  (17, 'MD78 ECGU XQST I8LF DRIK 4JRH'),
  (18, 'PT19 6035 6448 2662 1157 2219 8'),
  (19, 'CR95 5363 9756 8790 5129 9'),
  (20, 'HU48 3940 8443 3966 8531 7180 7191');

INSERT INTO balances (customer_id, amount) VALUES
  (1,  14.86),
  (2,  -22.86),
  (3,  -30.95),
  (4,  79.53),
  (5,  67.06),
  (6,  -98.74),
  (7,  -24.60),
  (8,  -63.43),
  (9,  -98.04),
  (10, 4.81),
  (11, -65.31),
  (12, -63.86),
  (13, 86.78),
  (14, -62.09),
  (15, -29.37),
  (16, -51.83),
  (17, 36.77),
  (18, 97.04),
  (19, 5.65),
  (20, -61.38);
