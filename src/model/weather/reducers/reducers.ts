import { InitAction, WeatherAction } from '../../../types/actions'

import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  ADD_ALL_CITIES_WEATHER_DATA,
  UPDATE_ALL_CITIES_WEATHER_DATA,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  SET_CURRENT_WEATHER_DATA,
  CLEAR_ERROR,
  SET_IS_LOADING
} from '../constants/constants'

import { WeatherState } from '../../../types/states'

export const initialState: WeatherState = {
  asideCollapsed: true,
  error: null,
  isLoading: false,
  inputCityValue: '',
  currentWeatherData: null,
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
        isLoading: true
      }
    case GET_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeatherData: action.payload,
        error: null,
        isLoading: false,
      }
    case GET_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        currentWeatherData: null,
        error: action.payload,
        isLoading: false
      }
    case SET_CURRENT_WEATHER_DATA:
      return {
        ...state,
        currentWeatherData: action.payload
      }
    case ADD_ALL_CITIES_WEATHER_DATA:
      return {
        ...state,
        allCitiesWeatherData: [
          ...state.allCitiesWeatherData,
          action.payload
        ]
      }
    case UPDATE_ALL_CITIES_WEATHER_DATA:
      return {
        ...state,
        allCitiesWeatherData: action.payload
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
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export default weatherReducer
