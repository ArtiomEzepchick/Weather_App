import React from "react"
import moment from "moment-timezone"
import classNames from "classnames"
import { Dispatch } from "redux"
import { Space, Select } from "antd"

import CalendarEvents from "../CalendarEvents/CalendarEvents"

import { API_NAMES, DEGREE_SYMBOL } from "../../helpers/constants/weather/weather"
import { getCurrentWeather, setChosenWeatherAPI } from "../../model/weather/actions/actions"
import {
    WeatherTransformedData,
    ForecastData,
    WeatherList
} from "../../types/weather/weather"
import {
    transformDetailedForecast,
    filterWeatherDays,
    addUnitsBasedOnLabels,
    setLocalDateAndTime
} from "../../helpers/utils/weather/weather"

import './index.scss'

type Props = {
    dispatch: Dispatch;
    weatherData: WeatherTransformedData;
    isLoading: boolean;
}

const WeatherForecast: React.FC<Props> = ({ 
    dispatch,
    weatherData, 
    isLoading 
}) => {
    const { localTime, localDate, localDayOfTheWeek } = setLocalDateAndTime(weatherData)
    const detailedForecastData: ForecastData[] = transformDetailedForecast(weatherData)
    const nextDaysForecastData: WeatherList[] = filterWeatherDays(weatherData.list)
    const lastWeatherUpdate: string = moment.utc(weatherData.lastUpdate).fromNow()

    const handleUpdateWeatherData = (): void => {
        if (weatherData) {
            dispatch(setChosenWeatherAPI(weatherData.chosenWeatherApi))
            dispatch(getCurrentWeather(weatherData.city))
        }
    }

    const handleSelectChange = (value: string): void => {
        dispatch(setChosenWeatherAPI(value))

        if (weatherData?.city) {
            dispatch(getCurrentWeather(weatherData?.city))
        }
    }

    return (
        <section className={classNames("weather-forecast-container", isLoading && 'opacity-low')}>
            <section className="weather-with-calendar-container">
                <section className="weather-short-forecast">
                    <Space wrap>
                        <Select
                            value={weatherData.chosenWeatherApi}
                            style={{ width: 180 }}
                            onChange={handleSelectChange}
                            options={[
                                { value: API_NAMES.OPEN_WEATHER_API, label: 'OpenWeatherApi' },
                                { value: API_NAMES.WEATHER_API, label: 'WeatherApi' },
                            ]}
                        />
                    </Space>
                    <h1>{weatherData.city}</h1>
                    <p>{localTime}</p>
                    <p>{localDayOfTheWeek}, {localDate}</p>
                    <p className="degree">
                        {weatherData.temp}{DEGREE_SYMBOL}
                        <img src={weatherData.icon} alt={weatherData.description}></img>
                    </p>
                    <p>{weatherData.description}</p>
                    <p className='last-update'>
                        Last updated: {lastWeatherUpdate}
                    </p>
                    <button onClick={handleUpdateWeatherData} />
                </section>
                <CalendarEvents />
            </section>
            <section className="weather-main-forecast">
                {weatherData.list.length && weatherData.chosenWeatherApi === API_NAMES.WEATHER_API
                    ? <section className="weather-hourly-forecast">
                        <h2>Hourly forecast</h2>
                        <section className="weather-hourly-forecast-items">
                            {weatherData.list.map(item => (
                                <section className="weather-hourly-forecast-item" key={item.id}>
                                    <span>{item.time}</span>
                                    <p>
                                        <img
                                            src={item.icon}
                                            alt={item.description}
                                            title={item.description}
                                        />
                                        <span>{item.temp}{DEGREE_SYMBOL}</span>
                                    </p>
                                </section>
                            ))}
                        </section>
                    </section>
                    : null}
                {nextDaysForecastData.length && weatherData.chosenWeatherApi === API_NAMES.OPEN_WEATHER_API
                    ? <section className="weather-days-forecast">
                        <h2>{nextDaysForecastData.length}-day forecast</h2>
                        <section className="weather-days-forecast-items">
                            {nextDaysForecastData.map(item => (
                                <section className="weather-days-forecast-item" key={item.id}>
                                    <p className="weather-days-forecast-item-date">
                                        <span>{item.day},</span>
                                        <span>{item.calendarDay}</span>
                                    </p>
                                    <p>
                                        <img
                                            src={item.icon}
                                            alt={item.description}
                                            title={item.description}
                                        />
                                        <span className="weather-days-forecast-item-temp">
                                            {item.temp}{DEGREE_SYMBOL} / {item.tempMin}{DEGREE_SYMBOL}
                                        </span>
                                    </p>
                                </section>
                            ))}
                        </section>
                    </section>
                    : null}
                <section className="weather-detailed-forecast">
                    {detailedForecastData.map(({ label, icon, forecast }) => (
                        <section key={label + forecast} className="weather-detailed-forecast-item">
                            <h2>{label}</h2>
                            <img src={icon} alt={label} />
                            <p>
                                {forecast}{addUnitsBasedOnLabels(label)}
                            </p>
                        </section>
                    ))}
                </section>
            </section>
        </section>
    )
}

export default WeatherForecast