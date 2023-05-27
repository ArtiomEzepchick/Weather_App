import moment from 'moment-timezone'

import { WeatherTransformedData } from "../../../types/weather/weather"
import {
    Forecast,
    ForecastData,
    WeatherList,
    SearchOption
} from "../../../types/weather/weather"
import {
    FORECAST_LABELS,
    ICONS_SRC,
    DEGREE_SYMBOL,
    WEATHER_CODES
} from "../../constants/weather/weather"
import { StringValuesOnly } from '../../../types/commonTypes'

export const addUnitsBasedOnLabels = (label: string): string | JSX.Element => {
    switch (label) {
        case FORECAST_LABELS.FEELS_LIKE: return DEGREE_SYMBOL
        case FORECAST_LABELS.HUMIDITY: return '%'
        case FORECAST_LABELS.PRESSURE: return ' hPa'
        case FORECAST_LABELS.VISIBILITY: return ' m'
        case FORECAST_LABELS.WIND: return ' km/h'

        default: return ''
    }
}

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

export const filterSearchOptions = (payload: SearchOption[]): string[] => {
    const filteredOptions: string[] = []

    payload.forEach((item: SearchOption) => {
        const city = `${item.name}, ${item.country}`

        if (!filteredOptions.includes(city)) filteredOptions.push(city)
    })

    return filteredOptions
}

export const filterWeatherDays = (list: WeatherList[]): WeatherList[] => {
    let currentDay: string = list[0].day ? list[0].day : ''
    let count: number = 0
    let index: number = 0
    const filteredData: WeatherList[] = []

    for (let item of list) {
        if (item.day && item.day !== currentDay) {
            ++count

            if (count === 5) {
                filteredData.push(item)
            }

            if (count === 8) {
                currentDay = item.day
            }

            if (count === 9) {
                filteredData[index] = {
                    ...filteredData[index],
                    tempMin: item.tempMin
                }

                count = 1
                ++index

                if (filteredData.length === 4) break
            }
        }
    }

    return filteredData
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

export const setBackgroundImage = (url: string): string | null => {
    const result: string[] = []

    Object.entries(WEATHER_CODES)
    .forEach(([_, source]) => source
    .forEach((code) => url.includes(code) ? result.push(source[0]) : null))

    return result[0]
}

export const setLocalDateAndTime = (weatherData: WeatherTransformedData): StringValuesOnly => {
    const result = {
        localTime: '',
        localDate: '',
        localDayOfTheWeek: ''
    }

    if (weatherData.timezone || weatherData.timezone === 0) {
        result.localTime = moment().utcOffset(weatherData.timezone / 60).format("H:mm")
        result.localDate = moment().utcOffset(weatherData.timezone / 60).format('MMMM DD')
        result.localDayOfTheWeek = moment().utcOffset(weatherData.timezone / 60).format("dddd")
    } else {
        if (weatherData.tzId) {
            result.localTime = moment().tz(weatherData.tzId).format('H:mm')
            result.localDate = moment().tz(weatherData.tzId).format('MMMM DD')
            result.localDayOfTheWeek = moment().tz(weatherData.tzId).format("dddd")
        }
    }

    return result
}