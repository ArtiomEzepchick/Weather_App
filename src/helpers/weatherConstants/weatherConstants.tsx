import { ForecastLabels } from "../../types/weather"

export const ICON_SRC: string = `${process.env.PUBLIC_URL}/assets/icons/`
export const WEATHER_IMAGES_SRC: string = `${process.env.PUBLIC_URL}/assets/weatherImages/`

export const FORECAST_LABELS: ForecastLabels = {
    FEELS_LIKE: 'Feels like',
    HUMIDITY: 'Humidity',
    PRESSURE: 'Pressure',
    VISIBILITY: 'Visibility',
    WIND: 'Wind'
}

export const weatherDescription: string[] = [
    'thunderstorm', 
    'drizzle',
    'rain',
    'snow',
    'clear',
    'clouds',
]

export const degreeSymbol: JSX.Element = <var>&#176;</var>