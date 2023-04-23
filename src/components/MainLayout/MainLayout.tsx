import React, { useState, useEffect } from 'react'
import { CloudOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useSelector } from 'react-redux'

import CitySearch from '../CitySearch/CitySearch'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import WeatherForecast from '../WeatherForecast/WeatherForecast'

import { WeatherState } from '../../types/states'
import { copyrightLinks } from '../../helpers/copyrightLinks/copyrightLinks'

import './index.scss'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
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
    const { weatherData, error, loading } = useSelector((state: WeatherState) => state)
    const [collapsed, setCollapsed] = useState(true)
    const [menuItems, setMenuItems] = useState<MenuItem[]>([getItem('City', '1', <CloudOutlined />)])

    // console.log(weatherData)
    // console.log(menuItems)

    // useEffect(() => {
    //     if (weatherData?.city) {
    //         setMenuItems([
    //             ...menuItems,
    //             getItem(weatherData.city, '2', <CloudOutlined />)
    //         ])
    //     }
    // }, [menuItems, weatherData?.city])

    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <CitySearch />
                </Header>
                <Content>
                    {weatherData && <WeatherForecast weatherData={weatherData} />}
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