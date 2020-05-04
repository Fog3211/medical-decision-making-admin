import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row } from 'antd'
import { searchFormType } from '@config/type.config'
import { Chart, Axis, Tooltip, Legend } from 'bizcharts'
import styles from './index.less'

export interface DataStatisticProps {

}

// 数据源
const data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 }
]

// 定义度量
const cols = {
    sold: { alias: '销售量' },
    genre: { alias: '游戏种类' }
}

const DataStatistic: React.FC<DataStatisticProps> = (props: DataStatisticProps) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [dataSource, setDataSource] = useState<any[]>([])

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    useEffect(() => {

        setTimeout(() => {
            setDataSource(data)

        }, 2000)
    }, [])

    return (
        <div>
            <Form form={form}>
                <Row>
                    <SearchForm formConfig={formConfig} />
                    <Chart width={600} height={400} data={dataSource} scale={cols}>
                        <Axis name="genre" title />
                        <Axis name="sold" title />
                        <Tooltip />
                        {/* <Geom type="interval" /> */}
                    </Chart>
                </Row>
            </Form>
        </div>
    )
}

export default DataStatistic 
