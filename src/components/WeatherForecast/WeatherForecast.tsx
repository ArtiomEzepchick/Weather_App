import React from "react"
import moment from "moment"
import classNames from "classnames"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"

import WeatherTemperatureItem from "../WeatherTemperatureItem/WeatherTemperatureItem"


import { DEGREE_SYMBOL } from "../../helpers/weatherConstants/weatherConstants"
import { getCurrentWeather } from "../../model/weather/actions/actions"
import { 
    WeatherTransformedData, 
    WeatherList,
    ForecastData 
} from "../../types/weather"
import {
    transformForecastData,
    filterWeatherData,
    addUnitsBasedOnLabels,
} from "../../helpers/weatherUtils/weatherUtils"

import './index.scss'

type Props = {
    weatherData: WeatherTransformedData;
    isLoading: boolean;
}

const WeatherForecast: React.FC<Props> = ({ weatherData, isLoading }) => {
    const dispatch: Dispatch = useDispatch()

    const shortForecastData: WeatherList = weatherData.list[0]
    const hourlyForecastData: WeatherList[] = weatherData.list.slice(0, 8)
    const detailedForecastData: ForecastData[] = transformForecastData(weatherData)
    const nextDaysForecastData: WeatherList[] = filterWeatherData(weatherData)
    const lastWeatherUpdate: string = moment.utc(weatherData.lastUpdate).fromNow()
    const currentLocationTime: string = moment().utcOffset(weatherData.timezone / 60).format("H:mm")

    const handleUpdateWeatherData = (): void => {
        if (weatherData) dispatch(getCurrentWeather(weatherData.city))
    }

    return (
        <section className={classNames("weather-forecast-container", isLoading && 'opacity-low')}>
            <section className="weather-short-forecast">
                <h1>{weatherData.city}</h1>
                <span>Location time: {currentLocationTime}</span>
                <span className="degree">
                    {shortForecastData.temp}{DEGREE_SYMBOL}
                    <img src={shortForecastData.icon} alt={shortForecastData.description}></img>
                </span>
                <span>{shortForecastData.description}</span>
                <span>Max: {shortForecastData.temp_max}{DEGREE_SYMBOL}, min: {shortForecastData.temp_min}{DEGREE_SYMBOL}</span>
                <span className='last-update'>Last updated: {lastWeatherUpdate}</span>
                <button onClick={handleUpdateWeatherData} />
            </section>
            <section className="weather-main-forecast">
                <section className="weather-hourly-forecast">
                    {hourlyForecastData.map(item =>
                        <WeatherTemperatureItem
                            data={item}
                            key={item.dt}
                            isTime={true}
                        />
                    )}
                </section>
                <section className="weather-detailed-forecast">
                    {detailedForecastData.map(({ label, icon, forecast }) => (
                        <section key={label + forecast} className="weather-detailed-forecast-item">
                            <h2>{label}</h2>
                            <img src={icon} alt={label} />
                            <span>{forecast}{addUnitsBasedOnLabels(label)}</span>
                        </section>
                    ))}
                </section>
                <section className="weather-days-forecast">
                    <h2>4 days forecast</h2>
                    <section>
                        {nextDaysForecastData.map(item => (
                            <WeatherTemperatureItem
                                data={item}
                                key={item.dt}
                            />
                        ))}
                    </section>
                </section>
            </section>
        </section>
    )
}

export default WeatherForecast