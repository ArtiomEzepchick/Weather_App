import { WeatherTransformedData } from "../../types/weather"
import { 
    Forecast, 
    ForecastData, 
    WeatherList 
} from "../../types/weather"
import { 
    FORECAST_LABELS, 
    ICONS_SRC, 
    DEGREE_SYMBOL 
} from "../weatherConstants/weatherConstants"

export const addUnitsBasedOnLabels = (label: string): string | JSX.Element => {
    switch(label) {
        case FORECAST_LABELS.FEELS_LIKE: return DEGREE_SYMBOL
        case FORECAST_LABELS.HUMIDITY: return '%'
        case FORECAST_LABELS.PRESSURE: return ' hPa'
        case FORECAST_LABELS.VISIBILITY: return ' m'
        case FORECAST_LABELS.WIND: return ' km/h'
    }        

    return ''
}

export const transformForecastData = (data: WeatherTransformedData): ForecastData[] => {
    const forecastBlocks: Forecast = {
        feels_like: {
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
            icon:  `${ICONS_SRC}pressure.png`,
            forecast: ''
        },
        visibility: {
            label: FORECAST_LABELS.VISIBILITY,
            icon:  `${ICONS_SRC}visibility.png`,
            forecast: ''
        },
        wind: {
            label: FORECAST_LABELS.WIND,
            icon:  `${ICONS_SRC}wind.png`,
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

export const filterWeatherData = (data: WeatherTransformedData): WeatherList[] => {
    let currentDay: string = data.list[0].day
    let count: number = 0
    const result: WeatherList[] = []

    for (let item of data.list) {
        if (item.day !== currentDay) {
            ++count

            if (count === 4) {
                result.push(item)
                currentDay = item.day
                count = 0
            }

            if (result.length === 4) break
        }
    }

    return result
}

export const getLocTime = (locTime: string): number | undefined => {
    const parsedLocTime = parseInt(locTime)
    const diviseResult = Math.floor(parsedLocTime / 3)
  
    if (parsedLocTime / 3 === diviseResult) {
      return parsedLocTime
    } else {
      for (let i = 2; i > 0; i--) {
        if ((parsedLocTime - i) / 3 === diviseResult) return parsedLocTime - i
      }
    }
}