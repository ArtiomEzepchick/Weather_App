import moment from "moment-timezone";

import { getLocalDateAndTime } from "../getLocalDateAndTime";
import {
  openWeatherApimockData,
  weatherApiMockData,
  noTimezoneData,
} from "./mockData";

describe("getLocalDateAndTime", () => {
  test("should return local date and time when timezone is provided", () => {
    if (openWeatherApimockData.timezone) {
      const expectedResult = {
        localTime: moment()
          .utcOffset(openWeatherApimockData.timezone / 60)
          .format("H:mm"),
        localDate: moment()
          .utcOffset(openWeatherApimockData.timezone / 60)
          .format("MMM DD"),
        localDayOfTheWeek: moment()
          .utcOffset(openWeatherApimockData.timezone / 60)
          .format("dddd"),
      };

      expect(getLocalDateAndTime(openWeatherApimockData)).toEqual(
        expectedResult
      );
    }
  });

  test("should return local date and time when tzId is provided", () => {
    if (weatherApiMockData.tzId) {
      const expectedResult = {
        localTime: moment().tz(weatherApiMockData.tzId).format("H:mm"),
        localDate: moment().tz(weatherApiMockData.tzId).format("MMM DD"),
        localDayOfTheWeek: moment().tz(weatherApiMockData.tzId).format("dddd"),
      };

      expect(getLocalDateAndTime(weatherApiMockData)).toEqual(expectedResult);
    }
  });

  test("should return empty strings when neither timezone nor tzId is provided", () => {
    const expectedResult = {
      localTime: "",
      localDate: "",
      localDayOfTheWeek: "",
    };

    expect(getLocalDateAndTime(noTimezoneData)).toEqual(expectedResult);
  });
});
