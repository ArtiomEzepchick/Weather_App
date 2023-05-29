import React, {
    useEffect,
    useRef,
    useCallback,
    useMemo
} from 'react'
import {
    InputRef,
    Layout
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import CitySearch from '../CitySearch/CitySearch'
import GoogleSignInOut from '../GoogleSignInOut/GoogleSignInOut'
import Greeting from '../Greeting/Greeting'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import WeatherForecast from '../WeatherForecast/WeatherForecast'

import { useScrollLock } from '../../hooks/useScrollLock'
import { State } from '../../types/commonTypes'
import { WeatherTransformedData } from '../../types/weather/weather'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'
import { getUserLocation } from '../../helpers/requests/weather/weather'
import { LOCAL_STORAGE_ITEMS } from '../../helpers/localStorageItems/localStorageItems'
import { WeatherState } from '../../types/weather/states'
import { UserState } from '../../types/calendar/states'
import { WEATHER_IMAGES_SRC } from '../../helpers/constants/weather/weather'
import { setBackgroundImage } from '../../helpers/utils/weather/weather'
import {
    setCurrentWeatherData,
    setInputCityValue,
    updateAllCitiesWeatherData,
    setIsLoading
} from '../../model/weather/actions/actions'

import './index.scss'
import Menu from '../Menu/Menu'
import classNames from 'classnames'


const { Header, Content, Footer, Sider } = Layout

const {
    ALL_CITIES_WEATHER_DATA,
    CURRENT_WEATHER_DATA,
    MENU_KEY_REF,
    SAVED_WEATHER_DATA_REF
} = LOCAL_STORAGE_ITEMS

const MainLayout: React.FC = () => {
    const {
        userData,
        userToken,
        userError
    } = useSelector((state: State): UserState => state.userReducer)

    const {
        allCitiesWeatherData,
        currentWeatherData,
        error,
        isLoading,
        isModalOpen,
        inputCityValue,
        asideCollapsed,
        searchOptions
    } = useSelector((state: State): WeatherState => state.weatherReducer)

    const menuKeyRef = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)
    const savedWeatherDataRef = useRef<WeatherTransformedData | null>(currentWeatherData)
    const inputRef = useRef<InputRef>(null)
    const { lockScroll, unlockScroll } = useScrollLock()
    const dispatch: Dispatch = useDispatch()

    const cities = useMemo((): string[] => {
        return allCitiesWeatherData.map((item): string => item.city)
    }, [allCitiesWeatherData])

    const fetchUserLocation = useCallback(async (): Promise<void> => {
        try {
            dispatch(setIsLoading(true))
            const userLocation: string = await getUserLocation()
            dispatch(setInputCityValue(userLocation))
            dispatch(setIsLoading(false))
        } catch (error: any) {
            console.log(error)
        } finally {
            dispatch(setIsLoading(false))
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(setIsLoading(true))

        const timer = setTimeout(() => fetchUserLocation(), 500)

        return () => clearTimeout(timer)
    }, [fetchUserLocation, dispatch])

    useEffect(() => {
        // Set state and refs depending on local storage items
        const lsAllCitiesWeatherData: WeatherTransformedData[] = JSON.parse(localStorage.getItem(ALL_CITIES_WEATHER_DATA) || '[]')
        const lsCurrentWeatherData: WeatherTransformedData = JSON.parse(localStorage.getItem(CURRENT_WEATHER_DATA) || '[]')
        const lsSavedWeatherDataRef: WeatherTransformedData = JSON.parse(localStorage.getItem(SAVED_WEATHER_DATA_REF) || '{}')
        const lsMenuKeyRef: string = JSON.parse(localStorage.getItem(MENU_KEY_REF) || '')

        if (lsAllCitiesWeatherData.length) {
            dispatch(updateAllCitiesWeatherData(lsAllCitiesWeatherData))
        }

        if (Object.keys(lsCurrentWeatherData).length) {
            dispatch(setCurrentWeatherData(lsCurrentWeatherData))
        }

        if (Object.keys(lsSavedWeatherDataRef).length) {
            savedWeatherDataRef.current = lsSavedWeatherDataRef
        }

        if (lsMenuKeyRef) {
            menuKeyRef.current = lsMenuKeyRef
        }
    }, [dispatch])

    useEffect(() => {
        isLoading ? lockScroll() : unlockScroll()

        if (currentWeatherData) {
            savedWeatherDataRef.current = currentWeatherData

            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify(currentWeatherData))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify(currentWeatherData))
        } else {
            const lsMenuKeyRef: string = JSON.parse(localStorage.getItem(MENU_KEY_REF) || '')
            menuKeyRef.current = lsMenuKeyRef
            return
        }

        if (currentWeatherData && cities.includes(currentWeatherData.city)) {
            const isCityIdNotExist: boolean = allCitiesWeatherData.every((item: WeatherTransformedData) => item.id !== currentWeatherData.id)
            menuKeyRef.current = cities.indexOf(currentWeatherData.city).toString()

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))

            if (isCityIdNotExist) {
                const newWeatherData: WeatherTransformedData[] = allCitiesWeatherData.map((item) => {
                    return item.city === currentWeatherData.city ? item = currentWeatherData : item
                })

                dispatch(updateAllCitiesWeatherData(newWeatherData))
                dispatch(setInputCityValue(''))

                localStorage.setItem(ALL_CITIES_WEATHER_DATA, JSON.stringify(newWeatherData))
            }
        } else {
            const newWeatherData: WeatherTransformedData[] = [...allCitiesWeatherData, currentWeatherData]
            menuKeyRef.current = allCitiesWeatherData.length.toString()

            dispatch(updateAllCitiesWeatherData(newWeatherData))
            dispatch(setInputCityValue(''))

            localStorage.setItem(ALL_CITIES_WEATHER_DATA, JSON.stringify(newWeatherData))
            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))
        }
    }, [
        lockScroll,
        unlockScroll,
        cities,
        currentWeatherData,
        allCitiesWeatherData,
        isLoading,
        savedWeatherDataRef,
        error,
        dispatch
    ])

    return (
        <Layout
            style={{
                backgroundImage: `url(${WEATHER_IMAGES_SRC +
                    (savedWeatherDataRef.current ? setBackgroundImage(savedWeatherDataRef.current?.iconId) : '01d')
                    }.jpg)`,
                backgroundColor: `${savedWeatherDataRef.current?.iconId ? 'none' : '#3badff'}`
            }}
        >
            <Sider
                className={classNames(
                    !allCitiesWeatherData.length && 'hidden',
                    !asideCollapsed && 'opacity-initial'
                )}
                ref={siderRef}
                collapsible
                collapsed={asideCollapsed}
                trigger={null}
            >
                <Menu
                    allCitiesWeatherData={allCitiesWeatherData}
                    isLoading={isLoading}
                    menuKeyRef={menuKeyRef}
                    siderRef={siderRef}
                    savedWeatherDataRef={savedWeatherDataRef}
                    dispatch={dispatch}
                />
            </Sider>
            <Layout className={classNames('site-layout', !allCitiesWeatherData.length && 'padding-initial')}>
                <Header>
                    <GoogleSignInOut
                        dispatch={dispatch}
                        isLoading={isLoading}
                        userError={userError}
                        userToken={userToken}
                        userData={userData}
                    />
                    <CitySearch
                        dispatch={dispatch}
                        searchOptions={searchOptions}
                        dataLength={allCitiesWeatherData.length}
                        inputRef={inputRef}
                        inputCityValue={inputCityValue}
                        isLoading={isLoading}
                    />
                </Header>
                <Content>
                    {!savedWeatherDataRef.current &&
                        <Greeting isLoading={isLoading} />}
                    {savedWeatherDataRef.current &&
                        <WeatherForecast
                            dispatch={dispatch}
                            isLoading={isLoading}
                            weatherData={savedWeatherDataRef.current}
                            userToken={userToken}
                        />}
                    {isLoading && <Loader />}
                </Content>
                <Footer style={{ padding: '0 1rem', height: '3rem' }}>
                    <p>&#169; 2023 Made by Artsiom Ezepchik</p>
                    <section className='copyright-links'>
                        <p>Contact me:</p>
                        {copyrightLinks.map(({ href, iconClassName }) => (
                            <a key={href} target='blank' href={href}>
                                <i className={iconClassName} />
                            </a>
                        ))}
                    </section>
                </Footer>
            </Layout>
            {error && <Modal
                dispatch={dispatch}
                contentText={error}
                isModalOpen={isModalOpen}
                inputRef={inputRef}
            />}
        </Layout>
    )
}

export default MainLayout