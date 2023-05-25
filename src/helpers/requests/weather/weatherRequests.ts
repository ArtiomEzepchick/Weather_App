import { transformOpenWeatherAPIPayload, transformWeatherAPIPayload } from "../../utils/weather/transformWeatherPayload"
import { WeatherTransformedData } from "../../../types/weather/weather"
import { filterSearchOptions } from "../../utils/weather/weatherUtils"
import { 
    OpenWeatherCombinedPayload,
    OpenWeatherCurrentDayPayload,
    OpenWeatherDaysPayload, 
    UserLocation,
    WeatherApiPayload
} from "../../../types/weather/weather"

const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
const ABSTRACT_API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY

export const getSearchOptions = async (value: string): Promise<string[]> => {
    const API_URL: string = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${OPENWEATHER_API_KEY}`

    const response: Response = await fetch(API_URL)

    return filterSearchOptions(await response.json())
}

export const getWeatherFromOpenWeatherApi = async (city: string): Promise<WeatherTransformedData> => {
    const DAYS_FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
    const CURRENT_FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`

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

export const getWeatherFromWeatherApi = async (city: string): Promise<WeatherTransformedData> => {
    const API_URL: string = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=2&aqi=no&alerts=no`

    try {
        const response: Response = await fetch(API_URL)
        const data: WeatherApiPayload = await response.json()

        return transformWeatherAPIPayload(data, city)
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