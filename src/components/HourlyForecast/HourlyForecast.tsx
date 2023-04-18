import React from "react"

import { WeatherTransformedData } from '../../types/weather'
import { degreeSymbol } from "../../helpers/constants/constants"

import "./index.scss"

type Props = {
    weatherData: WeatherTransformedData
}

const HourlyForecast: React.FC<Props> = ({ weatherData }) => {
    const weatherDataSliced = weatherData.list.slice(0, 8)
    
    return (
        <section className="hourly-forecast">
            {weatherDataSliced.map((item, index) =>
                <section key={item.dt}>
                    <p>{item.day}<br />{item.time}</p>
                    <img src={item.icon} alt={weatherDataSliced[index].description} />
                    <p className="hourly-forecast-temp">{item.temp}{degreeSymbol}</p>
                </section>)}
        </section>
    )
}

export default HourlyForecast