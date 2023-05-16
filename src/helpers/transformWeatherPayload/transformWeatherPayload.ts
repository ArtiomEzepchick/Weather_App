import moment from 'moment'
import { nanoid } from 'nanoid'

import { WEATHER_ICON_URL } from '../constants/weatherConstants'
import { getLocTime } from '../utils/weatherUtils'
import { WeatherPayload, WeatherTransformedData } from '../../types/weather/weather'

export const transformWeatherPayload = (payload: WeatherPayload): WeatherTransformedData => {
  const locHours: number | undefined = getLocTime(moment().utcOffset(payload.city.timezone / 60).format("H:mm"))
  const locDay: number = moment().utcOffset(payload.city.timezone / 60).day()
  const hoursStep: number = 3
  const daysStep: number = 1

  let forecastHours: number | undefined = 0
  let forecastDay: number = 0

  return {
    id: nanoid(),
    city: `${payload.city.name}`,
    lastUpdate: new Date(),
    shortDescription: payload.list[0].weather[0].main.toLocaleLowerCase(),
    iconId: payload.list[0].weather[0].icon,
    timezone: payload.city.timezone,
    list: payload.list.map((item, index) => {
      if (forecastHours || forecastHours === 0) {
        forecastHours += hoursStep

        if (forecastHours === 24) {
          forecastHours = 0
          forecastDay += daysStep
        }

        if (!index) {
          forecastHours = locHours
          forecastDay = locDay
        }
      }

      return {
        day: moment().day(forecastDay).format('dddd'),
        description: `${item.weather[0].description.slice(0, 1).toUpperCase() + item.weather[0].description.slice(1)}`,
        dt: item.dt,
        feels_like: `${Math.round(item.main.feels_like)}`,
        icon: `${WEATHER_ICON_URL}${item.weather[0].icon}@2x.png`,
        humidity: item.main.humidity,
        main: item.weather[0].main,
        pressure: item.main.pressure,
        temp: `${Math.round(item.main.temp)}`,
        temp_max: `${Math.round(item.main.temp_max)}`,
        temp_min: `${Math.round(item.main.temp_min)}`,
        time: `${forecastHours}:00`,
        visibility: item.visibility,
        wind: `${Math.round(item.wind.speed)}`
      }
    })
  }
}
