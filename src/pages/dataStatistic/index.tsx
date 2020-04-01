import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row } from 'antd'
import { searchFormType } from '@config/type.config'
import styles from './index.less'

export interface DataStatisticProps {

}

const DataStatistic: React.FC<DataStatisticProps> = (props: DataStatisticProps) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    return (
        <div>
            <Form form={form}>
                <Row>
                    <SearchForm formConfig={formConfig} />
                </Row>
            </Form>
        </div>
    )
}

export default DataStatistic 
