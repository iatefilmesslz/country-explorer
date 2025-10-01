import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Country } from "../types/country";

interface FavState {
  favorites: Country[];
  add: (c: Country) => void;
  remove: (cca3: string) => void;
  toggle: (c: Country) => void;
  isFavorite: (cca3: string) => boolean;
}

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (c) =>
        set((s) => ({
          favorites: [
            ...s.favorites.filter((f) => f.cca3 !== c.cca3),
            c,
          ],
        })),
      remove: (cca3) =>
        set((s) => ({
          favorites: s.favorites.filter((f) => f.cca3 !== cca3),
        })),
      toggle: (c) => {
        const exists = get().favorites.find((f) => f.cca3 === c.cca3);
        if (exists) get().remove(c.cca3);
        else get().add(c);
      },
      isFavorite: (cca3) =>
        Boolean(get().favorites.find((f) => f.cca3 === cca3)),
    }),
    { name: "favorites-storage" }
  )
);
