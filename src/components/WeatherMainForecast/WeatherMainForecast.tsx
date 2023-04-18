import React from "react"

import { WeatherTransformedData } from "../../types/weather"
import { degreeSymbol } from "../../helpers/constants/constants"

import "./index.scss"

type Props = {
    weatherData: WeatherTransformedData
}

const WeatherMainForecast: React.FC<Props> = ({ weatherData }) => {
    const currentWeatherData = weatherData.list[0]

    return (
        <section className="weather-main-forecast">
            <h1 className="city">{weatherData.city}</h1>
            <p className="degree">
                {currentWeatherData.temp}{degreeSymbol}
                <img src={currentWeatherData.icon} alt={currentWeatherData.description}></img>
            </p>
            <p>{currentWeatherData.description}</p>
            <p>Max: {currentWeatherData.temp_max}{degreeSymbol}, min: {currentWeatherData.temp_min}{degreeSymbol}</p>
        </section>
    )
}

export default WeatherMainForecast