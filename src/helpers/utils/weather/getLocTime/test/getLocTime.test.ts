import { getLocTime } from "../getLocTime";

describe("getLocTime", () => {
  it("should return the correct locTime", () => {
    const locTime = "17:23";
    const expected = 15;

    const result = getLocTime(locTime);

    expect(result).toBe(expected);
  });

  it("should return the correct locTime", () => {
    const locTime = "15:02";
    const expected = 15;

    const result = getLocTime(locTime);

    expect(result).toBe(expected);
  });

  it("should return the correct locTime", () => {
    const locTime = "18:23";
    const expected = 18;

    const result = getLocTime(locTime);

    expect(result).toBe(expected);
  });
});
