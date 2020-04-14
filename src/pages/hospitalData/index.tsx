import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row } from 'antd'
import { searchFormType } from '@config/type.config'
import styles from './index.less'

export interface HospitalDataProps {

}

const HospitalData: React.FC<HospitalDataProps> = (props: HospitalDataProps) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [dataSource, setDataSource] = useState<any[]>([])

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    useEffect(() => {

    }, [])

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

export default HospitalData 
