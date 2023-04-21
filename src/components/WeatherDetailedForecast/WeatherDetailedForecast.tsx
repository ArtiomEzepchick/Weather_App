import React from "react"

import { WeatherTransformedData } from '../../types/weather'
import { addUnitsBasedOnLabels, transformForecastData } from "../../helpers/transformForecastData/transformForecastData"

import "./index.scss"

type Props = {
    weatherData: WeatherTransformedData
}

const WeatherDetailedForecast: React.FC<Props> = ({ weatherData }) => {
    const transformedData = transformForecastData(weatherData)

    return (
        <>
            <section className="weather-detailed-forecast">
                {transformedData.map(({ label, icon, forecast }) => (
                    <section key={label + forecast} className="weather-detailed-forecast-item">
                        <h2>{label}</h2>
                        <img src={icon} alt={label} />
                        <p>{forecast}{addUnitsBasedOnLabels(label)}</p>
                    </section>
                ))}
            </section>
        </>
    )
}

export default WeatherDetailedForecast