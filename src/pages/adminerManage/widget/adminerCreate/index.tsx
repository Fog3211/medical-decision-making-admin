import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Drawer, Form, message, Select, Input } from 'antd'
import { AUTH_MANAGE, ADMINER_MANAGE } from '@config/api.config'
import { formItemLayout } from '@config/form.config'
import { fetchData, encryptionUtils } from '@utils/index'
import styles from './index.less'

const { Option } = Select

export interface AdminerCreateProps {
    isCreateAdminerShow: boolean
    closeAdminerCreate: Function
    getTableData: Function
}

const AdminerCreate: React.FC<AdminerCreateProps> = (props: AdminerCreateProps) => {
    const { isCreateAdminerShow, closeAdminerCreate, getTableData } = props

    const [adminerCodeList, setAdminerCodeList] = useState<selectType[]>([])

    const [form] = Form.useForm()
    const { validateFields, resetFields } = form

    // 确认完成
    const handleSubmitForm = () => {
        validateFields().then(values => {
            fetchData({
                type: 'POST',
                url: ADMINER_MANAGE,
                data: {
                    ...values,
                    password: encryptionUtils.encrypt(values.password)
                },
            }).then(() => {
                message.success('操作成功')
                closeAdminerCreate()
                getTableData()
            })
        })
    }
    // 初始化权限类型列表
    const initAdminerCodeList = () => {
        fetchData({
            url: AUTH_MANAGE,
        }).then(res => {
            setAdminerCodeList(res.result.data)
        })
    }

    useEffect(() => {
        if (isCreateAdminerShow) {
            initAdminerCodeList()
        } else {
            resetFields()
        }
    }, [isCreateAdminerShow])

    return (
        <Form className={styles['create-adminer']} form={form} {...formItemLayout}
            initialValues={{ email: '@test-admin.com' }}>
            <Drawer
                title="新建后台用户"
                width={500}
                destroyOnClose
                onClose={() => closeAdminerCreate()}
                visible={isCreateAdminerShow}
                footer={
                    <Row justify='end'>
                        <Col pull={2}>
                            <Button type='primary' onClick={() => handleSubmitForm()}>确认完成</Button>
                        </Col>
                        <Col pull={1}>
                            <Button onClick={() => closeAdminerCreate()}>取消操作</Button>
                        </Col>
                    </Row>
                }>
                <Row className={styles['form-box']}>
                    <Col span={24}>
                        <Form.Item name='name' label='用户名' rules={[
                            { required: true, whitespace: true, message: '用户名不能为空' }]} >
                            <Input placeholder='请填写用户名' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='password' label='密码' rules={[
                            { required: true, whitespace: true, message: '填写密码不能为空' },
                            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请保证密码格式为6~10位数字+字母组合' }]}>
                            <Input.Password placeholder='请填写密码' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='telphone' label='手机号' rules={[
                            { required: true, whitespace: true, message: '手机号不能为空' },
                            { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }]}>
                            <Input placeholder='请填写手机号' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='email' label='邮箱' rules={[
                            { required: true, whitespace: true, message: '邮箱不能为空' },
                            { pattern: /^[A-Za-z0-9]+@test-admin.com$/, message: '请填写正确的邮箱' }]}>
                            <Input placeholder='请填写邮箱' />
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

export default AdminerCreate