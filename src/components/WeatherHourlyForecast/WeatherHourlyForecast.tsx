import React from "react"

import WeatherTemperatureItem from "../WeatherTemperatureItem/WeatherTemperatureItem"

import { WeatherTransformedData } from '../../types/weather'

import "./index.scss"

type Props = {
    weatherData: WeatherTransformedData
}

const WeatherHourlyForecast: React.FC<Props> = ({ weatherData }) => {
    const weatherDataSliced = weatherData.list.slice(0, 8)

    return (
        <section className="weather-hourly-forecast">
            {weatherDataSliced.map(item =>
                <WeatherTemperatureItem
                    data={item}
                    key={item.dt}
                    isTime={true}
                />
            )}
        </section>
    )
}

export default WeatherHourlyForecast