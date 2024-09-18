export type DetailedCity = {
  country: string;
  lat: number;
  local_names: unknown;
  lon: number;
  name: string;
};

export type City = Omit<DetailedCity, 'local_names' | 'lat' | 'lon'>;
