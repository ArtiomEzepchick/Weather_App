import { put, call, takeLatest } from 'redux-saga/effects'

import { GetWeatherAction } from '../types/actions'
import { getWeatherByCityName } from '../helpers/requests/getWeatherByCityName/getWeatherByCityName'
import { getWeatherSuccess, getWeatherFailure } from '../model/weather/actions/actions'
import { GET_WEATHER_REQUEST } from '../model/weather/constants/constants'

export function* weatherSaga(action: GetWeatherAction): any {
  try {
    const response = yield call(getWeatherByCityName, action.payload)
    yield put(getWeatherSuccess(response))
  } catch (error: any) {
    yield put(getWeatherFailure(error.response.data.message))
  }
}

export default function* watchSaga() {
  yield takeLatest(GET_WEATHER_REQUEST, weatherSaga)
}