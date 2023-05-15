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
import { UserAction } from '../../../types/user/actions'
import { TokenPayload } from '../../../types/user/user'

export const setUserToken = (payload: TokenPayload): UserAction => ({
    type: SET_USER_TOKEN,
    payload
})

export const getUserData = (payload: any): UserAction => ({
    type: GET_USER_DATA_REQUEST,
    payload
})

export const getUserDataSuccess = (payload: any): UserAction => ({
    type: GET_USER_DATA_SUCCESS,
    payload
})

export const getUserDataFailure = (payload: any): UserAction => ({
    type: GET_USER_DATA_FAILURE,
    payload
})

export const getCalendarEvents = (payload: any): UserAction => ({
    type: GET_CALENDAR_EVENTS_REQUEST,
    payload
})

export const getCalendarEventsSuccess = (payload: any): UserAction => ({
    type: GET_CALENDAR_EVENTS_SUCCESS,
    payload
})

export const getCalendarEventsFailure = (payload: any): UserAction => ({
    type: GET_CALENDAR_EVENTS_FAILURE,
    payload
})

export const setIsLoadingCalendar = (payload: any): UserAction => ({
    type: SET_IS_LOADING_CALENDAR,
    payload
})

export const setUserError = (payload: any): UserAction => ({
    type: SET_USER_ERROR,
    payload
})