import React from "react"

import { filterWeatherData } from "../../helpers/transformForecastData/transformForecastData"
import { WeatherTransformedData } from "../../types/weather"
import { degreeSymbol } from "../../helpers/constants/constants"

import "./index.scss"

type Props = {
    weatherData: WeatherTransformedData
}

const WeatherDaysForecast: React.FC<Props> = ({ weatherData }) => {
    const filteredData = filterWeatherData(weatherData)

    return (
        <section className="weather-days-forecast">
            <h2>4 days forecast</h2>
            <section className="weather-days-container">
                {filteredData.map((item, index) => (
                    <section key={item.dt}>
                        <p>{item.day}</p>
                        <img src={item.icon} alt={filteredData[index].description} />
                        <p className="hourly-forecast-temp">{item.temp}{degreeSymbol}</p>
                    </section>
                ))}
            </section>
        </section>
    )
}

export default WeatherDaysForecast