import { StringValuesOnly } from "../../types/commonTypes"

export const WEATHER_ICON_URL: string = 'https://openweathermap.org/img/wn/'
export const WEATHER_IMAGES_SRC: string = `${process.env.PUBLIC_URL}/assets/weatherImages/`
export const ICONS_SRC: string = `${process.env.PUBLIC_URL}/assets/icons/`
export const DEGREE_SYMBOL: string = '\u00B0'

export const API_NAMES: {
    openWeatherApi: string;
    weatherApi: string;
} = {
    openWeatherApi: 'openWeatherApi',
    weatherApi: 'weatherApi'
}

export const FORECAST_LABELS: {
    FEELS_LIKE: string;
    HUMIDITY: string;
    PRESSURE: string;
    VISIBILITY: string;
    WIND: string;
} = {
    FEELS_LIKE: 'Feels like',
    HUMIDITY: 'Humidity',
    PRESSURE: 'Pressure',
    VISIBILITY: 'Visibility',
    WIND: 'Wind'
}