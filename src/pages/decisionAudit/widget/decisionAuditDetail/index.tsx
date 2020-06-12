import React, { useState, useEffect } from 'react'
import { Row, Modal, Form, message } from 'antd'
import { searchFormType } from '@config/type.config'
import { SearchForm } from '@components/index'
import { DECISION_MANAGE } from '@config/api.config'
import { decisionDetailForm } from '@config/form.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

export interface DecisionAuditDetailProps {
    currentRecordId: string
    isDecisionAuditDetailShow: boolean
    closeDecisionAuditDetail: Function
    getTableData: Function
}

const DecisionAuditDetail: React.FC<DecisionAuditDetailProps> = (props) => {
    const { currentRecordId, isDecisionAuditDetailShow, closeDecisionAuditDetail, getTableData } = props

    const [formConfig, setFormConfig] = useState<searchFormType[]>([])

    const [form] = Form.useForm()
    const { setFieldsValue, resetFields, validateFields } = form

    // 获取权限数据详情
    const getCurrentRecord = (id: string) => {
        if (!id) {
            message.error('获取决策详细出错！')
            return
        }
        fetchData({
            url: `${DECISION_MANAGE}/${id}`,
        }).then(res => {
            handleFormFixed(res.result)
        })
    }
    // 填充表单
    const handleFormFixed = (data: anyObj) => {
        const result = {
            ...data
        }
        if (data.status === 1) {
            result.status = '未处理'
        } else if (data.status === 2) {
            result.status = '正在处理'
        } else {
            result.status = '已完成'
        }
        setFieldsValue(result)
    }
    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(decisionDetailForm)
    }
    // 提交表单
    const submitForm = () => {
        validateFields().then(values => {
            fetchData({
                type: 'PUT',
                url: `${DECISION_MANAGE}/${currentRecordId}`,
                data: values
            }).then(res => {
                message.success('决策信息更新成功')
                closeDecisionAuditDetail()
                getTableData()
            })
        })
    }

    useEffect(() => {
        initSearchForm()
        if (isDecisionAuditDetailShow) {
            getCurrentRecord(currentRecordId)
        } else {
            resetFields()
        }
    }, [isDecisionAuditDetailShow])

    return (
        <Form className={styles['decision-detail']} form={form}>
            <Modal
                title="决策详细信息"
                width={800}
                destroyOnClose
                visible={isDecisionAuditDetailShow}
                onOk={() => submitForm()}
                onCancel={() => closeDecisionAuditDetail()}>
                <Row className={styles['form-box']} gutter={24}>
                    <SearchForm formConfig={formConfig} />
                </Row>
            </Modal>
        </Form>
    )
}

export default DecisionAuditDetail