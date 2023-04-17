import React from "react"

import AdditionalForecast from "../AdditionalForecast/AdditionalForecast"

import "./index.scss"

const DetailedWeatherInfo: React.FC = () => {
    return (
        <>
            <AdditionalForecast
                header="Feels like"
                forecast="8"
                degree={true}
            />
            <AdditionalForecast
                header="Humidity"
                forecast="51%"
            />
            <AdditionalForecast
                header="Visibility"
                forecast="10km"
            />
            <AdditionalForecast
                header="Pressure"
                forecast="1016 hPa"
            />
            <AdditionalForecast
                header="Wind"
                forecast="10 km/h"
            />
        </>
    )
}

export default DetailedWeatherInfo