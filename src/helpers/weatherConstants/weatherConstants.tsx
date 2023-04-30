import { WeatherConstants } from "../../types/weather"

export const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn/'
export const WEATHER_IMAGES_SRC: string = `${process.env.PUBLIC_URL}/assets/weatherImages/`
export const ICONS_SRC: string = `${process.env.PUBLIC_URL}/assets/icons/`
export const DEGREE_SYMBOL: string = '\u00B0'

export const FORECAST_LABELS: WeatherConstants = {
    FEELS_LIKE: 'Feels like',
    HUMIDITY: 'Humidity',
    PRESSURE: 'Pressure',
    VISIBILITY: 'Visibility',
    WIND: 'Wind'
}

export const LOCAL_STORAGE_ITEMS: WeatherConstants = {
    ALL_CITIES_WEATHER_DATA: 'allCitiesWeatherData',
    CURRENT_WEATHER_DATA: 'currentWeatherData',
    SAVED_WEATHER_DATA_REF: 'savedWeatherDataRef',
    MENU_KEY_REF: 'menuKeyRef'
}