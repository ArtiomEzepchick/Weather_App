import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  SET_CURRENT_WEATHER_DATA,
  UPDATE_ALL_CITIES_WEATHER_DATA,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  SET_ERROR,
  CLEAR_ERROR,
  SET_CHOSEN_WEATHER_API,
  GET_SEARCH_OPTIONS_REQUEST,
  GET_SEARCH_OPTIONS_SUCCESS,
  GET_SEARCH_OPTIONS_FAILURE,
  SET_IS_LOADING,
  SET_IS_MODAL_OPEN,
  CLEAR_SEARCH_OPTIONS
} from '../constants/constants'
import { WeatherAction } from '../../../types/weather/actions'
import { WeatherTransformedData } from '../../../types/weather/weather'

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

export const getSearchOptionsRequest = (payload: string): WeatherAction  => ({
  type: GET_SEARCH_OPTIONS_REQUEST,
  payload
})

export const getSearchOptionsSuccess = (payload: string[]): WeatherAction  => ({
  type: GET_SEARCH_OPTIONS_SUCCESS,
  payload
})

export const getSearchOptionsFailure = (payload: string): WeatherAction  => ({
  type: GET_SEARCH_OPTIONS_FAILURE,
  payload
})

export const clearSearchOptions = (): WeatherAction  => ({
  type: CLEAR_SEARCH_OPTIONS,
  payload: null
})

export const setCurrentWeatherData = (payload: WeatherTransformedData | null): WeatherAction  => ({
  type: SET_CURRENT_WEATHER_DATA,
  payload
})

export const setChosenWeatherAPI = (payload: string): WeatherAction  => ({
  type: SET_CHOSEN_WEATHER_API,
  payload
})

export const updateAllCitiesWeatherData = (payload: WeatherTransformedData[]): WeatherAction => ({
  type: UPDATE_ALL_CITIES_WEATHER_DATA,
  payload
})

export const setInputCityValue = (payload: string | null): WeatherAction => ({
  type: SET_INPUT_CITY_VALUE,
  payload
})

export const setAsideCollapsed = (payload: boolean): WeatherAction => ({
  type: SET_ASIDE_COLLAPSED,
  payload
})

export const setError = (payload: string): WeatherAction => ({
  type: SET_ERROR,
  payload
})

export const clearError = (): WeatherAction => ({
  type: CLEAR_ERROR,
  payload: null
})

export const setIsLoading = (payload: boolean): WeatherAction => ({
  type: SET_IS_LOADING,
  payload
})

export const setIsModalOpen = (payload: boolean): WeatherAction => ({
  type: SET_IS_MODAL_OPEN,
  payload
})