import { apartments } from "../data/apartments";
import type { Apartment } from "../data/apartments";

export type { Apartment };

// Simulates a backend search endpoint: filters the internal dataset by address
// and resolves after a short delay so the UI behaves like a real network call.
export function searchApartments(query: string): Promise<Apartment[]> {
  const q = query.trim().toLowerCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!q) {
        resolve([]);
        return;
      }
      resolve(apartments.filter((a) => a.address.toLowerCase().includes(q)));
    }, 120);
  });
}
