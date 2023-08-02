import React from "react";

import { ForecastData } from "../../../types/weather/weather";
import { addUnitsBasedOnLabels } from "../../../helpers/utils/weather/addUnitsBasedOnLabels/addUnitsBasedOnLabels";

import "./index.scss";

type Props = {
  detailedForecastData: ForecastData[];
};

const DetailedForecast: React.FC<Props> = ({ detailedForecastData }) => {
  return (
    <section className="weather-detailed-fc">
      {detailedForecastData.map(({ label, icon, forecast }) => (
        <section key={label + forecast} className="weather-detailed-fc-item">
          <h2>{label}</h2>
          <img src={icon} alt={label} />
          <p>
            {forecast}
            {addUnitsBasedOnLabels(label)}
          </p>
        </section>
      ))}
    </section>
  );
};

export default DetailedForecast;
