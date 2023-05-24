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
      temp: number;
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
  temp_max: number;
  temp_min: number;
  humidity: number,
  feels_like: number,
  pressure: number,
  wind: number,
  visibility: number,
}

export interface WeatherApiPayload {
  location: {
    name: string;
    localtime: string;
    country: string;
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
      day: {
        avghumidity: number;
        avgvis_km: number;
        maxtemp_c: number;
        mintemp_c: number;
        maxwind_kph: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
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
  day: string;
  calendarDay: string;
  description: string;
  dt: number;
  icon: string;
  temp: string;
  temp_min?: string;
}

export interface WeatherTransformedData {
  id: string;
  city: string;
  chosenWeatherApi: string;
  description: string;
  lastUpdate: Date;
  icon: string;
  iconId: string;
  timezone: number;
  temp: string;
  humidity: number,
  feels_like: string,
  pressure: number,
  wind: string,
  visibility: number,
  list: WeatherList[],
}

export interface ForecastData {
  label: string;
  icon: string;
  forecast: string | number;
}

export interface Forecast {
  feels_like: ForecastData;
  humidity: ForecastData;
  pressure: ForecastData;
  visibility: ForecastData;
  wind: ForecastData;
}