import React from "react"

import "./index.scss"

const HourlyForecast: React.FC = () => {
    const degreeSymbol = <var>&#176;</var>

    return (
        <section className="hourly-forecast">
            <div>
                <section>Now</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/01d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
            <div>
                <section>12</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/01d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
            <div>
                <section>15</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/01d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
            <div>
                <section>18</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/02d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
            <div>
                <section>21</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/03d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
            <div>
                <section>00</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/04d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
            <div>
                <section>03</section>
                <img src={`${process.env.PUBLIC_URL}/assets/weatherIcons/dayIcons/09d.png`} alt="cloudy" />
                <section>16{degreeSymbol}</section>
            </div>
        </section>
    )
}

export default HourlyForecast