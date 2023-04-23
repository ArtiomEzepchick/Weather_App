import React from "react"

import WeatherTemperatureItem from "../WeatherTemperatureItem/WeatherTemperatureItem"

import { WeatherTransformedData } from "../../types/weather"
import { degreeSymbol } from "../../helpers/constants/constants"
import {
    transformForecastData,
    filterWeatherData,
    addUnitsBasedOnLabels
} from "../../helpers/transformForecastData/transformForecastData"

import './index.scss'

type Props = {
    weatherData: WeatherTransformedData
}

const WeatherForecast: React.FC<Props> = ({ weatherData }) => {
    const shortWeatherData = weatherData.list[0]
    const hourlyForecastData = weatherData.list.slice(0, 8)
    const detailedForecastData = transformForecastData(weatherData)
    const nextDaysForecastData = filterWeatherData(weatherData)

    return (
        <>
            <section className="weather-short-forecast">
                <h1>{weatherData.city}</h1>
                <span className="degree">
                    {shortWeatherData.temp}{degreeSymbol}
                    <img src={shortWeatherData.icon} alt={shortWeatherData.description}></img>
                </span>
                <span>{shortWeatherData.description}</span>
                <span>Max: {shortWeatherData.temp_max}{degreeSymbol}, min: {shortWeatherData.temp_min}{degreeSymbol}</span>
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
        </>
    )
}

export default WeatherForecast