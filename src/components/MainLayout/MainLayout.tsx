import React, {
    useEffect,
    useRef,
    useCallback,
    useMemo
} from 'react'
import {
    InputRef,
    Layout,
    Menu,
    MenuProps
} from 'antd'
import { CloudOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from "redux"
import { animateScroll } from 'react-scroll'
import classNames from 'classnames'

import CitySearch from '../CitySearch/CitySearch'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import WeatherForecast from '../WeatherForecast/WeatherForecast'
import GoogleCalendar from '../GoogleCalendar/GoogleCalendar'

import { useScrollLock } from '../../hooks/useScrollLock'
import { State } from '../../types/commonTypes'
import { WeatherTransformedData } from '../../types/weather/weather'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'
import { getUserLocation } from '../../helpers/requests/requests'
import { WEATHER_IMAGES_SRC, DEGREE_SYMBOL } from '../../helpers/constants/weatherConstants'
import { LOCAL_STORAGE_ITEMS } from '../../helpers/localStorageItems/localStorageItems'
import {
    setAsideCollapsed,
    setCurrentWeatherData,
    setInputCityValue,
    updateAllCitiesWeatherData,
    setIsLoading
} from '../../model/weather/actions/actions'

import './index.scss'
import { WeatherState } from '../../types/weather/states'

type MenuItem = Required<MenuProps>['items'][number]

const makeMenuItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
): MenuItem => {
    return {
        label,
        key,
        icon
    } as MenuItem
}

const {
    Header,
    Content,
    Footer,
    Sider
} = Layout

const {
    ALL_CITIES_WEATHER_DATA,
    CURRENT_WEATHER_DATA,
    MENU_KEY_REF,
    SAVED_WEATHER_DATA_REF
} = LOCAL_STORAGE_ITEMS

