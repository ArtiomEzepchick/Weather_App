import { ForecastLabels } from "../../types/weather"

export const ICON_URL = 'https://openweathermap.org/img/wn/'
export const ICON_SRC: string = `${process.env.PUBLIC_URL}/assets/icons/`
export const WEATHER_IMAGES_SRC: string = `${process.env.PUBLIC_URL}/assets/weatherImages/`
export const DEGREE_SYMBOL: string = '\u00B0'

export const FORECAST_LABELS: ForecastLabels = {
    FEELS_LIKE: 'Feels like',
    HUMIDITY: 'Humidity',
    PRESSURE: 'Pressure',
    VISIBILITY: 'Visibility',
    WIND: 'Wind'
}