import React, {
    useEffect,
    useRef,
    useCallback,
    useMemo
} from 'react'
import {
    InputRef,
    Layout,
    Menu
} from 'antd'
import { CloudOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useDispatch, useSelector } from 'react-redux'
import { animateScroll } from 'react-scroll'

import CitySearch from '../CitySearch/CitySearch'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import WeatherForecast from '../WeatherForecast/WeatherForecast'

import { useScrollLock } from '../../hooks/useScrollLock'
import { WeatherState } from '../../types/states'
import { MenuItem, WeatherTransformedData } from '../../types/weather'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'
import { getUserLocation } from '../../helpers/requests/requests'
import {
    WEATHER_IMAGES_SRC,
    DEGREE_SYMBOL,
    LOCAL_STORAGE_VARIABLES
} from '../../helpers/weatherConstants/weatherConstants'
import {
    setAsideCollapsed,
    setCurrentWeatherData,
    setInputCityValue,
    updateAllCitiesWeatherData,
    setIsLoading
} from '../../model/weather/actions/actions'

import './index.scss'

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
} = LOCAL_STORAGE_VARIABLES

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

const MainLayout: React.FC = () => {
    const {
        allCitiesWeatherData,
        currentWeatherData,
        error,
        isLoading,
        isModalOpen,
        inputCityValue,
        asideCollapsed,
    } = useSelector((state: WeatherState) => state)

    const dispatch = useDispatch()
    const menuKeyRef = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)
    const savedWeatherDataRef = useRef<WeatherTransformedData | null>(currentWeatherData)
    const inputRef = useRef<InputRef>(null)
    const { lockScroll, unlockScroll } = useScrollLock()

    const cities: string[] = useMemo(() => {
        return allCitiesWeatherData.map(item => item.city)
    }, [allCitiesWeatherData])

    const handleDeleteBtnClick = useCallback(() => {
        let currentMenyKeyRef = menuKeyRef.current
        const newWeatherData = allCitiesWeatherData.filter((item, index) => index.toString() !== currentMenyKeyRef)

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

    const menuItems = useMemo(() => {
        let key: number = 0
        const items: MenuItem[] = []

        for (let item of allCitiesWeatherData) {
            const cityInfo = item.list[0].temp + DEGREE_SYMBOL + ' ' + item.city

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

    const fetchUserLocation = useCallback(async () => {
        const lsAllCitiesWeatherData = JSON.parse(localStorage.getItem(ALL_CITIES_WEATHER_DATA) || "[]")

        try {
            if (!lsAllCitiesWeatherData.length) {
                dispatch(setIsLoading(true))
                const userLocation = await getUserLocation()
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
        const lsAllCitiesWeatherData = JSON.parse(localStorage.getItem(ALL_CITIES_WEATHER_DATA) || "[]")
        const lsCurrentWeatherData = JSON.parse(localStorage.getItem(CURRENT_WEATHER_DATA) || "[]")
        const lsSavedWeatherDataRef = JSON.parse(localStorage.getItem(SAVED_WEATHER_DATA_REF) || "{}")
        const lsMenuKeyRef = JSON.parse(localStorage.getItem(MENU_KEY_REF) || "")

        if (lsAllCitiesWeatherData.length) {
            dispatch(updateAllCitiesWeatherData(lsAllCitiesWeatherData))
        }

        if (lsCurrentWeatherData.length) {
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
        }

        if (error && savedWeatherDataRef.current) {
            menuKeyRef.current = (allCitiesWeatherData.indexOf(savedWeatherDataRef.current)).toString()

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))
        }

        if (currentWeatherData && !cities.includes(currentWeatherData.city)) {
            const newWeatherData = [...allCitiesWeatherData, currentWeatherData]

            dispatch(updateAllCitiesWeatherData(newWeatherData))
            dispatch(setInputCityValue(''))

            localStorage.setItem(ALL_CITIES_WEATHER_DATA, JSON.stringify(newWeatherData))
        }

        if (currentWeatherData && cities.includes(currentWeatherData.city)) {
            const isCityIdNotExist = allCitiesWeatherData.every(item => item.id !== currentWeatherData.id)

            if (isCityIdNotExist) {
                const newWeatherData = allCitiesWeatherData.map(item => {
                    return item.city === currentWeatherData.city ? item = currentWeatherData : item
                })

                dispatch(updateAllCitiesWeatherData(newWeatherData))
                dispatch(setInputCityValue(''))

                localStorage.setItem(ALL_CITIES_WEATHER_DATA, JSON.stringify(newWeatherData))
            }
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
        if (!currentWeatherData) {
            const lsMenuKeyRef = JSON.parse(localStorage.getItem(MENU_KEY_REF) || "")
            
            menuKeyRef.current = lsMenuKeyRef
            return
        }

        if (currentWeatherData && cities.includes(currentWeatherData.city)) {
            menuKeyRef.current = cities.indexOf(currentWeatherData.city).toString()

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))
        } else {
            menuKeyRef.current = allCitiesWeatherData.length.toString()

            localStorage.setItem(MENU_KEY_REF, JSON.stringify(menuKeyRef.current))
        }
    }, [
        cities,
        menuKeyRef,
        currentWeatherData,
        allCitiesWeatherData,
        dispatch
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
                    {!savedWeatherDataRef.current && !error && !isLoading &&
                        <section className='welcome-block'>
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