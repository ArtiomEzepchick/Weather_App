import React, { useState } from 'react'
import { CloudOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'

import Copyright from '../Copyright/Copyright'
import CitySearch from '../CitySearch/CitySearch'
import CurrentWeather from '../CurrentWeather/CurrentWeather'
import HourlyForecast from '../HourlyForecast/HourlyForecast'
import DetailedWeatherInfo from '../DetailedWeatherInfo/DetailedWeatherInfo'

import './index.scss'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem
}

const items: MenuItem[] = [
    getItem('City', '1', <CloudOutlined />),
]

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header>
                    <CitySearch />
                </Header>
                <Content>
                    <CurrentWeather />
                    <section className='todays-forecast'>
                        <HourlyForecast />
                        <DetailedWeatherInfo />
                    </section>
                </Content>
                <Footer style={{ padding: '0 1rem', height: '3rem' }}>
                    <Copyright />
                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout