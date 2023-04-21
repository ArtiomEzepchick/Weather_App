import React from "react"

import WeatherTemperatureItem from "../WeatherTemperatureItem/WeatherTemperatureItem"

import { filterWeatherData } from "../../helpers/transformForecastData/transformForecastData"
import { WeatherTransformedData } from "../../types/weather"

import "./index.scss"

type Props = {
    weatherData: WeatherTransformedData
}

const WeatherDaysForecast: React.FC<Props> = ({ weatherData }) => {
    const filteredData = filterWeatherData(weatherData)

    return (
        <section className="weather-days-container">
            <h2>4 days forecast</h2>
            <section className="weather-days-forecast">
                {filteredData.map(item => (
                    <WeatherTemperatureItem 
                        data={item}
                        key={item.dt}
                    />
                ))}
            </section>
        </section>
    )
}

export default WeatherDaysForecast