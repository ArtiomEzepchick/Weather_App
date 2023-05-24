import React, { useCallback } from "react"
import moment from "moment"
import classNames from "classnames"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { Space, Select } from "antd"

import CalendarEvents from "../CalendarEvents/CalendarEvents"
import { API_NAMES, DEGREE_SYMBOL } from "../../helpers/constants/weatherConstants"
import { getCurrentWeather, setChosenWeatherAPI } from "../../model/weather/actions/actions"
import {
    WeatherTransformedData,
    WeatherList,
    ForecastData
} from "../../types/weather/weather"
import {
    transformDetailedForecast,
    filterWeatherData,
    addUnitsBasedOnLabels,
} from "../../helpers/utils/weather/weatherUtils"

import './index.scss'

type Props = {
    weatherData: WeatherTransformedData;
    isLoading: boolean;
}

const WeatherForecast: React.FC<Props> = ({ weatherData, isLoading }) => {
    const dispatch: Dispatch = useDispatch()

    const getLocalTime = useCallback((weatherData: any): any => {
        const result = {
            localTime: '',
            localDay: ''
        }

        if (weatherData.timezone) {
            result.localTime = moment().utcOffset(weatherData.timezone / 60).format("H:mm")
            result.localDay = moment().utcOffset(weatherData.timezone / 60).format('MMMM DD')
        } else {
            result.localTime = moment(weatherData.loc_time).format('HH:mm')
            result.localDay = moment(weatherData.loc_time).format('MMMM DD')
        }

        return result
    }, [])

    const { localTime, localDay } = getLocalTime(weatherData)

    const detailedForecastData: ForecastData[] = transformDetailedForecast(weatherData)
    const nextDaysForecastData: WeatherList[] = filterWeatherData(weatherData.list)
    const lastWeatherUpdate: string = moment.utc(weatherData.lastUpdate).fromNow()
    const localDayOfTheWeek: string = moment().utcOffset(weatherData.timezone / 60).format("dddd")

    const handleUpdateWeatherData = (): void => {
        if (weatherData) dispatch(getCurrentWeather(weatherData.city))
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
                                { value: API_NAMES.openWeatherApi, label: 'OpenWeatherApi' },
                                { value: API_NAMES.weatherApi, label: 'WeatherApi' },
                            ]}
                        />
                    </Space>
                    <h1>{weatherData.city}</h1>
                    <p>{localTime}</p>
                    <p>{localDayOfTheWeek}, {localDay}</p>
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
                {weatherData.list.length && weatherData.chosenWeatherApi === API_NAMES.weatherApi
                    ? <section className="weather-hourly-forecast">
                        <h2>Hourly forecast</h2>
                        <section className="weather-hourly-forecast-items">
                            {weatherData.list.map((item: any) => (
                                <section className="weather-hourly-forecast-item" key={item.id}>
                                    <span>{item.time}</span>
                                    <p>
                                        <img src={item.icon} alt={item.description} />
                                        <span>{item.temp}{DEGREE_SYMBOL}</span>
                                    </p>
                                </section>
                            ))}
                        </section>
                    </section>
                    : null}
                {nextDaysForecastData.length && weatherData.chosenWeatherApi === API_NAMES.openWeatherApi
                    ? <section className="weather-days-forecast">
                        <h2>{nextDaysForecastData.length}-day forecast</h2>
                        <section className="weather-days-forecast-items">
                            {nextDaysForecastData.map(item => (
                                <section className="weather-days-forecast-item" key={item.dt}>
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
                                            {item.temp}{DEGREE_SYMBOL} / {item.temp_min}{DEGREE_SYMBOL}
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