interface Coord {
  lat: number;
  lon: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  city: City;
  list: ForecastItem[];
}
