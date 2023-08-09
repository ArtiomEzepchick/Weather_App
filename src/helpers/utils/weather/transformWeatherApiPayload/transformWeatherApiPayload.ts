import moment from "moment";
import { nanoid } from "nanoid";

import { API_NAMES } from "../../../constants/weather/weather";
import {
  WeatherApiPayload,
  WeatherTransformedData,
} from "../../../../types/weather/weather";

export const transformWeatherApiPayload = (
  payload: WeatherApiPayload,
  city: string
): WeatherTransformedData => {
  const locHours = Number(moment(payload.location.localtime).format("HH"));
  const locDay = moment(payload.location.localtime).format("dddd");

  return {
    id: nanoid(),
    city,
    chosenWeatherApi: API_NAMES.WEATHER_API,
    lastUpdate: new Date(),
    description: payload.current.condition.text,
    icon: payload.current.condition.icon,
    iconId: payload.current.condition.icon,
    tzId: payload.location.tz_id,
    feelsLike: `${Math.round(payload.current.feelslike_c)}`,
    humidity: payload.current.humidity,
    pressure: payload.current.pressure_mb,
    visibility: payload.current.vis_km * 1000,
    wind: `${Math.round(payload.current.wind_kph)}`,
    temp: `${Math.round(payload.current.temp_c)}`,
    list: payload.forecast.forecastday
      .map((day) => {
        return day.hour
          .filter((hour) => {
            const day = moment(hour.time).format("dddd");
            const hours = Number(moment(hour.time).format("HH"));

            return (locHours < hours && locDay === day) || locDay !== day
              ? hour
              : null;
          })
          .map((hour) => ({
            id: nanoid(),
            time: moment(hour.time).format("HH:mm"),
            description: hour.condition.text,
            icon: hour.condition.icon,
            temp: `${Math.round(hour.temp_c)}`,
          }));
      })
      .flat()
      .slice(0, 12),
  };
};
