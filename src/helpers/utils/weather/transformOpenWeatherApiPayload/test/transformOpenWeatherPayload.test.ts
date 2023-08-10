import { transformOpenWeatherApiPayload } from "../transformOpenWeatherApiPayload";
import { combinedData } from "../../../../../__mocks__/combinedData";
import { expectedData } from "./__mocks__/transformOpenWeatherApiPayload.mock";

describe("transformDetailedForecast", () => {
  it("should transform the data correctly", () => {
    const transformedData = transformOpenWeatherApiPayload(combinedData);

    expect(transformedData).toHaveProperty("id");
  });
});
