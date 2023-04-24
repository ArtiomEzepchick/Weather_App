import React from "react"
import { Button, Input, Space } from "antd"
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentWeather, setCurrentCity } from '../../model/weather/actions/actions'
import { WeatherState } from "../../types/states"

import './index.scss'

const CitySearch: React.FC = () => {
    const currentCity = useSelector((state: WeatherState) => state.currentCity)
    const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setCurrentCity(e.target.value))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(getCurrentWeather(currentCity))
    }

    return (
        <form className='city-search-container' onSubmit={handleSubmit}>
            <Space.Compact style={{ width: '100%' }}>
                <Input onChange={handleInputChange} value={currentCity} placeholder="Your city here" />
                <Button htmlType="submit">Find</Button>
            </Space.Compact>
        </form>
    )
}

export default CitySearch