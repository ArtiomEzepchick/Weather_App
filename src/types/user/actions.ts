import {
    INIT,
    SET_USER_TOKEN,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
    GET_CALENDAR_EVENTS_REQUEST,
    GET_CALENDAR_EVENTS_SUCCESS,
    GET_CALENDAR_EVENTS_FAILURE,
    SET_IS_LOADING_CALENDAR,
    SET_USER_ERROR
} from '../../model/user/constants/constants'
import {
    UserTokenPayload,
    UserDataPayload,
    FormattedEventsItem
} from './user'

export interface InitAction {
    type: typeof INIT;
}

interface SetUserTokenAction {
    type: typeof SET_USER_TOKEN;
    payload: UserTokenPayload;
}

export interface GetUserDataAction {
    type: typeof GET_USER_DATA_REQUEST;
    payload: string;
}

interface GetUserDataSuccessAction {
    type: typeof GET_USER_DATA_SUCCESS;
    payload: UserDataPayload;
}

interface GetUserDataFailureAction {
    type: typeof GET_USER_DATA_FAILURE;
    payload: string;
}

export interface GetCalendarEventsAction {
    type: typeof GET_CALENDAR_EVENTS_REQUEST;
    payload: string;
}

interface GetCalendarEventsSuccessAction {
    type: typeof GET_CALENDAR_EVENTS_SUCCESS;
    payload: FormattedEventsItem[];
}

interface GetCalendarEventsFailureAction {
    type: typeof GET_CALENDAR_EVENTS_FAILURE;
    payload: string;
}

interface SetIsLoadingCalendarAction {
    type: typeof SET_IS_LOADING_CALENDAR;
    payload: boolean;
}

interface SetUserErrorAction {
    type: typeof SET_USER_ERROR;
    payload: string;
}

export type UserAction =
    InitAction |
    SetUserTokenAction |
    GetUserDataAction |
    GetUserDataSuccessAction |
    GetUserDataFailureAction |
    GetCalendarEventsAction |
    GetCalendarEventsSuccessAction |
    GetCalendarEventsFailureAction |
    SetIsLoadingCalendarAction |
    SetUserErrorAction