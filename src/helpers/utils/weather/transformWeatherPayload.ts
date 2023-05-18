import moment from 'moment'
import { nanoid } from 'nanoid'

import { WEATHER_ICON_URL } from '../../constants/weatherConstants'
import { getLocTime } from './weatherUtils'
import { 
  OpenWeatherCombinedPayload, 
  WeatherApiPayload, 
  WeatherTransformedData 
} from '../../../types/weather/weather'

export const transformOpenWeatherAPIPayload = (payload: OpenWeatherCombinedPayload): WeatherTransformedData => {
  const locHours: number | undefined = getLocTime(moment().utcOffset(payload.city.timezone / 60).format("H:mm"))
  const locDay: number = moment().utcOffset(payload.city.timezone / 60).day()
  const hoursStep: number = 3
  const daysStep: number = 1

  let forecastHours: number | undefined = 0
  let forecastDay: number = 0

  return {
    id: nanoid(),
    city: `${payload.city.name}, ${payload.city.country}`,
    description: `${payload.description.slice(0, 1).toUpperCase() + payload.description.slice(1)}`,
    lastUpdate: new Date(),
    icon: `${WEATHER_ICON_URL}${payload.icon}@2x.png`,
    iconId: payload.icon,
    timezone: payload.city.timezone,
    temp: `${Math.round(payload.temp)}`,
    temp_max: `${Math.round(payload.temp_max)}`,
    temp_min: `${Math.round(payload.temp_min)}`,
    humidity: payload.humidity,
    feels_like: `${Math.round(payload.feels_like)}`,
    pressure: payload.pressure,
    wind: `${Math.round(payload.wind)}`,
    visibility: payload.visibility,
    list: payload.list.map((item: any, index: number) => {
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
        icon: `${WEATHER_ICON_URL}${item.weather[0].icon}@2x.png`,
        main: item.weather[0].main,
        temp: `${Math.round(item.main.temp)}`,
        time: `${forecastHours}:00`,
      }
    })
  }
}

export const transformWeatherAPIPayload = (payload: WeatherApiPayload): any => {
  const currentLocHours = Number(moment(payload.location.localtime).format('HH'))
  const currentLocDay = moment(payload.location.localtime).format('dddd')

  return {
    id: nanoid(),
    city: payload.location.name,
    lastUpdate: new Date(),
    iconId: payload.current.condition.icon,
    loc_time: payload.location.localtime,
    feels_like: `${Math.round(payload.current.feelslike_c)}`,
    humidity: payload.current.humidity,
    pressure: payload.current.pressure_mb,
    visibility: payload.current.vis_km,
    wind: `${Math.round(payload.current.wind_kph)}`,
    temp: `${Math.round(payload.current.temp_c)}`,
    temp_max: `${Math.round(payload.forecast.forecastday[0].day.maxtemp_c)}`,
    temp_min: `${Math.round(payload.forecast.forecastday[0].day.mintemp_c)}`,
    list: payload.forecast.forecastday.map(day => {
      return day.hour.filter(hour => {
        const day = moment(hour.time).format('dddd')
        const hours = Number(moment(hour.time).format('HH'))

        if ((currentLocHours <= hours && currentLocDay === day) || currentLocDay !== day) {
          return hour
        } else {
          return null
        }
      }).map(hour => ({
        day: moment(hour.time).format('dddd'),
        time: moment(hour.time).format('HH:mm'),
        description: hour.condition.text,
        icon: hour.condition.icon,
        temp: `${Math.round(hour.temp_c)}`,
      }))
    })
  }
}