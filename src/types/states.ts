import { WeatherTransformedData, MenuItem } from './weather'

export interface WeatherState {
  asideCollapsed: boolean;
  error: string | null;
  isLoading: boolean;
  inputCityValue: string;
  currentWeatherData: WeatherTransformedData | null;
  allCitiesWeatherData: WeatherTransformedData[];
}