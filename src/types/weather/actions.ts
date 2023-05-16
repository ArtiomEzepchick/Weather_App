import {
  INIT,
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  UPDATE_ALL_CITIES_WEATHER_DATA,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  SET_CURRENT_WEATHER_DATA,
  SET_ERROR,
  CLEAR_ERROR,
  SET_IS_LOADING,
  SET_IS_MODAL_OPEN
} from '../../model/weather/constants/constants'
import { WeatherTransformedData } from './weather'

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
  payload: WeatherTransformedData | null;
}

interface UpdateAllCitiesWeatherDataAction {
  type: typeof UPDATE_ALL_CITIES_WEATHER_DATA;
  payload: WeatherTransformedData[];
}

interface SetInputCityValueAction {
  type: typeof SET_INPUT_CITY_VALUE;
  payload: string;
}

interface SetAsideCollapsedAction {
  type: typeof SET_ASIDE_COLLAPSED;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
  payload: null;
}

interface SetIsLoadingAction {
  type: typeof SET_IS_LOADING;
  payload: boolean;
}

interface SetIsModalOpenAction {
  type: typeof SET_IS_MODAL_OPEN;
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
  SetErrorAction|
  ClearErrorAction |
  SetIsLoadingAction |
  SetIsModalOpenAction