const MainLayout: React.FC = () => {
    const {
        allCitiesWeatherData,
        currentWeatherData,
        error,
        isLoading,
        isModalOpen,
        inputCityValue,
        asideCollapsed,
    } = useSelector((state: State): WeatherState => state.weatherReducer)

    const dispatch: Dispatch = useDispatch()
    const menuKeyRef = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)
    const savedWeatherDataRef = useRef<WeatherTransformedData | null>(currentWeatherData)
    const inputRef = useRef<InputRef>(null)
    const { lockScroll, unlockScroll } = useScrollLock()

    const cities = useMemo((): string[] => {
        return allCitiesWeatherData.map((item: any) => item.city)
    }, [allCitiesWeatherData])

    const handleDeleteBtnClick = useCallback((): void => {
        let currentMenyKeyRef: string = menuKeyRef.current
        const newWeatherData: WeatherTransformedData[] = allCitiesWeatherData.filter((item: WeatherTransformedData, index: number) => index.toString() !== currentMenyKeyRef)

        dispatch(setIsLoading(true))
        dispatch(updateAllCitiesWeatherData(newWeatherData))

        localStorage.setItem(ALL_CITIES_WEATHER_DATA, JSON.stringify(newWeatherData))

        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 200)

        if (!newWeatherData.length) {
            savedWeatherDataRef.current = null
            dispatch(setAsideCollapsed(true))
            dispatch(setCurrentWeatherData(null))

            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify({}))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify({}))
            return
        }

        if (+currentMenyKeyRef >= newWeatherData.length - 1) {
            currentMenyKeyRef = (newWeatherData.length - 1).toString()
            savedWeatherDataRef.current = newWeatherData[+currentMenyKeyRef]
            dispatch(setCurrentWeatherData(newWeatherData[+currentMenyKeyRef]))

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(currentMenyKeyRef))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            return
        } else {
            dispatch(setCurrentWeatherData(newWeatherData[+currentMenyKeyRef]))
            savedWeatherDataRef.current = newWeatherData[+currentMenyKeyRef]

            localStorage.setItem(CURRENT_WEATHER_DATA, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            localStorage.setItem(SAVED_WEATHER_DATA_REF, JSON.stringify(newWeatherData[+currentMenyKeyRef]))
            return
        }
    }, [allCitiesWeatherData, dispatch])

    const menuItems = useMemo((): MenuItem[] => {
        let key: number = 0
        const items: MenuItem[] = []

        for (let item of allCitiesWeatherData) {
            const cityInfo: string = item.list[0].temp + DEGREE_SYMBOL + ' ' + item.city

            const menuItem: React.ReactNode = (
                <>
                    <span>{cityInfo}</span>
                    <button
                        className='menu-delete-btn'
                        onClick={handleDeleteBtnClick}
                        title='Delete'
                        style={{ pointerEvents: `${isLoading ? 'none' : 'auto'}` }}
                    >
                        X
                    </button>
                </>
            )

            items.push(makeMenuItem(
                menuItem,
                key.toString(),
                <CloudOutlined />
            ))

            key++
        }

        return items
    }, [
        allCitiesWeatherData,
        isLoading,
        handleDeleteBtnClick
    ])

    const fetchUserLocation = useCallback(async (): Promise<void> => {
        const lsAllCitiesWeatherData = JSON.parse(localStorage.getItem(ALL_CITIES_WEATHER_DATA) || "[]")

        try {
            if (!lsAllCitiesWeatherData.length) {
                dispatch(setIsLoading(true))
                const userLocation: string = await getUserLocation()
                dispatch(setInputCityValue(userLocation))
                dispatch(setIsLoading(false))
            }
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
        const lsAllCitiesWeatherData: WeatherTransformedData[] = JSON.parse(localStorage.getItem(ALL_CITIES_WEATHER_DATA) || "[]")
        const lsCurrentWeatherData: WeatherTransformedData = JSON.parse(localStorage.getItem(CURRENT_WEATHER_DATA) || "[]")
        const lsSavedWeatherDataRef: WeatherTransformedData = JSON.parse(localStorage.getItem(SAVED_WEATHER_DATA_REF) || "{}")
        const lsMenuKeyRef: string = JSON.parse(localStorage.getItem(MENU_KEY_REF) || "")

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
            const lsMenuKeyRef: string = JSON.parse(localStorage.getItem(MENU_KEY_REF) || "")
            menuKeyRef.current = lsMenuKeyRef
            return
        }

        if (error && savedWeatherDataRef.current) {
            menuKeyRef.current = (allCitiesWeatherData.indexOf(savedWeatherDataRef.current)).toString()

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))
        }

        if (currentWeatherData && cities.includes(currentWeatherData.city)) {
            const isCityIdNotExist: boolean = allCitiesWeatherData.every((item: WeatherTransformedData) => item.id !== currentWeatherData.id)
            menuKeyRef.current = cities.indexOf(currentWeatherData.city).toString()
            
            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))

            if (isCityIdNotExist) {
                const newWeatherData: WeatherTransformedData[] = allCitiesWeatherData.map((item: WeatherTransformedData) => {
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
        dispatch,
    ])

    useEffect(() => {
        const handleMouseOverSider = (e: MouseEvent): void => {
            const target = e.target as HTMLDivElement

            siderRef.current && !siderRef.current.contains(target)
                ? dispatch(setAsideCollapsed(true))
                : dispatch(setAsideCollapsed(false))
        }

        if (menuItems.length) document.addEventListener("mouseover", handleMouseOverSider)

        return () => document.removeEventListener("mouseover", handleMouseOverSider)
    }, [
        siderRef,
        menuItems,
        dispatch
    ])

    const handleMenuItemSelect = (menuInfo: MenuInfo): void => {
        menuKeyRef.current = menuInfo.key
        animateScroll.scrollToTop({ duration: 500 })
        dispatch(setCurrentWeatherData(allCitiesWeatherData[Number(menuInfo.key)]))
        savedWeatherDataRef.current = allCitiesWeatherData[Number(menuInfo.key)]
    }

    return (
        <Layout style={{
            backgroundImage: `url(${WEATHER_IMAGES_SRC + (savedWeatherDataRef.current?.iconId || '01d')}.jpg)`,
            backgroundColor: `${savedWeatherDataRef.current?.iconId ? 'none' : '#3badff'}`
        }}>
            <Sider
                ref={siderRef}
                collapsible
                collapsed={asideCollapsed}
                trigger={null}
            >
                <Menu
                    selectable={!isLoading}
                    selectedKeys={[menuKeyRef.current]}
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    onSelect={handleMenuItemSelect}
                />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <CitySearch
                        dataLength={allCitiesWeatherData.length}
                        inputRef={inputRef}
                        inputCityValue={inputCityValue}
                        isLoading={isLoading}
                    />
                </Header>
                <Content>
                    <GoogleCalendar />
                    {!savedWeatherDataRef.current && !error &&
                        <section className={classNames('welcome-block', isLoading && 'opacity-low')}>
                            <h1>Welcome to Weather App!</h1>
                            <span>You need to enter the name of the city in the input at the top to start exploring.</span>
                            <span>Hope you enjoy it!</span>
                        </section>}
                    {savedWeatherDataRef.current &&
                        <WeatherForecast
                            isLoading={isLoading}
                            weatherData={savedWeatherDataRef.current}
                        />}
                    {isLoading && <Loader />}
                    {error && <Modal
                        contentText={error}
                        isModalOpen={isModalOpen}
                        inputRef={inputRef}
                    />}
                </Content>
                <Footer style={{ padding: '0 1rem', height: '3rem' }}>
                    <span>&#169; 2023 Made by Artsiom Ezepchik</span>
                    <section className="copyright-links">
                        <span>Contact me:</span>
                        {copyrightLinks.map(({ href, iconClassName }) => (
                            <a key={href} target='blank' href={href}>
                                <i className={iconClassName} />
                            </a>
                        ))}
                    </section>
                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout