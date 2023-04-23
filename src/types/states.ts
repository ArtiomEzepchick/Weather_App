import { WeatherTransformedData } from './weather'

export interface WeatherState {
  currentCity: string;
  weatherData: WeatherTransformedData | null;
  error: string | null;
  loading: boolean;
}