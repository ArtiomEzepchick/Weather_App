import {
  INIT,
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  ADD_ALL_CITIES_WEATHER_DATA,
  UPDATE_ALL_CITIES_WEATHER_DATA,
  SET_INPUT_CITY_VALUE,
  SET_ASIDE_COLLAPSED,
  SET_MENU_ITEMS,
  CLEAR_MENU_ITEMS,
  SET_FOUND_CITIES,
  SET_CURRENT_WEATHER,
  CLEAR_ERROR,
  SET_BACKGROUND_NAME
} from '../model/weather/constants/constants'
import { WeatherTransformedData, MenuItem } from '../types/weather'

export interface InitAction {
  type: typeof INIT,
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

interface SetCurrentWeatherAction {
  type: typeof SET_CURRENT_WEATHER;
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

interface SetMenuItemsAction {
  type: typeof SET_MENU_ITEMS;
  payload: MenuItem;
}

interface ClearMenuItemsAction {
  type: typeof CLEAR_MENU_ITEMS;
  payload: [];
}

interface SetFoundCitiesAction {
  type: typeof SET_FOUND_CITIES;
  payload: string;
}

interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
  payload: null;
}

interface SetBackgroundNameAction {
  type: typeof SET_BACKGROUND_NAME;
  payload: string;
}

export type WeatherAction =
  InitAction |
  GetCurrentWeatherAction |
  GetCurrentWeatherSuccessAction |
  GetCurrentWeatherFailureAction |
  SetCurrentWeatherAction |
  UpdateAllCitiesWeatherDataAction |
  SetInputCityValueAction  |
  SetAsideCollapsedAction |
  SetMenuItemsAction |
  ClearMenuItemsAction |
  SetFoundCitiesAction |
  AddAllCitiesWeatherDataAction |
  ClearErrorAction |
  SetBackgroundNameAction