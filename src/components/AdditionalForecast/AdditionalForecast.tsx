import React from "react"

import "./index.scss"

type Props = {
    forecast: string,
    header: string,
    degree?: boolean,
    icon?: string,
    alt?: string,
}

const AdditionalForecast: React.FC<Props> = ({ 
    degree = false, 
    forecast, 
    header, 
    icon, 
    alt 
}) => {
    const degreeSymbol = <var>&#176;</var>

    return (
        <section className="additional-forecast">
            <h2>{header}</h2>
            <p>{forecast}{degree && degreeSymbol}</p>
        </section>
    )
}

export default AdditionalForecast