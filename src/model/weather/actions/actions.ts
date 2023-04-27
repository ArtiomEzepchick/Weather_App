import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  SET_CURRENT_WEATHER_DATA,
  ADD_ALL_CITIES_WEATHER_DATA,
  UPDATE_ALL_CITIES_WEATHER_DATA,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  CLEAR_ERROR,
  SET_IS_LOADING,
  SET_IS_MODAL_OPEN
} from '../constants/constants'
import { WeatherAction } from '../../../types/actions'
import { WeatherTransformedData } from '../../../types/weather'

export const getCurrentWeather = (payload: string): WeatherAction  => ({
  type: GET_CURRENT_WEATHER_REQUEST,
  payload
})

export const getCurrentWeatherSuccess = (payload: WeatherTransformedData): WeatherAction  => ({
  type: GET_CURRENT_WEATHER_SUCCESS,
  payload
})

export const getCurrentWeatherFailure = (payload: string): WeatherAction  => ({
  type: GET_CURRENT_WEATHER_FAILURE,
  payload
})

export const setCurrentWeatherData = (payload: WeatherTransformedData): WeatherAction  => ({
  type: SET_CURRENT_WEATHER_DATA,
  payload
})

export const addAllCitiesWeatherData = (payload: WeatherTransformedData): WeatherAction => ({
  type: ADD_ALL_CITIES_WEATHER_DATA,
  payload
})

export const updateAllCitiesWeatherData = (payload: WeatherTransformedData[]): WeatherAction => ({
  type: UPDATE_ALL_CITIES_WEATHER_DATA,
  payload
})

export const setInputCityValue = (payload: string): WeatherAction => ({
  type: SET_INPUT_CITY_VALUE,
  payload
})

export const setAsideCollapsed = (payload: boolean): WeatherAction => ({
  type: SET_ASIDE_COLLAPSED,
  payload
})

export const clearError = (payload: null): WeatherAction => ({
  type: CLEAR_ERROR,
  payload
})

export const setIsLoading = (payload: boolean): WeatherAction => ({
  type: SET_IS_LOADING,
  payload
})

export const setIsModalOpen = (payload: boolean): WeatherAction => ({
  type: SET_IS_MODAL_OPEN,
  payload
})