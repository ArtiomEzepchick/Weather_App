import React from "react"
import { Button, Input, Space } from "antd"

import './index.scss'

const CitySearch: React.FC = () => {
    return (
        <section className='find-city-container'>
            <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="Your city here" />
                <Button type="primary">Find</Button>
            </Space.Compact>
        </section>
    )
}

export default CitySearch