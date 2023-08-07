import { filterWeatherDays } from "../filterWeatherDays";
import { mockData, expectedData } from "./mockData";

test("should filter and return the correct weather data", () => {
  const filteredData = filterWeatherDays(mockData);

  expect(filteredData).toEqual(expectedData);
});
