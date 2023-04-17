import {
  INIT,
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
} from '../model/weather/constants/constants'
import { WeatherTransformedData } from '../types/weather'

export interface InitAction {
  type: typeof INIT,
}

export interface GetWeatherAction {
  type: typeof GET_WEATHER_REQUEST;
  payload: string;
}

interface GetWeatherSuccessAction {
  type: typeof GET_WEATHER_SUCCESS;
  payload: WeatherTransformedData;
}

interface GetWeatherFailureAction {
  type: typeof GET_WEATHER_FAILURE;
  payload: string;
}

export type WeatherAction =
  InitAction |
  GetWeatherAction |
  GetWeatherSuccessAction |
  GetWeatherFailureAction;