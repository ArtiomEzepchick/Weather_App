import { transformOpenWeatherAPIPayload } from "../utils/weather/transformWeatherPayload"
import { 
    OpenWeatherCombinedPayload,
    OpenWeatherCurrentDayPayload,
    OpenWeatherDaysPayload, 
    UserLocation
} from "../../types/weather/weather"
import { UserDataPayload } from '../../types/user/user'
import { CALENDAR_URL } from "../constants/googleConstants"
import { WeatherTransformedData } from "../../types/weather/weather"
import { transformSearchOptions } from "../utils/weather/weatherUtils"

const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
const ABSTRACT_API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY

export const getSearchOptions = async (value: string): Promise<string[]> => {
    const API_URL: string = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${OPENWEATHER_API_KEY}`

    const response: Response = await fetch(API_URL)

    return transformSearchOptions(await response.json())
}

export const getWeatherByCityName = async (city: string): Promise<WeatherTransformedData> => {
    const setApiUrl = (api: string): string => {
        return `https://api.openweathermap.org/data/2.5/${api}?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
    }

    const DAYS_FORECAST_URL: string = setApiUrl('forecast')
    const CURRENT_FORECAST_URL: string = setApiUrl('weather')

    try {
        const daysResponse: Response = await fetch(DAYS_FORECAST_URL)
        const daysData: OpenWeatherDaysPayload = await daysResponse.json()

        const currentDayResponse: Response = await fetch(CURRENT_FORECAST_URL)
        const currentDayData: OpenWeatherCurrentDayPayload = await currentDayResponse.json()

        const combinedData: OpenWeatherCombinedPayload = {
            ...daysData,
            description: currentDayData.weather[0].description,
            icon: currentDayData.weather[0].icon,
            temp: currentDayData.main.temp,
            temp_max: currentDayData.main.temp_max,
            temp_min: currentDayData.main.temp_min,
            humidity: currentDayData.main.humidity,
            feels_like: currentDayData.main.feels_like,
            pressure: currentDayData.main.pressure,
            wind: currentDayData.wind.speed,
            visibility: currentDayData.visibility,
        }

        return transformOpenWeatherAPIPayload(combinedData)
    } catch (error: any) {
        throw new Error(`City not found. Please enter correct city name`)
    }
}

export const getUserLocation = async (): Promise<string> => {
    const API_URL: string = `https://ipgeolocation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}`

    try {
        const response: Response = await fetch(API_URL)
        const data: UserLocation = await response.json()

        return `${data.city}, ${data.country_code}`
    } catch (error: any) {
        throw new Error("Can't get user's ip address")
    }
}

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