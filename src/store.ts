import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'

import weatherReducer from './model/weather/reducers/reducers'
import watchSaga from './sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const store: Store = createStore(
  weatherReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchSaga)

export default store