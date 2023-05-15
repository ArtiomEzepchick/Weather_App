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
import { 
    FormattedEventsItem, 
    UserDataPayload, 
    UserTokenPayload 
} from '../../../types/user/user'
import { UserAction } from '../../../types/user/actions'

export const setUserToken = (payload: UserTokenPayload): UserAction => ({
    type: SET_USER_TOKEN,
    payload
})

export const getUserData = (payload: string): UserAction => ({
    type: GET_USER_DATA_REQUEST,
    payload
})

export const getUserDataSuccess = (payload: UserDataPayload): UserAction => ({
    type: GET_USER_DATA_SUCCESS,
    payload
})

export const getUserDataFailure = (payload: string): UserAction => ({
    type: GET_USER_DATA_FAILURE,
    payload
})

export const getCalendarEvents = (payload: string): UserAction => ({
    type: GET_CALENDAR_EVENTS_REQUEST,
    payload
})

export const getCalendarEventsSuccess = (payload: FormattedEventsItem[]): UserAction => ({
    type: GET_CALENDAR_EVENTS_SUCCESS,
    payload
})

export const getCalendarEventsFailure = (payload: string): UserAction => ({
    type: GET_CALENDAR_EVENTS_FAILURE,
    payload
})

export const setIsLoadingCalendar = (payload: boolean): UserAction => ({
    type: SET_IS_LOADING_CALENDAR,
    payload
})

export const setUserError = (payload: string): UserAction => ({
    type: SET_USER_ERROR,
    payload
})