import {
    WeatherTransformedData,
    Forecast,
    ForecastData
} from "../../../types/weather/weather"
import { FORECAST_LABELS, ICONS_SRC } from "../../constants/weather/weather"

export const transformDetailedForecast = (data: WeatherTransformedData): ForecastData[] => {
    const forecastBlocks: Forecast = {
        feelsLike: {
            label: FORECAST_LABELS.FEELS_LIKE,
            icon: `${ICONS_SRC}thermometer.png`,
            forecast: ''
        },
        humidity: {
            label: FORECAST_LABELS.HUMIDITY,
            icon: `${ICONS_SRC}humidity.png`,
            forecast: ''
        },
        pressure: {
            label: FORECAST_LABELS.PRESSURE,
            icon: `${ICONS_SRC}pressure.png`,
            forecast: ''
        },
        visibility: {
            label: FORECAST_LABELS.VISIBILITY,
            icon: `${ICONS_SRC}visibility.png`,
            forecast: ''
        },
        wind: {
            label: FORECAST_LABELS.WIND,
            icon: `${ICONS_SRC}wind.png`,
            forecast: ''
        }
    }

    Object.entries(data).forEach(item => {
        for (let key in forecastBlocks) {
            if (key === item[0]) forecastBlocks[key as keyof Forecast].forecast = item[1]
        }
    })

    return Object.values(forecastBlocks)
}