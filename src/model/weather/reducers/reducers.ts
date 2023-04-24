import {
  InitAction,
  WeatherAction,
} from '../../../types/actions'

import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  SET_MENU_ITEMS,
  SET_FOUND_CITIES,
  CLEAR_MENU_ITEMS,
  SET_ALL_CITIES_WEATHER_DATA,
  SET_CURRENT_WEATHER,
  CLEAR_ERROR
} from '../constants/constants'

import { WeatherState } from '../../../types/states'

export const initialState: WeatherState = {
  asideCollapsed: true,
  error: null,
  loading: false,
  inputCityValue: '',
  currentWeatherData: null,
  menuItems: [],
  foundCities: [],
  allCitiesWeatherData: []
}

const weatherReducer = (
  state: WeatherState = initialState,
  action: WeatherAction | InitAction,
): WeatherState => {
  switch (action.type) {
    case GET_CURRENT_WEATHER_REQUEST:
      return {
        ...state,
        currentWeatherData: null,
        error: null,
        loading: true
      }
    case GET_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeatherData: action.payload,
        error: null,
        loading: false,
      }
    case GET_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        currentWeatherData: null,
        error: action.payload,
        loading: false
      }
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeatherData: action.payload
      }
    case SET_INPUT_CITY_VALUE:
      return {
        ...state,
        inputCityValue: action.payload
      }
    case SET_ASIDE_COLLAPSED:
      return {
        ...state,
        asideCollapsed: action.payload
      }
    case SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: [
          ...state.menuItems,
          action.payload
        ]
      }
    case CLEAR_MENU_ITEMS:
      return {
        ...state,
        menuItems: []
      }
    case SET_FOUND_CITIES: 
      return {
        ...state,
        foundCities: [
          ...state.foundCities,
          action.payload
        ]
      }
    case SET_ALL_CITIES_WEATHER_DATA:
      return {
        ...state,
        allCitiesWeatherData: [
          ...state.allCitiesWeatherData,
          action.payload
        ]
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default weatherReducer
