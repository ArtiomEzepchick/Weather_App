import { transformWeatherPayload } from "../transformWeatherPayload/transformWeatherPayload"
import { WeatherPayload, UserLocation } from "../../types/weather/weather"
import { UserDataPayload } from '../../types/user/user'
import { CALENDAR_URL } from "../constants/googleCalendarConstants"
import { WeatherTransformedData } from "../../types/weather/weather"

export const getWeatherByCityName = async (city: string): Promise<WeatherTransformedData> => {
    const API_URL: string = 'https://api.openweathermap.org/data/2.5/'
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

    try {
        const response: Response = await fetch(`${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`)
        const data: WeatherPayload = await response.json()

        return transformWeatherPayload(data)
    } catch (error: any) {
        throw new Error(`City "${city}" not found. Please enter correct city name`)
    }
}

export const getUserLocation = async (): Promise<string> => {
    const API_URL: string = 'https://ipgeolocation.abstractapi.com/v1/'
    const API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY

    try {
        const response: Response = await fetch(`${API_URL}?api_key=${API_KEY}`)
        const data: UserLocation = await response.json()

        return data.city
    } catch (error: any) {
        throw new Error("Can't get user's ip address")
    }
}

export const getUserData = async (token: string): Promise<UserDataPayload> => {
    try {
        const AUTH_URL: string = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`

        const response: Response = await fetch(AUTH_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
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
                Accept: 'application/json'
            }
        })

        return await response.json()
    } catch (error: any) {
        throw new Error("Can't get calendar events")
    }
}