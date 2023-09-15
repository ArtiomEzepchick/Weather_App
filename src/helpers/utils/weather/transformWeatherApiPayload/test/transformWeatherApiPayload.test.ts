import { transformWeatherApiPayload } from "../transformWeatherApiPayload";
import { weatherApiPayload } from "../../../../../__mocks__/weatherApiPayload.mock";
import { emptyPayload } from "./__mocks__/transformWeatherApiPayload.mock";

describe("transformWeatherApiPayload", () => {
  const originalDateNow = Date.now;
  const mockDateNow = jest.fn(() => new Date("2023-08-10T12:00:00Z").getTime());
  Date.now = mockDateNow;

  it("should transform the payload correctly", () => {
    const result = transformWeatherApiPayload(weatherApiPayload, "Brest");

    expect(result.id).toBeDefined();
    expect(result.city).toBe("Brest");
    expect(result.chosenWeatherApi).toBe("weatherApi");
    expect(result.description).toBe("Sunny");
    expect(result.lastUpdate).toBeInstanceOf(Date);
    expect(result.icon).toBe("//cdn.weatherapi.com/weather/64x64/day/113.png");
    expect(result.iconId).toBe(
      "//cdn.weatherapi.com/weather/64x64/day/113.png"
    );
    expect(result.tzId).toBe("Europe/Zagreb");
    expect(result.temp).toBe("24");
    expect(result.humidity).toBe(61);
    expect(result.feelsLike).toBe("26");
    expect(result.pressure).toBe(1019);
    expect(result.wind).toBe("4");
    expect(result.visibility).toBe(10000);
    expect(result.list).toHaveLength(12);
    expect(result.list[0].id).toBeDefined();
    expect(result.list[0].description).toBe("Patchy rain possible");
    expect(result.list[0].icon).toBe(
      "//cdn.weatherapi.com/weather/64x64/day/176.png"
    );
    expect(result.list[0].temp).toBe("19");
  });

  it("should return almost an empty object if there is no values in payload properties", () => {
    const result = transformWeatherApiPayload(emptyPayload, "");

    expect(result.id).toBeDefined();
    expect(result.city).toBe("");
    expect(result.chosenWeatherApi).toBe("weatherApi");
    expect(result.description).toBe("");
    expect(result.lastUpdate).toBeInstanceOf(Date);
    expect(result.icon).toBe("");
    expect(result.iconId).toBe("");
    expect(result.tzId).toBe("");
    expect(result.temp).toBe("0");
    expect(result.humidity).toBe(0);
    expect(result.feelsLike).toBe("0");
    expect(result.pressure).toBe(0);
    expect(result.wind).toBe("0");
    expect(result.visibility).toBe(0);
    expect(result.list).toHaveLength(0);
  });

  afterAll(() => {
    Date.now = originalDateNow;
  });
});
