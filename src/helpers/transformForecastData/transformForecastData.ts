import { Forecast, ForecastInfo } from "../../types/weather"
import { WeatherTransformedData } from "../../types/weather"
import { FORECAST_LABELS, ICON_SRC, degreeSymbol } from "../constants/constants"


export const addUnitsBasedOnLabels = (label: string): string | JSX.Element => {
    switch(label) {
        case FORECAST_LABELS.FEELS_LIKE: return degreeSymbol
        case FORECAST_LABELS.HUMIDITY: return '%'
        case FORECAST_LABELS.PRESSURE: return ' hPa'
        case FORECAST_LABELS.VISIBILITY: return ' metres'
        case FORECAST_LABELS.WIND: return ' km/h'
    }        

    return ''
}

export const transformForecastData = (data: WeatherTransformedData): ForecastInfo[] => {
    const forecastBlocks: Forecast = {
        feels_like: {
            label: FORECAST_LABELS.FEELS_LIKE,
            icon: `${ICON_SRC}thermometer.png`,
            forecast: ''
        },
        humidity: {
            label: FORECAST_LABELS.HUMIDITY,
            icon: `${ICON_SRC}humidity.png`,
            forecast: ''
        },
        pressure: {
            label: FORECAST_LABELS.PRESSURE,
            icon:  `${ICON_SRC}pressure.png`,
            forecast: ''
        },
        visibility: {
            label: FORECAST_LABELS.VISIBILITY,
            icon:  `${ICON_SRC}visibility.png`,
            forecast: ''
        },
        wind: {
            label: FORECAST_LABELS.WIND,
            icon:  `${ICON_SRC}wind.png`,
            forecast: ''
        }
    }

    Object.entries(data.list[0]).forEach(item => {
        for (let key in forecastBlocks) {
            if (key === item[0]) forecastBlocks[key as keyof Forecast].forecast = item[1] 
        }
    })

    return Object.values(forecastBlocks)
}