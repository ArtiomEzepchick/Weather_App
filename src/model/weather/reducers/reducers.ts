import { InitAction, WeatherAction } from '../../../types/weather/actions'
import { API_NAMES } from '../../../helpers/constants/weather/weather'
import { WeatherState } from '../../../types/weather/states'
import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  UPDATE_ALL_CITIES_WEATHER_DATA,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  SET_CURRENT_WEATHER_DATA,
  SET_ERROR,
  CLEAR_ERROR,
  SET_CHOSEN_WEATHER_API,
  SET_IS_LOADING,
  GET_SEARCH_OPTIONS_REQUEST,
  GET_SEARCH_OPTIONS_SUCCESS,
  GET_SEARCH_OPTIONS_FAILURE,
  CLEAR_SEARCH_OPTIONS,
  SET_IS_MODAL_OPEN
} from '../constants/constants'

export const initialState: WeatherState = {
  asideCollapsed: true,
  error: null,
  isLoading: false,
  isModalOpen: false,
  inputCityValue: '',
  currentWeatherData: null,
  allCitiesWeatherData: [],
  chosenWeatherApi: API_NAMES.OPEN_WEATHER_API,
  searchOptions: null
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
        isLoading: false
      }
    case GET_CURRENT_WEATHER_FAILURE:
      return {
        ...state,
        currentWeatherData: null,
        error: action.payload,
        isLoading: false,
        isModalOpen: true
      }
    case SET_CURRENT_WEATHER_DATA:
      return {
        ...state,
        currentWeatherData: action.payload
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
    case SET_CHOSEN_WEATHER_API:
      return {
        ...state,
        chosenWeatherApi: action.payload
      }
    case SET_ASIDE_COLLAPSED:
      return {
        ...state,
        asideCollapsed: action.payload
      }
    case GET_SEARCH_OPTIONS_REQUEST:
      return {
        ...state,
        searchOptions: null,
      }
    case GET_SEARCH_OPTIONS_SUCCESS:
      return {
        ...state,
        searchOptions: action.payload
      }
    case GET_SEARCH_OPTIONS_FAILURE:
      return {
        ...state,
        searchOptions: null,
        error: action.payload
      }
    case CLEAR_SEARCH_OPTIONS:
      return {
        ...state,
        searchOptions: null
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
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
    case SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload
      }
    default:
      return state
  }
}

export default weatherReducer