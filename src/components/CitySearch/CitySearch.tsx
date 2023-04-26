import React from "react"
import { Button, Input, Space } from "antd"
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentWeather, setInputCityValue } from '../../model/weather/actions/actions'
import { WeatherState } from "../../types/states"

import './index.scss'

const CitySearch: React.FC = () => {
    const { inputCityValue, isLoading } = useSelector((state: WeatherState) => state)

    const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setInputCityValue(e.target.value))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(getCurrentWeather(inputCityValue))
    }

    return (
        <form className='city-search-container' onSubmit={handleSubmit}>
            <Space.Compact style={{ width: '100%' }}>
                <Input disabled={isLoading} onChange={handleInputChange} value={inputCityValue} placeholder="Enter city here" />
                <Button disabled={isLoading || !inputCityValue} htmlType="submit">Find</Button>
            </Space.Compact>
        </form>
    )
}

export default CitySearch