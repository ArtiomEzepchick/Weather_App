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

export interface WeatherTransformedData {
  city: string;
  list: {
    day: string;
    time: string;
    temp: string;
    temp_max: string;
    temp_min: string;
    icon: string;
    dt: number;
    visibility: number;
    wind: string;
  }[]
}