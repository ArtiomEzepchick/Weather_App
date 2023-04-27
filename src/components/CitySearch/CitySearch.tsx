import React, { RefObject } from "react"
import { Button, Input, InputRef, Space } from "antd"
import { useDispatch } from 'react-redux'

import { getCurrentWeather, setInputCityValue } from '../../model/weather/actions/actions'

import './index.scss'

type Props = {
    inputCityValue: string;
    isLoading: boolean;
    inputRef: RefObject<InputRef>;
}

const CitySearch: React.FC<Props> = ({ inputCityValue, isLoading, inputRef }) => {
    const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setInputCityValue(e.target.value))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(getCurrentWeather(inputCityValue))
    }

    return (
        <form className='city-search-container' onSubmit={handleSubmit}>
            <Space.Compact style={{ width: '100%' }}>
                <Input  ref={inputRef} disabled={isLoading} onChange={handleInputChange} value={inputCityValue} placeholder="Enter city here" />
                <Button disabled={isLoading || !inputCityValue} htmlType="submit">Find</Button>
            </Space.Compact>
        </form>
    )
}

export default CitySearch