import { UserDataPayload } from '../../../types/calendar/user'
import { CALENDAR_URL } from "../../constants/calendar/calendar"

export const getUserData = async (token: string): Promise<UserDataPayload> => {
    try {
        const AUTH_URL: string = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`

        const response: Response = await fetch(AUTH_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        })

        if (response.status !== 200) {
            throw new Error(`${response.status}`)
        }

        return await response.json()
    } catch (error: any) {
        throw new Error(error.message)
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

        if (response.status !== 200) {
            throw new Error(`${response.status}`)
        }

        return await response.json()
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const logOutUser = async (token: string): Promise<void> => {
    const REVOKE_URL = `https://oauth2.googleapis.com/revoke?token=${token}`

    try {
        await fetch(REVOKE_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    } catch (error: any) {
        throw new Error("Can't logout current user")
    }
}