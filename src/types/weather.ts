export interface WeatherPayload {
  cod: string;
  message: number;
  city: {
    name: string;
  }
  list: {
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    visibility: number;
    wind: {
      speed: number;
    }
  }[]
}

export interface WeatherList {
  day: string;
  description: string;
  dt: number;
  feels_like: string;
  icon: string;
  humidity: number;
  pressure: number;
  time: string;
  temp: string;
  temp_max: string;
  temp_min: string;
  visibility: number;
  wind: string;
}

export interface WeatherTransformedData {
  city: string;
  list: WeatherList[]
}

export interface ForecastInfo {
  label: string;
  icon: string;
  forecast: string | number;
}

export interface Forecast {
  feels_like: ForecastInfo;
  humidity: ForecastInfo;
  pressure: ForecastInfo;
  visibility: ForecastInfo;
  wind: ForecastInfo;
}