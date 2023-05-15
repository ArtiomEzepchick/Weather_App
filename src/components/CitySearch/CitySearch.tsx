import React, { RefObject } from "react"
import {
    Button,
    Input,
    InputRef,
    Space
} from "antd"
import { useDispatch } from 'react-redux'

import {
    getCurrentWeather,
    setInputCityValue,
    setError,
    setIsModalOpen
} from '../../model/weather/actions/actions'

import './index.scss'

type Props = {
    inputCityValue: string;
    isLoading: boolean;
    inputRef: RefObject<InputRef>;
    dataLength: number;
}

const CitySearch: React.FC<Props> = ({
    inputCityValue,
    isLoading,
    inputRef,
    dataLength
}) => {
    const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setInputCityValue(e.target.value))
    }

    const handleInputFocus = (): void => {
        if (dataLength === 10) {
            dispatch(setError("You've exceeded the max number of saved cities (10). Delete any city to add new ones"))
            dispatch(setIsModalOpen(true))
            return
        }
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()

        dispatch(getCurrentWeather(inputCityValue))
    }

    return (
        <form className='city-search-container' onSubmit={handleSubmit}>
            <Space.Compact style={{ width: '100%' }}>
                <Input
                    ref={inputRef}
                    disabled={isLoading}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={inputCityValue}
                    placeholder="Enter city here"
                />
                <Button
                    disabled={isLoading || !inputCityValue}
                    htmlType="submit">
                    Find
                </Button>
            </Space.Compact>
        </form>
    )
}

export default CitySearch