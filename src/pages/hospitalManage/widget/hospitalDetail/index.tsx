import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Modal, Switch, Form, message, Select, Input } from 'antd'
import { searchFormType } from '@config/type.config'
import { SearchForm } from '@components/index'
import { HOSPITAL_MANAGE } from '@config/api.config'
import { formItemLayout, hospitalDetailForm } from '@config/form.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

export interface HospitalDetailProps {
    currentRecordId: string
    isHospitalDetailShow: boolean
    closeHospitalDetail: Function
    getTableData: Function
}

const HospitalDetail: React.FC<HospitalDetailProps> = (props) => {
    const { currentRecordId, isHospitalDetailShow, closeHospitalDetail, getTableData } = props

    const [formConfig, setFormConfig] = useState<searchFormType[]>([])

    const [form] = Form.useForm()
    const { setFieldsValue, resetFields, validateFields } = form

    // 获取权限数据详情
    const getCurrentRecord = (id: string) => {
        if (!id) {
            message.error('获取医院详细出错！')
            return
        }
        fetchData({
            url: `${HOSPITAL_MANAGE}/${id}`,
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
        setFormConfig(hospitalDetailForm)
    }
    // 提交表单
    const submitForm = () => {
        validateFields().then(values => {
            fetchData({
                type: 'PUT',
                url: `${HOSPITAL_MANAGE}/${currentRecordId}`,
                data: values
            }).then(res => {
                message.success('医院信息更新成功')
                getTableData()
            })
        })
    }

    useEffect(() => {
        initSearchForm()
        if (isHospitalDetailShow) {
            getCurrentRecord(currentRecordId)
        } else {
            resetFields()
        }
    }, [isHospitalDetailShow])

    return (
        <Form className={styles['hospital-detail']} form={form} {...formItemLayout}>
            <Modal
                title="用户详细信息"
                width={800}
                destroyOnClose
                visible={isHospitalDetailShow}
                onOk={() => submitForm()}
                onCancel={() => closeHospitalDetail()}>
                <Row className={styles['form-box']} gutter={24}>
                    <SearchForm formConfig={formConfig} />
                </Row>
            </Modal>
        </Form>
    )
}

export default HospitalDetail