import { filterSearchOptions } from "../filterSearchOptions";
import { mockData } from "./mockData";

test("should filter search options correctly", () => {
  const filteredOptions = filterSearchOptions(mockData);

  expect(filteredOptions).toEqual([
    "Brest, FR",
    "Brest, BY",
    "Brest, HR",
    "Brest, DE",
    "Brest, MK",
  ]);
});
