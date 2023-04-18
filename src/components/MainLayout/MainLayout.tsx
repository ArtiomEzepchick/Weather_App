import React, { useState } from 'react'
import { CloudOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'

import Copyright from '../Copyright/Copyright'
import CitySearch from '../CitySearch/CitySearch'
import Error from '../Error/Error'
import Loader from '../Loader/Loader'
import WeatherMainForecast from '../WeatherMainForecast/WeatherMainForecast'
import WeatherDetailedForecast from '../WeatherDetailedForecast/WeatherDetailedForecast'
import WeatherHourlyForecast from '../WeatherHourlyForecast/WeatherHourlyForecast'
import WeatherDaysForecast from '../WeatherDaysForecast/WeatherDaysForecast'

import { WeatherState } from '../../types/states'

import './index.scss'

const { Header, Content, Footer, Sider } = Layout

type Props = WeatherState
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

const MainLayout: React.FC<Props> = ({
    weatherData,
    error,
    loading
}) => {
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
                    {weatherData && (
                        <>
                            <WeatherMainForecast weatherData={weatherData}/>
                            <section className='weather-forecast'>
                                <WeatherHourlyForecast weatherData={weatherData} />
                                <WeatherDetailedForecast weatherData={weatherData} />
                                <WeatherDaysForecast weatherData={weatherData} />
                            </section>
                        </>
                    )}
                    {loading && <Loader />}
                    {error && <Error error={error} />}
                </Content>
                <Footer style={{ padding: '0 1rem', height: '3rem' }}>
                    <Copyright />
                </Footer>
            </Layout>
        </Layout>
    )
}

const mapStateToProps = (state: WeatherState) => ({
    ...state
})

export default connect(
    mapStateToProps,
    null
)(MainLayout)