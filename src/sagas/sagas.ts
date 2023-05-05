import { put, call, takeLatest, CallEffect, PutEffect } from 'redux-saga/effects'

import { GetCurrentWeatherAction, WeatherAction } from '../types/actions'
import { getWeatherByCityName } from '../helpers/requests/requests'
import { getCurrentWeatherSuccess, getCurrentWeatherFailure } from '../model/weather/actions/actions'
import { GET_CURRENT_WEATHER_REQUEST } from '../model/weather/constants/constants'
import { SagaIterator } from 'redux-saga'
import { WeatherPayload, WeatherTransformedData } from '../types/weather'

export function* weatherSaga(action: GetCurrentWeatherAction): Generator<
  CallEffect<WeatherPayload> | PutEffect<WeatherAction>,
  void,
  WeatherTransformedData
> {
  try {
    const response: WeatherTransformedData = yield call(getWeatherByCityName, action.payload)
    yield put(getCurrentWeatherSuccess(response))
  } catch (error: any) {
    yield put(getCurrentWeatherFailure(error.message))
  }
}

export default function* watchSaga(): SagaIterator {
  yield takeLatest(GET_CURRENT_WEATHER_REQUEST, weatherSaga)
}