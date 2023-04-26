import {
  INIT,
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
} from '../model/weather/constants/constants'
import { WeatherTransformedData } from '../types/weather'

export interface InitAction {
  type: typeof INIT;
}

export interface GetCurrentWeatherAction {
  type: typeof GET_CURRENT_WEATHER_REQUEST;
  payload: string;
}

interface GetCurrentWeatherSuccessAction {
  type: typeof GET_CURRENT_WEATHER_SUCCESS;
  payload: WeatherTransformedData;
}

interface GetCurrentWeatherFailureAction {
  type: typeof GET_CURRENT_WEATHER_FAILURE;
  payload: string;
}

interface SetCurrentWeatherDataAction {
  type: typeof SET_CURRENT_WEATHER_DATA;
  payload: WeatherTransformedData;
}

interface UpdateAllCitiesWeatherDataAction {
  type: typeof UPDATE_ALL_CITIES_WEATHER_DATA;
  payload: WeatherTransformedData[];
}

interface AddAllCitiesWeatherDataAction {
  type: typeof ADD_ALL_CITIES_WEATHER_DATA;
  payload: WeatherTransformedData;
}

interface SetInputCityValueAction {
  type: typeof SET_INPUT_CITY_VALUE;
  payload: string;
}

interface SetAsideCollapsedAction {
  type: typeof SET_ASIDE_COLLAPSED;
  payload: boolean;
}

interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
  payload: null;
}

interface SetIsLoadingAction {
  type: typeof SET_IS_LOADING;
  payload: boolean;
}

export type WeatherAction =
  InitAction |
  GetCurrentWeatherAction |
  GetCurrentWeatherSuccessAction |
  GetCurrentWeatherFailureAction |
  SetCurrentWeatherDataAction |
  UpdateAllCitiesWeatherDataAction |
  SetInputCityValueAction  |
  SetAsideCollapsedAction |
  AddAllCitiesWeatherDataAction |
  ClearErrorAction |
  SetIsLoadingAction