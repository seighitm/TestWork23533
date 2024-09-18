import { ForecastItem } from '@/types/forecast';

export type ForecastGroupedByDate = {
  [date: string]: ForecastItem[];
};

export const groupForecastByDate = (
  weatherList: ForecastItem[],
): ForecastGroupedByDate => {
  return weatherList.reduce(
    (acc: ForecastGroupedByDate, current: ForecastItem) => {
      const date = current.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(current);
      return acc;
    },
    {},
  );
};
