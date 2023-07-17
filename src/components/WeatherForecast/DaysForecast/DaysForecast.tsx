import React from "react";

import { WeatherList } from "../../../types/weather/weather";
import { DEGREE_SYMBOL } from "../../../helpers/constants/weather/weather";

import "./index.scss";

type Props = {
  nextDaysForecastData: WeatherList[];
};

const DaysForecast: React.FC<Props> = ({ nextDaysForecastData }) => {
  return (
    <section className="weather-days-fc">
      <section className="weather-days-fc-items">
        {nextDaysForecastData.map((item) => (
          <section className="weather-days-fc-item" key={item.id}>
            <p className="weather-days-fc-item-date">
              <span>{item.day},</span>
              <span>{item.calendarDay}</span>
            </p>
            <p>
              <img
                src={item.icon}
                alt={item.description}
                title={item.description}
              />
              <span className="weather-days-fc-item-temp">
                {item.temp}
                {DEGREE_SYMBOL} / {item.tempMin}
                {DEGREE_SYMBOL}
              </span>
            </p>
          </section>
        ))}
      </section>
    </section>
  );
};

export default DaysForecast;
