import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Drawer, Modal, Switch, Form, message, Select, Input } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { adminerRecordType } from '@config/type.config'
import { AUTH_MANAGE, ADMINER_MANAGE } from '@config/api.config'
import { formItemLayout } from '@config/form.config'
import { fetchData, encryptionUtils } from '@utils/index'
import styles from './index.less'

const { confirm } = Modal
const { Option } = Select

export interface AdminerEditProps {
    currentRecordId: number
    isEditAdminerShow: boolean
    closeAdminerEdit: Function
    getTableData: Function
}

const AdminerEdit: React.FC<AdminerEditProps> = (props: AdminerEditProps) => {
    const { currentRecordId, isEditAdminerShow, closeAdminerEdit, getTableData } = props

    const [adminerCodeList, setAdminerCodeList] = useState<selectType[]>([])

    const [form] = Form.useForm()
    const { validateFields, setFieldsValue, resetFields } = form

    // 提交前确认
    const beforeSubmit = () => {
        validateFields().then(values => {
            confirm({
                icon: <ExclamationCircleOutlined />,
                title: '此操作将导致该用户的权限变更，确认继续?',
                onOk: () => handleSubmitForm(values as any)
            })
        })
    }
    // 确认完成
    const handleSubmitForm = (values: adminerRecordType) => {
        fetchData({
            type: 'POST',
            url: ADMINER_MANAGE,
            data: {
                ...values,
                password: encryptionUtils.encrypt(values.password)
            },
        }).then(() => {
            message.success('操作成功')
            getTableData()
        })
    }
    // 获取权限数据详情
    const getCurrentRecord = (id: number) => {
        if (!id) {
            message.error('获取用户信息出错！')
            return
        }
        fetchData({
            url: `${ADMINER_MANAGE}/${id}`,
        }).then(res => handleFormFixed(res.result))
    }
    // 填充表单
    const handleFormFixed = (values: adminerRecordType) => {
        const result = {
            ...values,
            password: encryptionUtils.decrypt(values.password)
        }
        setFieldsValue(result)
    }
    // 初始化权限类型列表
    const initAdminerCodeList = () => {
        fetchData({
            url: AUTH_MANAGE,
        }).then(res => {
            setAdminerCodeList(res.result?.data)
        })
    }

    useEffect(() => {
        if (isEditAdminerShow) {
            initAdminerCodeList()
            getCurrentRecord(currentRecordId)
        } else {
            resetFields()
        }
    }, [isEditAdminerShow])

    return (
        <Form className={styles['edit-adminer']} form={form} {...formItemLayout}>
            <Drawer
                title="用户权限编辑"
                width={500}
                destroyOnClose
                onClose={() => closeAdminerEdit()}
                visible={isEditAdminerShow}
                footer={
                    <Row justify='end'>
                        <Col pull={2}>
                            <Button type='primary' onClick={() => beforeSubmit()}>确认完成</Button>
                        </Col>
                        <Col pull={1}>
                            <Button onClick={() => closeAdminerEdit()}>取消操作</Button>
                        </Col>
                    </Row>
                }>
                <Row className={styles['form-box']}>
                    <Col span={24}>
                        <Form.Item name='name' label='用户名' >
                            <Input placeholder='请填写用户名' disabled />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='password' label='密码' rules={[
                            { required: true, whitespace: true, message: '填写密码不能为空' },
                            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请保证密码格式为6~10位数字+字母组合' }]}>
                            <Input.Password type='password' placeholder='请填写密码' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='auth' label='权限类型' rules={[{ required: true, message: '请选择权限类型' }]}>
                            <Select placeholder='请选择权限类型'>
                                {
                                    adminerCodeList.map((item: selectType, index: number) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Drawer>
        </Form>
    )
}

export default AdminerEdit