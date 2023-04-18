import moment from 'moment'

import {
  WeatherPayload,
  WeatherTransformedData
} from '../../types/weather'

const ICON_URL = 'https://openweathermap.org/img/wn/'

export const transformWeatherPayload = (payload: WeatherPayload): WeatherTransformedData => ({
  city: `${payload.city.name}`,
  list: payload.list
    .map(item => ({
      day: moment.unix(item.dt).utc().format('dddd'),
      description: `${item.weather[0].description.slice(0, 1).toUpperCase() + item.weather[0].description.slice(1)}`,
      dt: item.dt,
      feels_like: `${Math.round(item.main.feels_like)}`,
      icon: `${ICON_URL}${item.weather[0].icon}@2x.png`,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      temp: `${Math.round(item.main.temp)}`,
      temp_max: `${Math.round(item.main.temp_max)}`,
      temp_min: `${Math.round(item.main.temp_min)}`,
      time: moment.unix(item.dt).utc().format('H:mm'),
      visibility: item.visibility,
      wind: `${Math.round(item.wind.speed)}`
    }))
})