import { transformWeatherPayload } from "../transformWeatherPayload/transformWeatherPayload"
import { WeatherPayload, UserLocation } from "../../types/weather"

export const getWeatherByCityName = async (city: string): Promise<any>  => {
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

export const getUserLocation = async (): Promise<any> => {
    const API_URL: string = 'https://ipgeolocation.abstractapi.com/v1/'
    const API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY

    try {
        const response: Response = await fetch(`${API_URL}?api_key=${API_KEY}`)
        const data: UserLocation = await response.json()

        return data.city
    } catch(error: any) {
        throw new Error("Can't get user's ip address")
    }
}