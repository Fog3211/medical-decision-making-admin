import React, { useState, useEffect } from 'react'
import { Row, Modal, Form, message } from 'antd'
import { searchFormType } from '@config/type.config'
import { SearchForm } from '@components/index'
import { USER_MANAGE } from '@config/api.config'
import { formItemLayout, userDetailForm } from '@config/form.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

export interface UserDetailProps {
    currentRecordId: string
    isUserDetailShow: boolean
    closeUserDetail: Function
}

const UserDetail: React.FC<UserDetailProps> = (props) => {
    const { currentRecordId, isUserDetailShow, closeUserDetail } = props

    const [formConfig, setFormConfig] = useState<searchFormType[]>([])

    const [form] = Form.useForm()
    const { setFieldsValue, resetFields } = form

    // 获取权限数据详情
    const getCurrentRecord = (id: string) => {
        if (!id) {
            message.error('获取用户详细出错！')
            return
        }
        fetchData({
            url: `${USER_MANAGE}/${id}`,
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
        setFormConfig(userDetailForm)
    }

    useEffect(() => {
        initSearchForm()
        if (isUserDetailShow) {
            getCurrentRecord(currentRecordId)
        } else {
            resetFields()
        }
    }, [isUserDetailShow])

    return (
        <Form className={styles['user-detail']} form={form} {...formItemLayout}>
            <Modal
                title="用户详细信息"
                width={800}
                destroyOnClose
                visible={isUserDetailShow}
                onOk={() => closeUserDetail()}
                onCancel={() => closeUserDetail()}>
                <Row className={styles['form-box']} gutter={24}>
                    <SearchForm formConfig={formConfig} />
                </Row>
            </Modal>
        </Form>
    )
}

export default UserDetail