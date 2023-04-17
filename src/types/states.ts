import { WeatherTransformedData } from './weather'

export interface WeatherState {
  data: WeatherTransformedData | null
  error: string | null
  loading: boolean
}