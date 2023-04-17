import React, { useState } from "react"
import { Button, Input, Space } from "antd"
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { WeatherAction } from '../../types/actions'
import { getWeather } from '../../model/weather/actions/actions'

import './index.scss'

type Props = {
    getWeather: (city: string) => WeatherAction;
}

const CitySearch: React.FC<Props> = ({ getWeather }) => {
    const [city, setCity] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        getWeather(city)
    }

    return (
        <form className='city-search-container' onSubmit={handleSubmit}>
            <Space.Compact style={{ width: '100%' }}>
                <Input onChange={handleInputChange} value={city} placeholder="Your city here" />
                <Button htmlType="submit">Find</Button>
            </Space.Compact>
        </form>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWeather: bindActionCreators(getWeather, dispatch)
})

export default connect(
    null,
    mapDispatchToProps
)(CitySearch)