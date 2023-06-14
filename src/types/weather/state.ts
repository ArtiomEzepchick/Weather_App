import { WeatherTransformedData } from './weather'

export interface WeatherState {
  asideCollapsed: boolean;
  error: string | null;
  isLoading: boolean;
  isModalOpen: boolean;
  inputCityValue: string | null;
  currentWeatherData: WeatherTransformedData | null;
  allCitiesWeatherData: WeatherTransformedData[];
  chosenWeatherApi: string;
  searchOptions: string[] | null;
}