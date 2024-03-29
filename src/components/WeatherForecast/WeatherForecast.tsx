import React, { useCallback, useMemo } from "react";
import { Dispatch } from "redux";

import CalendarEvents from "../CalendarEvents/CalendarEvents";
import ShortForecast from "./ShortForecast/ShortForecast";
import DaysForecast from "./DaysForecast/DaysForecast";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import DetailedForecast from "./DetailedForecast/DetailedForecast";

import { API_NAMES } from "../../helpers/constants/weather/weather";
import { getCalendarEvents } from "../../model/user/actions/actions";
import {
  getCurrentWeather,
  setChosenWeatherApi,
} from "../../model/weather/actions/actions";
import { transformDetailedForecast } from "../../helpers/utils/weather/transformDetailedForecast/transformDetailedForecast";
import { filterWeatherDays } from "../../helpers/utils/weather/filterWeatherDays/filterWeatherDays";
import {
  WeatherTransformedData,
  ForecastData,
  WeatherList,
} from "../../types/weather/weather";

import "./index.scss";

type Props = {
  dispatch: Dispatch;
  weatherData: WeatherTransformedData;
  isLoading: boolean;
  userToken: string | null;
};

const { OPEN_WEATHER_API, WEATHER_API } = API_NAMES;

const WeatherForecast: React.FC<Props> = ({
  dispatch,
  weatherData,
  isLoading,
  userToken,
}) => {
  const detailedForecastData: ForecastData[] = useMemo(
    (): ForecastData[] => transformDetailedForecast(weatherData),
    [weatherData]
  );
  const nextDaysForecastData: WeatherList[] = useMemo(
    (): WeatherList[] => filterWeatherDays(weatherData.list),
    [weatherData.list]
  );

  const handleUpdateWeatherData = useCallback((): void => {
    if (weatherData) {
      dispatch(setChosenWeatherApi(weatherData.chosenWeatherApi));
      dispatch(getCurrentWeather(weatherData.city));
    }
  }, [dispatch, weatherData]);

  const handleUpdateCalendarEvents = useCallback((): void => {
    if (userToken) {
      dispatch(getCalendarEvents(userToken));
    }
  }, [dispatch, userToken]);

  const handleSelectChange = useCallback(
    (value: string): void => {
      dispatch(setChosenWeatherApi(value));

      if (weatherData?.city) {
        dispatch(getCurrentWeather(weatherData?.city));
      }
    },
    [dispatch, weatherData?.city]
  );

  return (
    <section className="weather-fc-container">
      <section className="weather-short-fc-and-calendar">
        <ShortForecast
          isLoading={isLoading}
          weatherData={weatherData}
          handleSelectChange={handleSelectChange}
          handleUpdateWeatherData={handleUpdateWeatherData}
        />
        <CalendarEvents
          isLoading={isLoading}
          handleUpdateCalendarEvents={handleUpdateCalendarEvents}
        />
      </section>
      <section className="weather-main-fc">
        {weatherData.chosenWeatherApi === OPEN_WEATHER_API &&
          nextDaysForecastData.length && (
            <DaysForecast nextDaysForecastData={nextDaysForecastData} />
          )}
        {weatherData.chosenWeatherApi === WEATHER_API &&
          weatherData.list.length && (
            <HourlyForecast weatherDataList={weatherData.list} />
          )}
        <DetailedForecast detailedForecastData={detailedForecastData} />
      </section>
    </section>
  );
};

export default WeatherForecast;
