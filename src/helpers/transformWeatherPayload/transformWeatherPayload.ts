import moment from 'moment'
import { nanoid } from 'nanoid'

import { ICON_URL } from '../weatherConstants/weatherConstants'
import { getLocTime } from '../transformForecastData/transformForecastData'
import {
  WeatherPayload,
  WeatherTransformedData
} from '../../types/weather'

export const transformWeatherPayload = (payload: WeatherPayload): WeatherTransformedData => {
  const locTime: number | undefined = getLocTime(moment().utcOffset(payload.city.timezone / 60).format("H:mm"))
  let forecastTime: number | undefined = 0
  const count: number = 3
  
  return {
    id: nanoid(),
    city: `${payload.city.name}`,
    lastUpdate: new Date(),
    shortDescription: payload.list[0].weather[0].main.toLocaleLowerCase(),
    iconId: payload.list[0].weather[0].icon,
    timezone: payload.city.timezone,
    list: payload.list.map((item, index) => {
      if (forecastTime || forecastTime === 0) {
        forecastTime += count
        
        if (forecastTime === 24) forecastTime = 0

        if (!index) {
          forecastTime = locTime
        }
      }
      
      return {
        day: moment.unix(item.dt).utc().format('dddd'),
        description: `${item.weather[0].description.slice(0, 1).toUpperCase() + item.weather[0].description.slice(1)}`,
        dt: item.dt,
        feels_like: `${Math.round(item.main.feels_like)}`,
        icon: `${ICON_URL}${item.weather[0].icon}@2x.png`,
        humidity: item.main.humidity,
        main: item.weather[0].main,
        pressure: item.main.pressure,
        temp: `${Math.round(item.main.temp)}`,
        temp_max: `${Math.round(item.main.temp_max)}`,
        temp_min: `${Math.round(item.main.temp_min)}`,
        time: `${forecastTime}:00`,
        visibility: item.visibility,
        wind: `${Math.round(item.wind.speed)}`
      }
    })
  }
}
