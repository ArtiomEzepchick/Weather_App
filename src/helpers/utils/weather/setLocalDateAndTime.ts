import moment from "moment-timezone";

import { WeatherTransformedData } from "../../../types/weather/weather";

export const setLocalDateAndTime = (weatherData: WeatherTransformedData) => {
  const result = {
    localTime: "",
    localDate: "",
    localDayOfTheWeek: "",
  };

  if (weatherData.timezone || weatherData.timezone === 0) {
    result.localTime = moment()
      .utcOffset(weatherData.timezone / 60)
      .format("H:mm");
    result.localDate = moment()
      .utcOffset(weatherData.timezone / 60)
      .format("MMM DD");
    result.localDayOfTheWeek = moment()
      .utcOffset(weatherData.timezone / 60)
      .format("dddd");
  } else {
    if (weatherData.tzId) {
      result.localTime = moment().tz(weatherData.tzId).format("H:mm");
      result.localDate = moment().tz(weatherData.tzId).format("MMM DD");
      result.localDayOfTheWeek = moment().tz(weatherData.tzId).format("dddd");
    }
  }

  return result;
};
