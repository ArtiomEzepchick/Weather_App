import { ObjectType } from "../commonTypes"

export type ApiWeatherType = ObjectType
export type ForecastLabelsType = ObjectType

export interface UserLocation {
  city: string;
  county: string;
  country_geoname_id: number;
  country_code: string;
  ip_address: string;
  latitude: number;
  longitude: number;
  region: string;
}

export interface SearchOption {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

export interface OpenWeatherDaysPayload {
  cod: string;
  city: {
    name: string;
    country: string;
    timezone: number;
  };
  list: {
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
}

export interface OpenWeatherCurrentDayPayload {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  visibility: number;
  wind: {
    speed: number;
  };
}

export interface OpenWeatherCombinedPayload extends OpenWeatherDaysPayload {
  description: string;
  icon: string;
  temp: number;
  humidity: number;
  feels_like: number;
  pressure: number;
  wind: number;
  visibility: number;
}

export interface WeatherApiPayload {
  location: {
    localtime: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    pressure_mb: number;
    humidity: number;
    feelslike_c: number;
    vis_km: number;
  };
  forecast: {
    forecastday: {
      date: string;
      hour: {
        time: string;
        temp_c: number;
        condition: {
          icon: string;
          code: number;
          text: string;
        }
      }[]
    }[]
  }
}

export interface WeatherList {
  id: string;
  icon: string;
  temp: string;
  description: string;
  day?: string;
  calendarDay?: string;
  tempMin?: string;
  time?: string;
}

export interface WeatherTransformedData {
  id: string;
  city: string;
  chosenWeatherApi: string;
  description: string;
  lastUpdate: Date;
  icon: string;
  iconId: string;
  timezone?: number;
  tzId?: string;
  temp: string;
  humidity: number;
  feelsLike: string;
  pressure: number;
  wind: string;
  visibility: number;
  list: WeatherList[];
}

export interface ForecastData {
  label: string;
  icon: string;
  forecast: string | number;
}

export interface Forecast {
  feelsLike: ForecastData;
  humidity: ForecastData;
  pressure: ForecastData;
  visibility: ForecastData;
  wind: ForecastData;
}