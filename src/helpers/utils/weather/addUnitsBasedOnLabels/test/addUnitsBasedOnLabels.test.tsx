import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { addUnitsBasedOnLabels } from "../addUnitsBasedOnLabels";
import {
  DEGREE_SYMBOL,
  FORECAST_LABELS,
} from "../../../../constants/weather/weather";

describe("addUnitsBasedOnLabels", () => {
  it("returns the correct unit based on the label", () => {
    expect(addUnitsBasedOnLabels(FORECAST_LABELS.FEELS_LIKE)).toBe(
      DEGREE_SYMBOL
    );
    expect(addUnitsBasedOnLabels(FORECAST_LABELS.HUMIDITY)).toBe("%");
    expect(addUnitsBasedOnLabels(FORECAST_LABELS.PRESSURE)).toBe(" hPa");
    expect(addUnitsBasedOnLabels(FORECAST_LABELS.VISIBILITY)).toBe(" m");
    expect(addUnitsBasedOnLabels(FORECAST_LABELS.WIND)).toBe(" km/h");
    expect(addUnitsBasedOnLabels("Unknown")).toBe("");
  });

  it("renders the correct unit as JSX element", () => {
    const { getByText } = render(
      <div>{addUnitsBasedOnLabels(FORECAST_LABELS.FEELS_LIKE)}</div>
    );
    expect(getByText(DEGREE_SYMBOL)).toBeInTheDocument();
  });
});
