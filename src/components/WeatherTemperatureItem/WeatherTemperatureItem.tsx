import React from "react"

import { WeatherList } from "../../types/weather"
import { DEGREE_SYMBOL } from "../../helpers/weatherConstants/weatherConstants"

import './index.scss'

type Props = {
    data: WeatherList;
    isTime?: boolean;
}

const WeatherTemperatureItem: React.FC<Props> = ({ data, isTime = false }) => {
    return (
        <section className="weather-temperature-item" key={data.dt}>
            <span>{data.day}<br /> {isTime && data.time}</span>
            <img src={data.icon} alt={data.description} title={data.description} />
            <span className="temperature-forecast">{data.temp}{DEGREE_SYMBOL}</span>
        </section>
    )
}

export default WeatherTemperatureItem