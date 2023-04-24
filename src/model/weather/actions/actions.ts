import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  SET_CURRENT_WEATHER,
  SET_CURRENT_CITY,
  SET_ASIDE_COLLAPSED,
  SET_MENU_ITEMS,
  CLEAR_MENU_ITEMS,
  SET_FOUND_CITIES,
  SET_ALL_CITIES_WEATHER_DATA
} from '../constants/constants'
import { WeatherAction } from '../../../types/actions'
import { WeatherTransformedData, MenuItem } from '../../../types/weather'

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

export const setCurrentWeather = (payload: WeatherTransformedData): WeatherAction  => ({
  type: SET_CURRENT_WEATHER,
  payload
})

export const setCurrentCity = (payload: string): WeatherAction => ({
  type: SET_CURRENT_CITY,
  payload
})

export const setAsideCollapsed = (payload: boolean): WeatherAction => ({
  type: SET_ASIDE_COLLAPSED,
  payload
})

export const setMenuItems = (payload: MenuItem): WeatherAction => ({
  type: SET_MENU_ITEMS,
  payload
})

export const clearMenuItems = (payload: []): WeatherAction => ({
  type: CLEAR_MENU_ITEMS,
  payload
})

export const setFoundCities = (payload: string): WeatherAction => ({
  type: SET_FOUND_CITIES,
  payload
})

export const setAllCitiesWeatherData = (payload: WeatherTransformedData): WeatherAction => ({
  type: SET_ALL_CITIES_WEATHER_DATA,
  payload
})