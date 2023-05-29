import React, {
    RefObject,
    useCallback,
    useEffect,
    useRef
} from "react"
import {
    Button,
    Input,
    InputRef,
    Space
} from "antd"
import { Dispatch } from "redux"

import { API_NAMES } from "../../helpers/constants/weather/weather"
import {
    getCurrentWeather,
    setInputCityValue,
    setError,
    setIsModalOpen,
    getSearchOptionsRequest,
    clearSearchOptions,
    setChosenWeatherAPI
} from '../../model/weather/actions/actions'

import './index.scss'

type Props = {
    dispatch: Dispatch;
    inputCityValue: string | null;
    isLoading: boolean;
    inputRef: RefObject<InputRef>;
    dataLength: number;
    searchOptions: string[] | null;
}

const CitySearch: React.FC<Props> = ({
    dispatch,
    searchOptions,
    inputCityValue,
    isLoading,
    inputRef,
    dataLength
}) => {
    const optionsRef = useRef<HTMLDivElement>(null)

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        optionsRef.current?.classList.add('show')
        dispatch(setInputCityValue(e.target.value))
    }, [dispatch])

    const handleInputFocus = useCallback((): void => {
        optionsRef.current?.classList.add('show')
        dispatch(clearSearchOptions())

        if (dataLength === 10) {
            dispatch(setError("You've exceeded the max number of saved cities (10). Delete any city to add new ones"))
            dispatch(setIsModalOpen(true))
            return
        }
    }, [dataLength, dispatch])

    const handleOptionClick = useCallback((e: React.FormEvent): void => {
        const target = e.currentTarget

        if (target.textContent) {
            dispatch(setChosenWeatherAPI(API_NAMES.OPEN_WEATHER_API))
            dispatch(getCurrentWeather(target.textContent))
            dispatch(clearSearchOptions())
        }
    }, [dispatch])

    const handleSubmit = useCallback((e: React.FormEvent): void => {
        e.preventDefault()

        if (inputCityValue) {
            dispatch(setChosenWeatherAPI(API_NAMES.OPEN_WEATHER_API))
            dispatch(getCurrentWeather(inputCityValue.trim()))
            dispatch(clearSearchOptions())
        }
    }, [dispatch, inputCityValue])

    useEffect(() => {
        if (!inputCityValue) {
            dispatch(clearSearchOptions())
            optionsRef.current?.classList.remove('show')
        } else {
            dispatch(getSearchOptionsRequest(inputCityValue))
        }
    }, [
        dispatch,
        inputRef,
        inputCityValue
    ])

    useEffect(() => {
        const handleOutsideSearchClick = (e: MouseEvent): void => {
            const target = e.target as HTMLElement

            if (optionsRef.current && !optionsRef.current.contains(target)) {
                optionsRef.current?.classList.remove('show')
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
            <div className="search-options-container" ref={optionsRef}>
                {searchOptions?.length
                    ? searchOptions.map((item, index) => (
                        <Button
                            className="search-option-button"
                            key={index + item}
                            onClick={handleOptionClick}
                        >
                            {item}
                        </ Button>
                    ))
                    : null
                }
            </div>
        </form>
    )
}

export default CitySearch