import { filterSearchOptions } from "../filterSearchOptions";
import { options, sameOptions } from "./__mocks__/filterSearchOptions.mock";

describe("filterSearchOptions", () => {
  it("should filter search options correctly", () => {
    const filteredOptions = filterSearchOptions(options);

    expect(filteredOptions).toEqual(["Brest, BY", "Brest, HR", "Brest, MK"]);
  });

  it("should return a single option if all options are the same", () => {
    const filteredOptions = filterSearchOptions(sameOptions);

    expect(filteredOptions).toEqual(["Brest, BY"]);
  });
});
