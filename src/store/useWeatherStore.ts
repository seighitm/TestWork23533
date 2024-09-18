import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { City } from '@/types/city';

export interface WeatherState {
  selectedCity: City | null;
  favorites: City[];
}

export interface WeatherActions {
  setSelectedCity: (city: City | null) => void;
  addFavorite: (city: City) => void;
  removeFavorite: (city: City) => void;
}

export const useWeatherStore = create<WeatherState & WeatherActions>()(
  persist(
    (set, get) => ({
      favorites: [],
      selectedCity: null,
      currentCity: null,
      addFavorite: (city) => {
        if (
          get().favorites.find(
            (c) => c.name === city.name && c.country === city.country,
          ) === undefined
        ) {
          set((state) => ({
            favorites: [...state.favorites, city],
          }));
        }
      },
      setSelectedCity: (city) => {
        set(() => ({ selectedCity: city }));
      },
      removeFavorite: (city) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (c) => !(c.name === city.name && c.country === city.country),
          ),
        }));
      },
    }),
    {
      name: 'weather-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
