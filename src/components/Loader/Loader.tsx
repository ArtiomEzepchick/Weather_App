import React from "react"
import classNames from "classnames"

import "./index.scss"

type Props = {
    weatherDataLength: number;
}

const Loader: React.FC<Props> = ({ weatherDataLength }) => {
    return (
        <div
            id="loader"
            className={classNames(!weatherDataLength && 'margin-added')}
            data-testid="loader"
        />
    )
}

export default Loader