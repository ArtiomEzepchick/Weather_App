import React from "react"

import { DEGREE_SYMBOL } from "../../../helpers/constants/weather/weather"
import { WeatherList } from "../../../types/weather/weather"

import './index.scss'

type Props = {
    weatherDataList: WeatherList[];
}

const HourlyForecast: React.FC<Props> = ({ weatherDataList }) => {
    return (
        <section className="weather-hourly-fc">
            <section className="weather-hourly-fc-items">
                {weatherDataList.map(item => (
                    <section className="weather-hourly-fc-item" key={item.id}>
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
    )
}

export default HourlyForecast