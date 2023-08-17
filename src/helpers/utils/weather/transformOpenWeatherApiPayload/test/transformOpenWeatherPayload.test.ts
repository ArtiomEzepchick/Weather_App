import { transformOpenWeatherApiPayload } from "../transformOpenWeatherApiPayload";
import { openWeatherCombinedPayloadMock } from "../../../../../__mocks__/openWeatherCombinedPayload.mock";
import { emptyPayload } from "./__mocks__/transformOpenWeatherPayload.mock";

describe("transformDetailedForecast", () => {
  const originalDateNow = Date.now;
  const mockDateNow = jest.fn(() => new Date("2023-08-10T12:00:00Z").getTime());
  Date.now = mockDateNow;

  it("should transform the payload correctly", () => {
    const result = transformOpenWeatherApiPayload(
      openWeatherCombinedPayloadMock
    );

    expect(result.id).toBeDefined();
    expect(result.city).toBe("Hrodna, BY");
    expect(result.chosenWeatherApi).toBe("openWeatherApi");
    expect(result.description).toBe("Overcast clouds");
    expect(result.lastUpdate).toBeInstanceOf(Date);
    expect(result.icon).toBe("https://openweathermap.org/img/wn/04n@2x.png");
    expect(result.iconId).toBe("04n");
    expect(result.timezone).toBe(10800);
    expect(result.temp).toBe("13");
    expect(result.humidity).toBe(90);
    expect(result.feelsLike).toBe("13");
    expect(result.pressure).toBe(1017);
    expect(result.wind).toBe("3");
    expect(result.visibility).toBe(10000);
    expect(result.list).toHaveLength(40);
    expect(result.list[0].id).toBeDefined();
    expect(result.list[0].day).toBe("Thursday");
    expect(result.list[0].calendarDay).toBe("Aug 10");
    expect(result.list[0].description).toBe("Light rain");
    expect(result.list[0].icon).toBe(
      "https://openweathermap.org/img/wn/10n@2x.png"
    );
    expect(result.list[0].temp).toBe("13");
    expect(result.list[0].tempMin).toBe("13");
  });

  it("should return almost an empty object if there is no values in payload properties", () => {
    const result = transformOpenWeatherApiPayload(emptyPayload);

    expect(result.id).toBeDefined();
    expect(result.city).toBe(", ");
    expect(result.chosenWeatherApi).toBe("openWeatherApi");
    expect(result.description).toBe("");
    expect(result.lastUpdate).toBeInstanceOf(Date);
    expect(result.icon).toBe("https://openweathermap.org/img/wn/@2x.png");
    expect(result.iconId).toBe("");
    expect(result.timezone).toBe(0);
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
