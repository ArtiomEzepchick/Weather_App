import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
} from '../constants/constants'
import { WeatherAction } from '../../../types/actions'
import { WeatherTransformedData } from '../../../types/weather'

export const getWeather = (payload: string): WeatherAction  => ({
  type: GET_WEATHER_REQUEST,
  payload
})

export const getWeatherSuccess = (payload: WeatherTransformedData): WeatherAction  => ({
  type: GET_WEATHER_SUCCESS,
  payload
})

export const getWeatherFailure = (payload: string): WeatherAction  => ({
  type: GET_WEATHER_FAILURE,
  payload
})
