import React, { useEffect } from "react";
import { Space, Select } from "antd";
import moment from "moment-timezone";

import { getLocalDateAndTime } from "../../../helpers/utils/weather/getLocalDateAndTime/getLocalDateAndTime";
import { WeatherTransformedData } from "../../../types/weather/weather";
import {
  API_NAMES,
  DEGREE_SYMBOL,
} from "../../../helpers/constants/weather/weather";

import "./index.scss";

type Props = {
  isLoading: boolean;
  weatherData: WeatherTransformedData;
  handleSelectChange: (value: string) => void;
  handleUpdateWeatherData: () => void;
};

const ShortForecast: React.FC<Props> = ({
  isLoading,
  weatherData,
  handleSelectChange,
  handleUpdateWeatherData,
}) => {
  const { localTime, localDate, localDayOfTheWeek } =
    getLocalDateAndTime(weatherData);
  const lastWeatherUpdate: string = moment
    .utc(weatherData.lastUpdate)
    .fromNow();

  useEffect(() => {
    if (
      !lastWeatherUpdate.includes("minute") &&
      !lastWeatherUpdate.includes("minutes") &&
      !lastWeatherUpdate.includes("seconds")
    ) {
      handleUpdateWeatherData();
    }
  }, [handleUpdateWeatherData, lastWeatherUpdate]);

  return (
    <section className="weather-short-fc">
      <Space wrap>
        <Select
          disabled={isLoading}
          value={weatherData.chosenWeatherApi}
          style={{ width: 180 }}
          onChange={handleSelectChange}
          options={[
            { value: API_NAMES.OPEN_WEATHER_API, label: "OpenWeatherApi" },
            { value: API_NAMES.WEATHER_API, label: "WeatherApi" },
          ]}
        />
      </Space>
      <h1>{weatherData.city}</h1>
      <p>{localTime}</p>
      <p>
        {localDayOfTheWeek}, {localDate}
      </p>
      <p className="degree">
        {weatherData.temp}
        {DEGREE_SYMBOL}
        <img src={weatherData.icon} alt={weatherData.description}></img>
      </p>
      <p>{weatherData.description}</p>
      <p className="last-update">Last updated: {lastWeatherUpdate}</p>
      <button onClick={handleUpdateWeatherData} disabled={isLoading} />
    </section>
  );
};

export default ShortForecast;
