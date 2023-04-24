import { WeatherTransformedData, MenuItem } from './weather'

export interface WeatherState {
  asideCollapsed: boolean;
  error: string | null;
  loading: boolean;
  currentCity: string;
  currentWeatherData: WeatherTransformedData | null;
  allCitiesWeatherData: WeatherTransformedData[];
  menuItems: MenuItem[],
  foundCities: string[]
}