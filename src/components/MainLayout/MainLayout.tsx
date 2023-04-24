import React, { useEffect, useRef } from 'react'
import { CloudOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useDispatch, useSelector } from 'react-redux'

import CitySearch from '../CitySearch/CitySearch'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import WeatherForecast from '../WeatherForecast/WeatherForecast'

import { WeatherState } from '../../types/states'
import { MenuItem } from '../../types/weather'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'
import {
    setAsideCollapsed,
    setFoundCities,
    setMenuItems,
    clearMenuItems,
    setAllCitiesWeatherData,
    setCurrentWeather,
    setInputCityValue,
    clearError
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
        loading,
        asideCollapsed,
        menuItems,
        foundCities
    } = useSelector((state: WeatherState) => state)

    const dispatch = useDispatch()

    const activeMenuItemKey = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (currentWeatherData && !foundCities.includes(currentWeatherData.city)) {
            dispatch(setFoundCities(currentWeatherData.city))
            dispatch(setAllCitiesWeatherData(currentWeatherData))
        }
    }, [
        dispatch,
        foundCities,
        currentWeatherData
    ])

    useEffect(() => {
        let key: number = 0

        dispatch(clearMenuItems([]))

        for (let item of foundCities) {
            dispatch(setMenuItems(makeMenuItem(item, key.toString(), <CloudOutlined />)))
            key++
        }

        if (currentWeatherData && foundCities.includes(currentWeatherData.city)) {
            dispatch(setInputCityValue(''))
            activeMenuItemKey.current = foundCities.indexOf(currentWeatherData.city).toString()
            return
        }

        if (!currentWeatherData) {
            activeMenuItemKey.current = ''
            return
        }

        if (!loading) activeMenuItemKey.current = (foundCities.length - 1).toString()
    }, [
        dispatch,
        foundCities,
        activeMenuItemKey,
        currentWeatherData,
        loading
    ])

    useEffect(() => {
        const handleClickOutsideSider = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement

            if (siderRef.current && !siderRef.current.contains(target)) {
                dispatch(setAsideCollapsed(true))
            }
        }

        document.addEventListener("mousedown", handleClickOutsideSider)

        return () => document.removeEventListener("mousedown", handleClickOutsideSider)
    }, [siderRef, dispatch])

    const handleMenuItemClick = (e: MenuInfo) => {
        activeMenuItemKey.current = e.key
        dispatch(clearError(null))
        dispatch(setCurrentWeather(allCitiesWeatherData[Number(e.key)]))
    }

    return (
        <Layout>
            <Sider
                ref={siderRef}
                collapsible
                collapsed={asideCollapsed}
                onCollapse={(value) => dispatch(setAsideCollapsed(value))}
            >
                <Menu
                    selectable={!loading}
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
                    {currentWeatherData && <WeatherForecast weatherData={currentWeatherData} />}
                    {loading && <Loader />}
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