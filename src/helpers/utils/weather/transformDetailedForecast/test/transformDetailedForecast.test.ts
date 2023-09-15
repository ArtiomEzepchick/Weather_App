import {
  mockData,
  expectedData,
} from "./__mocks__/transformDetailedForecast.mock";
import { transformDetailedForecast } from "../transformDetailedForecast";

describe("transformDetailedForecast", () => {
  it("should transform the data correctly", () => {
    expect(transformDetailedForecast(mockData)).toEqual(expectedData);
  });
});
