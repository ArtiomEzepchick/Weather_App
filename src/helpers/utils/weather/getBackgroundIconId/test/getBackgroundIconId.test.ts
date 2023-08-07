import { getBackgroundIconId } from "../getBackgroundIconId";

describe("getBackgroundIconId", () => {
  it("should return the correct background icon id", () => {
    const iconId = "01d";

    const result = getBackgroundIconId(iconId);

    expect(result).toEqual("01d");
  });

  it("should return the correct background icon id", () => {
    const iconId = "//cdn.weatherapi.com/weather/64x64/day/116.png";

    const result = getBackgroundIconId(iconId);

    expect(result).toEqual("02d");
  });

  it("should return null if the iconId does not match any weather codes", () => {
    const iconId = "invalid";

    const result = getBackgroundIconId(iconId);

    expect(result).toBeNull();
  });
});
