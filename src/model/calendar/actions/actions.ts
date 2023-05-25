import {
    SET_USER_TOKEN,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
    GET_CALENDAR_EVENTS_REQUEST,
    GET_CALENDAR_EVENTS_SUCCESS,
    GET_CALENDAR_EVENTS_FAILURE,
    SET_USER_ERROR,
    RESET_USER_STATE
} from '../constants/constants'
import { FormattedEventsItem, UserDataPayload } from '../../../types/calendar/user'
import { UserAction } from '../../../types/calendar/actions'

export const setUserToken = (payload: string | null): UserAction => ({
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

export const resetUserState = (): UserAction => ({
    type: RESET_USER_STATE
})

export const setUserError = (payload: string): UserAction => ({
    type: SET_USER_ERROR,
    payload
})