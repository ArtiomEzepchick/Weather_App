import { StringValuesOnly } from "../../types/commonTypes"

export const WEATHER_ICON_URL: string = 'https://openweathermap.org/img/wn/'
export const WEATHER_IMAGES_SRC: string = `${process.env.PUBLIC_URL}/assets/weatherImages/`
export const ICONS_SRC: string = `${process.env.PUBLIC_URL}/assets/icons/`
export const DEGREE_SYMBOL: string = '\u00B0'

export const API_NAMES: StringValuesOnly = {
    openWeather: 'openWeather',
    weatherAPI: 'weatherAPI'
}

export const FORECAST_LABELS: StringValuesOnly = {
    FEELS_LIKE: 'Feels like',
    HUMIDITY: 'Humidity',
    PRESSURE: 'Pressure',
    VISIBILITY: 'Visibility',
    WIND: 'Wind'
}