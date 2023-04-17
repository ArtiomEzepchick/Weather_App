import React from "react"

import { WeatherTransformedData } from '../../types/weather'

import "./index.scss"

type Props = {
    data: WeatherTransformedData
}

const HourlyForecast: React.FC<Props> = ({ data }) => {
    const degreeSymbol = <var>&#176;</var>

    return (
        <section className="hourly-forecast">
            {data.list.slice(0, 8).map(item =>
                <section key={item.dt}>
                    <p>{item.day}<br />{item.time}</p>
                    <img src={item.icon} aria-label='icon' />
                    <p>{item.temp}{degreeSymbol}</p>
                </section>)}
        </section>
    )
}

export default HourlyForecast