import { 
  createStore, 
  combineReducers, 
  applyMiddleware, 
  Store 
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import userReducer from './model/calendar/reducers/reducers'
import weatherReducer from './model/weather/reducers/reducers'
import rootSaga from './sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const store: Store = createStore(
  combineReducers({
    userReducer,
    weatherReducer
  }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store