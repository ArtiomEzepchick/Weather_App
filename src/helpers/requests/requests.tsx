import { transformWeatherPayload } from "../transformWeatherPayload/transformWeatherPayload"

export const getWeatherByCityName = async (city: string) => {
    const API_URL = 'https://api.openweathermap.org/data/2.5/'
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

    try {
        const response = await fetch(`${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`)
        const data = await response.json()

        return transformWeatherPayload(data)
    } catch (error: any) {
        throw new Error("City not found. Please, enter correct city name")
    }
}

export const getUserLocation = async () => {
    const API_URL = 'https://ipgeolocation.abstractapi.com/v1/'
    const API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY

    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`)
        const data = await response.json()

        return data.city
    } catch(error: any) {
        throw new Error("Can't get user's ip address")
    }
}