import { UserDataPayload } from '../../../types/calendar/user'
import { CALENDAR_URL } from "../../constants/calendar/calendarConstants"

export const getUserData = async (token: string): Promise<UserDataPayload> => {
    try {
        const AUTH_URL: string = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`

        const response: Response = await fetch(AUTH_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        })

        return await response.json()
    } catch (error: any) {
        throw new Error("Can't get user's data")
    }
}

export const getCalendarEvents = async (token: string): Promise<gapi.client.calendar.Event[]> => {
    try {
        const response: Response = await fetch(CALENDAR_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        })

       if (response.status === 401) {
        throw new Error('You need to sign up again')
       }

        return await response.json()
    } catch (error: any) {
        throw new Error("Can't get calendar events")
    }
}