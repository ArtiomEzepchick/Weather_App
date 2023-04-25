import React, { useEffect, useRef, useCallback } from 'react'
import { CloudOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useDispatch, useSelector } from 'react-redux'
// import * as Scroll from 'react-scroll'
import classNames from 'classnames'

import CitySearch from '../CitySearch/CitySearch'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import WeatherForecast from '../WeatherForecast/WeatherForecast'

import { WeatherState } from '../../types/states'
import { MenuItem } from '../../types/weather'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'
import { getUserLocation } from '../../helpers/requests/requests'
import { weatherDescription, WEATHER_IMAGES_SRC } from '../../helpers/weatherConstants/weatherConstants'
import {
    setAsideCollapsed,
    setFoundCities,
    setMenuItems,
    clearMenuItems,
    addAllCitiesWeatherData,
    setCurrentWeather,
    setInputCityValue,
    updateAllCitiesWeatherData,
    clearError,
    setBackgroundName,
    setIsLoading
} from '../../model/weather/actions/actions'

import './index.scss'

const { Header, Content, Footer, Sider } = Layout

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
        asideCollapsed,
        menuItems,
        foundCities,
        backgroundName
    } = useSelector((state: WeatherState) => state)

    const dispatch = useDispatch()
    const activeMenuItemKey = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)

    const fetchUserLocation = useCallback(async () => {
        try {
            dispatch(setIsLoading(true))
            const userLocation = await getUserLocation()
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
        if (currentWeatherData && !foundCities.includes(currentWeatherData.city)) {
            dispatch(setFoundCities(currentWeatherData.city))
            dispatch(addAllCitiesWeatherData(currentWeatherData))
            dispatch(setInputCityValue(''))
        }

        if (currentWeatherData && foundCities.includes(currentWeatherData.city)) {
            const isCityIdExist = allCitiesWeatherData.every(item => item.id !== currentWeatherData.id)

            if (isCityIdExist) {
                const newWeatherData = allCitiesWeatherData.map(item => {
                    return item.city === currentWeatherData.city ? item = currentWeatherData : item
                })

                dispatch(setInputCityValue(''))
                dispatch(updateAllCitiesWeatherData(newWeatherData))
            }
        }
    }, [
        dispatch,
        foundCities,
        currentWeatherData,
        allCitiesWeatherData
    ])

    useEffect(() => {
        let key: number = 0

        dispatch(clearMenuItems([]))

        for (let item of foundCities) {
            dispatch(setMenuItems(makeMenuItem(item, key.toString(), <CloudOutlined />)))
            key++
        }

        if (currentWeatherData && foundCities.includes(currentWeatherData.city)) {
            activeMenuItemKey.current = foundCities.indexOf(currentWeatherData.city).toString()
            return
        }

        if (!currentWeatherData) {
            activeMenuItemKey.current = ''
            return
        }

        if (!isLoading) activeMenuItemKey.current = (foundCities.length - 1).toString()
    }, [
        dispatch,
        foundCities,
        activeMenuItemKey,
        currentWeatherData,
        isLoading
    ])

    useEffect(() => {
        const handleMouseOverOutsideSider = (e: MouseEvent): void => {
            const target = e.target as HTMLDivElement

            siderRef.current && !siderRef.current.contains(target)
                ? dispatch(setAsideCollapsed(true))
                : dispatch(setAsideCollapsed(false))
        }

        document.addEventListener("mouseover", handleMouseOverOutsideSider)

        return () => document.removeEventListener("mouseover", handleMouseOverOutsideSider)
    }, [siderRef, dispatch])

    useEffect(() => {
        if (currentWeatherData) {
            weatherDescription.includes(currentWeatherData.shortDescription)
                ? dispatch(setBackgroundName(currentWeatherData.shortDescription))
                : dispatch(setBackgroundName('fog'))
        } else {
            dispatch(setBackgroundName('clear'))
        }
    }, [currentWeatherData, dispatch])

    const handleMenuItemClick = (e: MenuInfo): void => {
        activeMenuItemKey.current = e.key
        dispatch(clearError(null))
        dispatch(setCurrentWeather(allCitiesWeatherData[Number(e.key)]))
    }

    return (
        <Layout style={{ backgroundImage: `url(${WEATHER_IMAGES_SRC + backgroundName}.jpg)` }}>
            <Sider
                ref={siderRef}
                collapsible
                collapsed={asideCollapsed}
                onCollapse={(value) => dispatch(setAsideCollapsed(value))}
                trigger={!asideCollapsed && null}
            >
                <Menu
                    selectable={!isLoading}
                    selectedKeys={[activeMenuItemKey.current]}
                    theme="dark"
                    defaultSelectedKeys={['0']}
                    mode="inline"
                    items={menuItems}
                    onClick={handleMenuItemClick}
                />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <CitySearch />
                </Header>
                <Content className={classNames(!currentWeatherData && 'flex-all-centered')}>
                    {!currentWeatherData && !error && !isLoading && <section className='welcome-block'>
                        <h1>Welcome to Weather App!</h1>
                        <span>You need to enter city in the input at the top to start exploring.</span>
                        <span>Hope you enjoy it!</span>
                    </section>}
                    {currentWeatherData && <WeatherForecast weatherData={currentWeatherData} />}
                    {isLoading && <Loader />}
                    {error && <Error error={error} />}
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