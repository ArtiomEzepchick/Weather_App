import React, { useState, useEffect } from 'react'
import { CloudOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'

import CopyrightInfo from '../CopyrigthInfo/CopyrightInfo'

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
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    return (
        <Layout style={{ minHeight: '100vh', paddingLeft: '80px' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>

                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    
                    </div>
                </Content>
                <Footer>
                    <CopyrightInfo />
                </Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout