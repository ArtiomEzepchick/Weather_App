import { UserDataPayload, FormattedEventsItem } from "./user"

export interface UserState {
    userToken: string | null;
    userData: UserDataPayload | null;
    calendarEvents: FormattedEventsItem[] | null;
    userError: string | null;
    isCalendarLoading: boolean;
}