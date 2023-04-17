import React from "react"

import "./index.scss"

const DetailedWeatherInfo: React.FC = () => {
    const degreeSymbol = <var>&#176;</var>

    return (
        <>
            <section className="additional-info">
                <h2>Feels like</h2>
                <div>9{degreeSymbol}</div>
            </section>
            <section className="additional-info">
                <h2>Humidity</h2>
                <div>ICON</div>
                <p>65%</p>
            </section>
            <section className="additional-info">
                <h2>Pressure</h2>
                <div>ICON</div>
                <p>1025 hPa</p>
            </section>
            <section className="additional-info">
                <h2>Wind Speed</h2>
                <div>ICON</div>
                <p>10 km/h</p>
            </section>
        </>
    )
}

export default DetailedWeatherInfo