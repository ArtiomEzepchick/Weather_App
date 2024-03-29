import moment from "moment";
import { nanoid } from "nanoid";

import {
  API_NAMES,
  WEATHER_ICON_URL,
} from "../../../constants/weather/weather";
import { getLocTime } from "../getLocTime/getLocTime";
import {
  OpenWeatherCombinedPayload,
  WeatherTransformedData,
} from "../../../../types/weather/weather";

export const transformOpenWeatherApiPayload = (
  payload: OpenWeatherCombinedPayload
): WeatherTransformedData => {
  const locHours: number | undefined = getLocTime(
    moment()
      .utcOffset(payload.city.timezone / 60)
      .format("H:mm")
  );
  const locDay: number = moment()
    .utcOffset(payload.city.timezone / 60)
    .day();
  const hoursStep: number = 3;
  const daysStep: number = 1;

  let forecastHours: number | undefined = 0;
  let forecastDay: number = 0;

  return {
    id: nanoid(),
    city: `${payload.city.name}, ${payload.city.country}`,
    chosenWeatherApi: API_NAMES.OPEN_WEATHER_API,
    description: `${
      payload.description.slice(0, 1).toUpperCase() +
      payload.description.slice(1)
    }`,
    lastUpdate: new Date(),
    icon: `${WEATHER_ICON_URL}${payload.icon}@2x.png`,
    iconId: payload.icon,
    timezone: payload.city.timezone,
    temp: `${Math.round(payload.temp)}`,
    humidity: payload.humidity,
    feelsLike: `${Math.round(payload.feels_like)}`,
    pressure: payload.pressure,
    wind: `${Math.round(payload.wind)}`,
    visibility: payload.visibility,
    list: payload.list.map((item, index) => {
      if (forecastHours || forecastHours === 0) {
        forecastHours += hoursStep;

        if (forecastHours === 24) {
          forecastHours = 0;
          forecastDay += daysStep;
        }

        if (!index) {
          forecastHours = locHours;
          forecastDay = locDay;
        }
      }

      return {
        id: nanoid(),
        day: moment().day(forecastDay).format("dddd"),
        calendarDay: moment().day(forecastDay).format("MMM D"),
        description: `${
          item.weather[0].description.slice(0, 1).toUpperCase() +
          item.weather[0].description.slice(1)
        }`,
        icon: `${WEATHER_ICON_URL}${item.weather[0].icon}@2x.png`,
        temp: `${Math.round(item.main.temp_max)}`,
        tempMin: `${Math.round(item.main.temp_min)}`,
      };
    }),
  };
};
