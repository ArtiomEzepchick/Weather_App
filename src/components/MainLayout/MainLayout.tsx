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
import { WEATHER_IMAGES_SRC, DEGREE_SYMBOL } from '../../helpers/weatherConstants/weatherConstants'
import {
    setAsideCollapsed,
    setCurrentWeatherData,
    setInputCityValue,
    updateAllCitiesWeatherData,
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
        isModalOpen,
        inputCityValue,
        asideCollapsed,
    } = useSelector((state: WeatherState) => state)

    const dispatch = useDispatch()
    const activeMenuItemKeyRef = useRef<string>('')
    const siderRef = useRef<HTMLDivElement>(null)
    const savedWeatherDataRef = useRef<WeatherTransformedData | null>(currentWeatherData)
    const inputRef = useRef<InputRef>(null)
    const { lockScroll, unlockScroll } = useScrollLock()

    const cities: string[] = useMemo(() => {
        return allCitiesWeatherData.map(item => item.city)
    }, [allCitiesWeatherData])
    console.log(savedWeatherDataRef.current)

    const menuItems = useMemo(() => {
        let key: number = 0
        const items: MenuItem[] = []

        const handleDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
            const newWeatherData = allCitiesWeatherData.filter((item, index) => index.toString() !== activeMenuItemKeyRef.current)

            dispatch(updateAllCitiesWeatherData(newWeatherData))

            if (!newWeatherData.length) {
                savedWeatherDataRef.current = null
                dispatch(setAsideCollapsed(true))
                dispatch(setCurrentWeatherData(null))
                return
            }


            dispatch(setCurrentWeatherData(newWeatherData[0]))
            savedWeatherDataRef.current = newWeatherData[0]
            // activeMenuItemKeyRef.current = '0'
        }

        for (let item of allCitiesWeatherData) {
            const cityInfo = item.list[0].temp + DEGREE_SYMBOL + ' ' + item.city
            
            const menuItem: React.ReactNode = (
                <>
                    <span>{cityInfo}</span>
                    <button onClick={handleDeleteBtnClick} className='menu-delete-btn' title='Delete'>X</button>
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
    }, [allCitiesWeatherData, dispatch])

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
            savedWeatherDataRef.current = currentWeatherData
        }
    }, [currentWeatherData])

    useEffect(() => {
        isLoading ? lockScroll() : unlockScroll()

        if (currentWeatherData && !cities.includes(currentWeatherData.city)) {
            dispatch(updateAllCitiesWeatherData([...allCitiesWeatherData, currentWeatherData]))
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
        savedWeatherDataRef
    ])

    useEffect(() => {
        if (!currentWeatherData) {
            activeMenuItemKeyRef.current = ''
            return
        }

        currentWeatherData && cities.includes(currentWeatherData.city)
            ? activeMenuItemKeyRef.current = cities.indexOf(currentWeatherData.city).toString()
            : activeMenuItemKeyRef.current = allCitiesWeatherData.length.toString()
    }, [
        dispatch,
        cities,
        activeMenuItemKeyRef,
        currentWeatherData,
        allCitiesWeatherData,
        error
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
    }, [siderRef, dispatch, menuItems])

    const handleMenuItemClick = (menuInfo: MenuInfo): void => {
        activeMenuItemKeyRef.current = menuInfo.key
        animateScroll.scrollToTop({ duration: 500 })
        dispatch(setCurrentWeatherData(allCitiesWeatherData[Number(menuInfo.key)]))
        savedWeatherDataRef.current = allCitiesWeatherData[Number(menuInfo.key)]
    }

    return (
        <Layout style={{ backgroundImage: `url(${WEATHER_IMAGES_SRC + (savedWeatherDataRef.current?.iconId || '01d')}.jpg)` }}>
            <Sider
                ref={siderRef}
                collapsible
                collapsed={asideCollapsed}
                trigger={null}
            >
                <Menu
                    selectable={!isLoading}
                    selectedKeys={[activeMenuItemKeyRef.current]}
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    onSelect={handleMenuItemClick}
                />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <CitySearch
                        inputRef={inputRef}
                        inputCityValue={inputCityValue}
                        isLoading={isLoading}
                    />
                </Header>
                <Content>
                    {!currentWeatherData && !error && !isLoading &&
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
                        headerText={`City "${inputCityValue}" not found`}
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