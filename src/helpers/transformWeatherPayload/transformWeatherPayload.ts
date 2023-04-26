import moment from 'moment'
import { nanoid } from 'nanoid'

import { ICON_URL } from '../weatherConstants/weatherConstants'
import {
  WeatherPayload,
  WeatherTransformedData
} from '../../types/weather'

export const transformWeatherPayload = (payload: WeatherPayload): WeatherTransformedData => ({
  id: nanoid(),
  city: `${payload.city.name}`,
  lastUpdate: new Date(),
  shortDescription: payload.list[0].weather[0].main.toLocaleLowerCase(),
  iconId: payload.list[0].weather[0].icon,
  list: payload.list
    .map(item => ({
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
      time: moment.unix(item.dt).utc().format('H:mm'),
      visibility: item.visibility,
      wind: `${Math.round(item.wind.speed)}`
    }))
})