export type Coordinates = {
  lon: number;
  lat: number;
};

export type Clouds = {
  all: number;
};

export type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
};

export type SystemData = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Wind = {
  speed: number;
  deg: number;
  gust?: number;
};

export type WeatherData = {
  coord: Coordinates;
  base: string;
  clouds: Clouds;
  cod: number;
  dt: number;
  id: number;
  main: MainWeatherData;
  name: string;
  sys: SystemData;
  timezone: number;
  visibility: number;
  weather: WeatherCondition[];
  wind: Wind;
};
