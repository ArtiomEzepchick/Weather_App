import { filterWeatherDays } from "../filterWeatherDays";
import { mockData, expectedData } from "./__mocks__/filterWeatherDays.mock";

test("should filter and return the correct weather data", () => {
  expect(filterWeatherDays(mockData)).toEqual(expectedData);
});
