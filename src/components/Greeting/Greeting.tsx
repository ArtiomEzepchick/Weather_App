import React from "react"
import classNames from "classnames"

import './index.scss'

type Props = {
    isLoading: boolean;
}

const Greeting: React.FC<Props> = ({ isLoading }) => {
    return (
        <section className={classNames('greeting-container', isLoading && 'opacity-low')}>
            <h1>Welcome to Weather App!</h1>
            <p>You need to enter the name of the city in the input at the top to start exploring.</p>
            <p>Hope you enjoy it!</p>
        </section>
    )
}

export default Greeting