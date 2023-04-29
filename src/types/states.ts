import { WeatherTransformedData } from './weather'

export interface WeatherState {
  asideCollapsed: boolean;
  error: string | null;
  isLoading: boolean;
  isModalOpen: boolean;
  inputCityValue: string;
  currentWeatherData: WeatherTransformedData | null;
  allCitiesWeatherData: WeatherTransformedData[];
}