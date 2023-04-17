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
      time: moment.unix(item.dt).utc().format('H:mm'),
      temp: `${Math.round(item.main.temp)}`,
      temp_max: `${Math.round(item.main.temp_max)}`,
      temp_min: `${Math.round(item.main.temp_min)}`,
      icon: `${ICON_URL}${item.weather[0].icon}@2x.png`,
      dt: item.dt,
      visibility: item.visibility,
      wind: `${Math.round(item.wind.speed)}`
    }))
})