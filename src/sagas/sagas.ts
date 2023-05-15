import { 
  put, 
  call, 
  takeLatest, 
  CallEffect, 
  PutEffect 
} from 'redux-saga/effects'

import { GetCurrentWeatherAction, WeatherAction } from '../types/weather/actions'
import { getCurrentWeatherSuccess, getCurrentWeatherFailure } from '../model/weather/actions/actions'
import { GET_CURRENT_WEATHER_REQUEST } from '../model/weather/constants/constants'
import { WeatherTransformedData } from '../types/weather/weather'
import { GET_USER_DATA_REQUEST, GET_CALENDAR_EVENTS_REQUEST } from '../model/user/constants/constants'
import { formatEvents } from '../helpers/utils/calendarUtils'
import {
  getUserDataSuccess,
  getUserDataFailure,
  getCalendarEventsSuccess,
  getCalendarEventsFailure
} from '../model/user/actions/actions'
import { 
  getCalendarEvents, 
  getUserData, 
  getWeatherByCityName 
} from '../helpers/requests/requests'
import { 
  GetCalendarEventsAction, 
  GetUserDataAction, 
  UserAction 
} from '../types/user/actions'
import { FormattedEventsItem, UserDataPayload } from '../types/user/user'

export function* weatherSaga(action: GetCurrentWeatherAction): Generator<
  CallEffect<WeatherTransformedData> | PutEffect<WeatherAction>,
  void,
  WeatherTransformedData
> {
  try {
    const response = yield call(getWeatherByCityName, action.payload)
    yield put(getCurrentWeatherSuccess(response))
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
  yield takeLatest(GET_CURRENT_WEATHER_REQUEST, weatherSaga)
  yield takeLatest(GET_USER_DATA_REQUEST, userDataSaga)
  yield takeLatest(GET_CALENDAR_EVENTS_REQUEST, calendarEventsSaga)
}