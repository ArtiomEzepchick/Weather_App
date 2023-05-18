import React, {
    RefObject,
    useEffect,
    useRef
} from "react"
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
    setIsModalOpen,
    getSearchOptionsRequest,
    clearSearchOptions
} from '../../model/weather/actions/actions'

import './index.scss'

type Props = {
    inputCityValue: string | null;
    isLoading: boolean;
    inputRef: RefObject<InputRef>;
    dataLength: number;
    searchOptions: string[] | null;
}

const CitySearch: React.FC<Props> = ({
    searchOptions,
    inputCityValue,
    isLoading,
    inputRef,
    dataLength
}) => {
    const optionsRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value

        dispatch(setInputCityValue(value))

        if (value) dispatch(getSearchOptionsRequest(value))
    }

    const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value

        if (dataLength === 10) {
            dispatch(setError("You've exceeded the max number of saved cities (10). Delete any city to add new ones"))
            dispatch(setIsModalOpen(true))
            return
        }

        if (value) dispatch(getSearchOptionsRequest(value))
    }

    const handleOptionClick = (e: React.FormEvent): void => {
        const target = e.currentTarget
        dispatch(setInputCityValue(target.textContent))

        if (target.textContent) {
            dispatch(getCurrentWeather(target.textContent))
            dispatch(clearSearchOptions())
        }
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()

        if (inputCityValue) {
            dispatch(getCurrentWeather(inputCityValue.trim()))
            dispatch(clearSearchOptions())
        }
    }

    useEffect(() => {
        const handleOutsideSearchClick = (e: MouseEvent): void => {
            const target = e.target as HTMLElement

            if (optionsRef.current && !optionsRef.current.contains(target)) {
                dispatch(clearSearchOptions())
            }
        }

        document.addEventListener('mousedown', handleOutsideSearchClick)

        return () => document.removeEventListener('mousedown', handleOutsideSearchClick)
    }, [dispatch])

    return (
        <form className='city-search-container' onSubmit={handleSubmit}>
            <Space.Compact style={{ width: '100%' }}>
                <Input
                    ref={inputRef}
                    disabled={isLoading}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={inputCityValue ? inputCityValue : ''}
                    placeholder="Enter city here"
                />
                <Button
                    disabled={isLoading || !inputCityValue}
                    htmlType="submit">
                    Find
                </Button>
            </Space.Compact>
            {searchOptions?.length
                ? <div
                    className="search-options-container"
                    ref={optionsRef}
                >
                    {searchOptions.map((item: string, index: number) => (
                        <Button
                            className="search-option-button"
                            key={index + item}
                            onClick={handleOptionClick}
                        >
                            {item}
                        </ Button>

                    ))}
                </div>
                : null}
        </form>
    )
}

export default CitySearch