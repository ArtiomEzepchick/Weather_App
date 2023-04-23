import {
  InitAction,
  WeatherAction,
} from '../../../types/actions'

import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
  SET_CURRENT_CITY,
} from '../constants/constants'

import { WeatherState } from '../../../types/states'

export const initialState: WeatherState = {
  currentCity: '',
  weatherData: null,
  error: null,
  loading: false
}

const weatherReducer = (
  state: WeatherState = initialState,
  action: WeatherAction | InitAction,
): WeatherState => {
  switch (action.type) {
    case GET_WEATHER_REQUEST:
      return {
        ...state,
        weatherData: null,
        error: null,
        loading: true
      }
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        weatherData: action.payload,
        error: null,
        loading: false
      }
    case GET_WEATHER_FAILURE:
      return {
        ...state,
        weatherData: null,
        error: action.payload,
        loading: false
      }
    case SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.payload
      }
    default:
      return state
  }
}

export default weatherReducer
