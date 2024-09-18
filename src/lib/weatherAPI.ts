import axios from 'axios';

import { DetailedCity } from '@/types/city';
import { ForecastData } from '@/types/forecast';
import { WeatherData } from '@/types/weather';

export const apiFetchCoordinates = async (
  city: string,
): Promise<DetailedCity[]> => {
  const geoResponse = await axios.get(`/api/coordinates?city=${city}`);
  return geoResponse.data;
};

export const apFetchWeather = async (
  city: string,
  country: string,
): Promise<WeatherData> => {
  const response = await axios.get(
    `/api/weather?city=${city}&country=${country}`,
  );
  return response.data;
};

export const apFetchForecast = async (
  city?: string,
  country?: string,
): Promise<ForecastData> => {
  const response = await axios.get(
    `/api/forecast?city=${city}&country=${country}`,
  );
  return response.data;
};
