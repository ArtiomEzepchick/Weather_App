import { put, call, takeLatest } from 'redux-saga/effects'

import { GetCurrentWeatherAction } from '../types/actions'
import { getWeatherByCityName } from '../helpers/requests/getWeatherByCityName/getWeatherByCityName'
import { getCurrentWeatherSuccess, getCurrentWeatherFailure } from '../model/weather/actions/actions'
import { GET_CURRENT_WEATHER_REQUEST } from '../model/weather/constants/constants'

export function* weatherSaga(action: GetCurrentWeatherAction): any {
  try {
    const response = yield call(getWeatherByCityName, action.payload)
    yield put(getCurrentWeatherSuccess(response))
  } catch (error: any) {
    yield put(getCurrentWeatherFailure(error.message))
  }
}

export default function* watchSaga() {
  yield takeLatest(GET_CURRENT_WEATHER_REQUEST, weatherSaga)
}