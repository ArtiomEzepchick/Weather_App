import React from "react"

import "./index.scss"

const CurrentWeather: React.FC = () => {
    const degreeSymbol = <var>&#176;</var>
    
    return (
        <section className="short-weather-info">
            <h1 className="city">Grodno</h1>
            <p className="degree">16{degreeSymbol}</p>
            <p>Sometimes cloudy</p>
            <p>Max: 16{degreeSymbol}, min: 5{degreeSymbol}</p>
        </section>
    )
}

export default CurrentWeather