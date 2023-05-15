import { InitAction, UserAction } from '../../../types/user/actions'
import { UserState } from '../../../types/user/states'

import {
  SET_USER_TOKEN,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_CALENDAR_EVENTS_REQUEST,
  GET_CALENDAR_EVENTS_SUCCESS,
  GET_CALENDAR_EVENTS_FAILURE,
  SET_IS_LOADING_CALENDAR,
  SET_USER_ERROR
} from '../constants/constants'

export const initialState: UserState = {
  userToken: null,
  userData: null,
  calendarEvents: null,
  userError: null,
  isLoadingCalendar: false
}

const userReducer = (
  state: UserState = initialState,
  action: UserAction | InitAction,
): typeof initialState => {
  switch (action.type) {
    case SET_USER_TOKEN: 
      return {
        ...state,
        userToken: action.payload
      }
    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        userData: null,
        isLoadingCalendar: true
      }
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoadingCalendar: false
      }
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        userData: null,
        userError: action.payload
      }
    case GET_CALENDAR_EVENTS_REQUEST:
      return {
        ...state,
        calendarEvents: null,
        isLoadingCalendar: true
      }
    case GET_CALENDAR_EVENTS_SUCCESS:
      return {
        ...state,
        calendarEvents: action.payload,
        isLoadingCalendar: false
      }
    case GET_CALENDAR_EVENTS_FAILURE:
      return {
        ...state,
        calendarEvents: null,
        userError: action.payload
      }
    case SET_IS_LOADING_CALENDAR:
      return {
        ...state,
        isLoadingCalendar: action.payload
      }
    case SET_USER_ERROR:
      return {
        ...state,
        userError: action.payload
      }
    default:
      return state
  }
}

export default userReducer