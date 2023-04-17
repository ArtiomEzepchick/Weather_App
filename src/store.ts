import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import weatherReducer from './model/weather/reducers/reducers'
import watchSaga from './sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  weatherReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchSaga)

export default store