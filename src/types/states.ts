import { WeatherTransformedData } from './weather'

export interface WeatherState {
  weatherData: WeatherTransformedData | null
  error: string | null
  loading: boolean
}