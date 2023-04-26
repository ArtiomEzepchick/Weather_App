import React, {
    useEffect,
    useRef,
    useCallback,
    useMemo
} from 'react'
import { CloudOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useDispatch, useSelector } from 'react-redux'
import { animateScroll } from 'react-scroll'

import CitySearch from '../CitySearch/CitySearch'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import WeatherForecast from '../WeatherForecast/WeatherForecast'

import { useScrollLock } from '../../hooks/useScrollLock'
import { WeatherState } from '../../types/states'
import { MenuItem, WeatherTransformedData } from '../../types/weather'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'
import { getUserLocation } from '../../helpers/requests/requests'
import { WEATHER_IMAGES_SRC, DEGREE_SYMBOL } from '../../helpers/weatherConstants/weatherConstants'
import {
    setAsideCollapsed,
    addAllCitiesWeatherData,
    setCurrentWeatherData,
    setInputCityValue,
    updateAllCitiesWeatherData,
    clearError,
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
    } = useSelector((state: WeatherState) => state)

    const dispatch = useDispatch()
    const activeMenuItemKey = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)
    const prevWeatherData = useRef<WeatherTransformedData | null>(currentWeatherData)
    const { lockScroll, unlockScroll } = useScrollLock()

    const cities: string[] = useMemo(() => {
        return allCitiesWeatherData.map(item => item.city)
    }, [allCitiesWeatherData])

    const menuItems = useMemo(() => {
        let key: number = 0
        const items: MenuItem[] = []

        for (let item of allCitiesWeatherData) {
            items.push(makeMenuItem(
                `${item.city + ' ' + item.list[0].temp + DEGREE_SYMBOL}`,
                key.toString(),
                <CloudOutlined />
            ))

            key++
        }

        return items
    }, [allCitiesWeatherData])

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
        if (currentWeatherData) {
            prevWeatherData.current = currentWeatherData
        }
    }, [currentWeatherData])

    useEffect(() => {
        isLoading ? lockScroll() : unlockScroll()

        if (prevWeatherData.current && currentWeatherData?.id !== prevWeatherData.current?.id) {
            dispatch(setCurrentWeatherData(prevWeatherData.current))
        }

        if (currentWeatherData && !cities.includes(currentWeatherData.city)) {
            dispatch(addAllCitiesWeatherData(currentWeatherData))
            dispatch(setInputCityValue(''))
        }

        if (currentWeatherData && cities.includes(currentWeatherData.city)) {
            const isCityIdNotExist = allCitiesWeatherData.every(item => item.id !== currentWeatherData.id)

            if (isCityIdNotExist) {
                const newWeatherData = allCitiesWeatherData.map(item => {
                    return item.city === currentWeatherData.city ? item = currentWeatherData : item
                })

                dispatch(updateAllCitiesWeatherData(newWeatherData))
                dispatch(setInputCityValue(''))
            }
        }
    }, [
        dispatch,
        lockScroll,
        unlockScroll,
        cities,
        currentWeatherData,
        allCitiesWeatherData,
        isLoading,
        prevWeatherData
    ])

    useEffect(() => {
        if (!currentWeatherData || error) {
            activeMenuItemKey.current = ''
            return
        }

        currentWeatherData && cities.includes(currentWeatherData.city)
            ? activeMenuItemKey.current = cities.indexOf(currentWeatherData.city).toString()
            : activeMenuItemKey.current = allCitiesWeatherData.length.toString()
    }, [
        dispatch,
        cities,
        activeMenuItemKey,
        currentWeatherData,
        allCitiesWeatherData,
        error
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

    const handleMenuItemClick = (e: MenuInfo): void => {
        activeMenuItemKey.current = e.key
        animateScroll.scrollToTop({ duration: 500 })
        dispatch(clearError(null))
        prevWeatherData.current = allCitiesWeatherData[Number(e.key)]
    }

    return (
        <Layout style={{ backgroundImage: `url(${WEATHER_IMAGES_SRC + (prevWeatherData.current?.iconId || '01d')}.jpg)` }}>
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
                <Content>
                    {!currentWeatherData && !error && !isLoading &&
                        <section className='welcome-block'>
                            <h1>Welcome to Weather App!</h1>
                            <span>You need to enter the name of the city in the input at the top to start exploring.</span>
                            <span>Hope you enjoy it!</span>
                        </section>}
                    {!error && prevWeatherData.current &&
                        <WeatherForecast
                            isLoading={isLoading}
                            weatherData={prevWeatherData.current}
                        />}
                    {isLoading && <Loader />}
                    {error && <Error error={error} isLoading={isLoading} />}
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