import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row } from 'antd'
import { searchFormType } from '@config/type.config'
import styles from './index.less'

export interface DiseaseDataProps {

}

const DiseaseData: React.FC<DiseaseDataProps> = (props: DiseaseDataProps) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    useEffect(() => {

    }, [])

    return (
        <div>
            321312
        </div>
    )
}

export default DiseaseData 
