import { 
    UserTokenPayload,
    UserDataPayload, 
    FormattedEventsItem
} from "./user"

export interface UserState {
    userToken: UserTokenPayload | null,
    userData: UserDataPayload | null,
    calendarEvents: FormattedEventsItem[] | null,
    userError: string | null,
    isLoadingCalendar: boolean
}