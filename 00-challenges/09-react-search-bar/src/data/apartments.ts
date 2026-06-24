export interface Apartment {
  id: string;
  address: string;
}

// Internal dataset standing in for the Travel app's backend. Swap this module
// (or `src/api/searchApartments.ts`) for a real API call if you'd like.
export const apartments: Apartment[] = [
  { id: "1", address: "123 ABC Street, New York, USA" },
  { id: "2", address: "789 PQR Avenue, New York, USA" },
  { id: "3", address: "45 Baker Street, London, UK" },
  { id: "4", address: "221B Marylebone Road, London, UK" },
  { id: "5", address: "12 Rue de Rivoli, Paris, France" },
  { id: "6", address: "8 Champs-Élysées, Paris, France" },
  { id: "7", address: "100 Market Street, San Francisco, USA" },
  { id: "8", address: "55 Mission Street, San Francisco, USA" },
  { id: "9", address: "30 Collins Street, Melbourne, Australia" },
  { id: "10", address: "7 Shibuya Crossing, Tokyo, Japan" },
  { id: "11", address: "19 Gran Via, Madrid, Spain" },
  { id: "12", address: "64 Unter den Linden, Berlin, Germany" },
  { id: "13", address: "9 Nyhavn, Copenhagen, Denmark" },
  { id: "14", address: "42 Yonge Street, Toronto, Canada" },
  { id: "15", address: "3 Praça do Comércio, Lisbon, Portugal" },
];
