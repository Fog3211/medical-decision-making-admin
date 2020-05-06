import React, { useState, useEffect } from 'react'
import { Row, Modal, Form, message } from 'antd'
import { searchFormType } from '@config/type.config'
import { SearchForm } from '@components/index'
import { DISEASE_MANAGE } from '@config/api.config'
import { formItemLayout, diseaseDetailForm } from '@config/form.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

export interface DiseaseDetailProps {
    currentRecordId: string
    isDiseaseDetailShow: boolean
    closeDiseaseDetail: Function
    getTableData: Function
}

const DiseaseDetail: React.FC<DiseaseDetailProps> = (props) => {
    const { currentRecordId, isDiseaseDetailShow, closeDiseaseDetail, getTableData } = props

    const [formConfig, setFormConfig] = useState<searchFormType[]>([])

    const [form] = Form.useForm()
    const { setFieldsValue, resetFields, validateFields } = form

    // 获取权限数据详情
    const getCurrentRecord = (id: string) => {
        if (!id) {
            message.error('获取用户详细出错！')
            return
        }
        fetchData({
            url: `${DISEASE_MANAGE}/${id}`,
        }).then(res => {
            handleFormFixed(res.result)
        })
    }
    // 填充表单
    const handleFormFixed = (data: anyObj) => {
        setFieldsValue(data)
    }
    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(diseaseDetailForm)
    }
    // 提交表单
    const submitForm = () => {
        validateFields().then(values => {
            fetchData({
                type: 'PUT',
                url: `${DISEASE_MANAGE}/${currentRecordId}`,
                data: values
            }).then(res => {
                message.success('疾病信息更新成功')
                getTableData()
            })
        })
    }

    useEffect(() => {
        initSearchForm()
        if (isDiseaseDetailShow) {
            getCurrentRecord(currentRecordId)
        } else {
            resetFields()
        }
    }, [isDiseaseDetailShow])

    return (
        <Form className={styles['disease-detail']} form={form} {...formItemLayout}>
            <Modal
                title="用户详细信息"
                width={800}
                destroyOnClose
                visible={isDiseaseDetailShow}
                onOk={() => submitForm()}
                onCancel={() => closeDiseaseDetail()}>
                <Row className={styles['form-box']} gutter={24}>
                    <SearchForm formConfig={formConfig} />
                </Row>
            </Modal>
        </Form>
    )
}

export default DiseaseDetail