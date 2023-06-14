import {
  put,
  call,
  takeLatest,
  CallEffect,
  PutEffect,
  delay,
  select,
  SelectEffect
} from 'redux-saga/effects'

import { GET_CURRENT_WEATHER_REQUEST, GET_SEARCH_OPTIONS_REQUEST } from '../model/weather/constants/constants'
import { WeatherTransformedData } from '../types/weather/weather'
import { GET_USER_DATA_REQUEST, GET_CALENDAR_EVENTS_REQUEST } from '../model/user/constants/constants'
import { formatEvents } from '../helpers/utils/user/formatEvents'
import { FormattedEventsItem, UserDataPayload } from '../types/user/user'
import {
  GetCurrentWeatherAction,
  GetSearchOptionsRequestAction,
  WeatherAction
} from '../types/weather/actions'
import {
  getCurrentWeatherSuccess,
  getCurrentWeatherFailure,
  getSearchOptionsSuccess,
  getSearchOptionsFailure
} from '../model/weather/actions/actions'
import {
  getUserDataSuccess,
  getUserDataFailure,
  getCalendarEventsSuccess,
  getCalendarEventsFailure
} from '../model/user/actions/actions'
import { getUserData } from '../helpers/requests/user/getUserData'
import { getCalendarEvents } from '../helpers/requests/user/getCalendarEvents'
import { getSearchOptions } from '../helpers/requests/weather/getSearchOptions'
import { getWeatherFromOpenWeatherApi } from '../helpers/requests/weather/getWeatherFromOpenWeatherApi'
import { getWeatherFromWeatherApi } from '../helpers/requests/weather/getWeatherFromWeatherApi'
import {
  GetCalendarEventsAction,
  GetUserDataAction,
  UserAction
} from '../types/user/actions'
import { API_NAMES } from '../helpers/constants/weather/weather'
import { State } from '../types/state'

export function* searchCitySaga(action: GetSearchOptionsRequestAction): Generator<
  CallEffect<string[]> | PutEffect<WeatherAction>,
  void,
  string[]
> {
  try {
    yield delay(500)
    const response = yield call(getSearchOptions, action.payload)
    yield put(getSearchOptionsSuccess(response))
  } catch (error: any) {
    yield put(getSearchOptionsFailure(error.message))
  }
}

export function* weatherSaga(action: GetCurrentWeatherAction): Generator<
  CallEffect<WeatherTransformedData> | PutEffect<WeatherAction>,
  void,
  WeatherTransformedData
> | SelectEffect {
  try {
    const chosenWeatherApi = yield select((state: State): string => state.weatherReducer.chosenWeatherApi)
    
    if (chosenWeatherApi === API_NAMES.OPEN_WEATHER_API) {
      const response = yield call(getWeatherFromOpenWeatherApi, action.payload)
      yield put(getCurrentWeatherSuccess(response))
    } else {
      const response = yield call(getWeatherFromWeatherApi, action.payload)
      yield put(getCurrentWeatherSuccess(response))
    }
  } catch (error: any) {
    yield put(getCurrentWeatherFailure(error.message))
  }
}

export function* userDataSaga(action: GetUserDataAction): Generator<
  CallEffect<UserDataPayload> | PutEffect<UserAction>,
  void,
  UserDataPayload
> {
  try {
    const response = yield call(getUserData, action.payload)
    yield put(getUserDataSuccess(response))
  } catch (error: any) {
    yield put(getUserDataFailure(error.message))
  }
}

export function* calendarEventsSaga(action: GetCalendarEventsAction): Generator<
  CallEffect<gapi.client.calendar.Event[]> | PutEffect<UserAction>,
  void,
  gapi.client.calendar.Events
> {
  try {
    const response = yield call(getCalendarEvents, action.payload)
    const formattedEvents: FormattedEventsItem[] = formatEvents(response.items)

    yield put(getCalendarEventsSuccess(formattedEvents))
  } catch (error: any) {
    yield put(getCalendarEventsFailure(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_SEARCH_OPTIONS_REQUEST, searchCitySaga)
  yield takeLatest(GET_CURRENT_WEATHER_REQUEST, weatherSaga)
  yield takeLatest(GET_USER_DATA_REQUEST, userDataSaga)
  yield takeLatest(GET_CALENDAR_EVENTS_REQUEST, calendarEventsSaga)
}