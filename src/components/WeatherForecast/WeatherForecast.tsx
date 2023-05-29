import React, { useCallback, useMemo } from "react"
import classNames from "classnames"
import { Dispatch } from "redux"

import CalendarEvents from "../CalendarEvents/CalendarEvents"
import ShortForecast from "./ShortForecast/ShortForecast"
import DaysForecast from "./DaysForecast/DaysForecast"
import HourlyForecast from "./HourlyForecast/HourlyForecast"
import DetailedForecast from "./DetailedForecast/DetailedForecast"

import { API_NAMES } from "../../helpers/constants/weather/weather"
import { getCalendarEvents } from "../../model/calendar/actions/actions"
import { getCurrentWeather, setChosenWeatherAPI } from "../../model/weather/actions/actions"
import { transformDetailedForecast, filterWeatherDays } from "../../helpers/utils/weather/weather"
import {
    WeatherTransformedData,
    ForecastData,
    WeatherList
} from "../../types/weather/weather"

import './index.scss'

type Props = {
    dispatch: Dispatch;
    weatherData: WeatherTransformedData;
    isLoading: boolean;
    userToken: string | null;
}

const { OPEN_WEATHER_API, WEATHER_API } = API_NAMES

const WeatherForecast: React.FC<Props> = ({
    dispatch,
    weatherData,
    isLoading,
    userToken
}) => {
    const detailedForecastData: ForecastData[] = useMemo((): ForecastData[] => transformDetailedForecast(weatherData), [weatherData])
    const nextDaysForecastData: WeatherList[] = useMemo((): WeatherList[] => filterWeatherDays(weatherData.list), [weatherData.list])

    const handleUpdateWeatherData = useCallback((): void => {
        if (weatherData) {
            dispatch(setChosenWeatherAPI(weatherData.chosenWeatherApi))
            dispatch(getCurrentWeather(weatherData.city))
        }
    }, [dispatch, weatherData])

    const handleUpdateCalendarEvents = useCallback((): void => {
        if (userToken) {
            dispatch(getCalendarEvents(userToken))
        }
    }, [dispatch, userToken])

    const handleSelectChange = useCallback((value: string): void => {
        dispatch(setChosenWeatherAPI(value))

        if (weatherData?.city) {
            dispatch(getCurrentWeather(weatherData?.city))
        }
    }, [dispatch, weatherData?.city])

    return (
        <section className={classNames("weather-fc-container", isLoading && 'opacity-low')}>
            <section className="weather-short-fc-and-calendar">
                <ShortForecast
                    weatherData={weatherData}
                    handleSelectChange={handleSelectChange}
                    handleUpdateWeatherData={handleUpdateWeatherData}
                />
                <CalendarEvents handleUpdateCalendarEvents={handleUpdateCalendarEvents} />
            </section>
            <section className="weather-main-fc">
                {weatherData.chosenWeatherApi === OPEN_WEATHER_API && nextDaysForecastData.length &&
                    <DaysForecast nextDaysForecastData={nextDaysForecastData} />
                }
                {weatherData.chosenWeatherApi === WEATHER_API && weatherData.list.length &&
                    <HourlyForecast weatherDataList={weatherData.list} />
                }
                <DetailedForecast detailedForecastData={detailedForecastData}/>
            </section>
        </section>
    )
}

export default WeatherForecast