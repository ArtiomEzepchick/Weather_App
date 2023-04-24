import {
  INIT,
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_SUCCESS,
  GET_CURRENT_WEATHER_FAILURE,
  SET_CURRENT_CITY,
  SET_ASIDE_COLLAPSED,
  SET_MENU_ITEMS,
  CLEAR_MENU_ITEMS,
  SET_FOUND_CITIES,
  SET_ALL_CITIES_WEATHER_DATA,
  SET_CURRENT_WEATHER
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

interface SetCurrentCityAction {
  type: typeof SET_CURRENT_CITY;
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

interface SetAllCitiesWeatherDataAction {
  type: typeof SET_ALL_CITIES_WEATHER_DATA;
  payload: WeatherTransformedData;
}

export type WeatherAction =
  InitAction |
  GetCurrentWeatherAction |
  GetCurrentWeatherSuccessAction |
  GetCurrentWeatherFailureAction |
  SetCurrentWeatherAction |
  SetCurrentCityAction |
  SetAsideCollapsedAction |
  SetMenuItemsAction |
  ClearMenuItemsAction |
  SetFoundCitiesAction |
  SetAllCitiesWeatherDataAction