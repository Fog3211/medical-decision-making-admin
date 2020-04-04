import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Drawer, Form, message, Select, Input } from 'antd'
import { } from '@config/api.config'
import { formItemLayout } from '@config/form.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

const { Option } = Select

export interface AuthCreateProps {
    isCreateAuthShow: boolean
    closeAuthCreate: Function
    getTableData: Function
}

const AuthCreate: React.FC<AuthCreateProps> = (props: AuthCreateProps) => {
    const { isCreateAuthShow, closeAuthCreate, getTableData } = props

    const [authCodeList, setAuthCodeList] = useState<selectType[]>([])

    const [form] = Form.useForm()
    const { validateFields, resetFields } = form

    // 确认完成
    const handleSubmitForm = () => {
        validateFields().then(values => {
            console.log(values)
            fetchData({
                type: 'GET',
                url: '',
                data: {
                    values
                },
            }).then(res => {
                if (res.code === 200) {
                    message.success('操作成功')
                    getTableData()
                } else {
                    message.error(res.msg)
                }
                console.log(res)
            })
        })
    }
    // 初始化权限类型列表
    const initAuthCodeList = () => {
        const list = [
            {
                id: 1,
                name: '系统管理员',
            },
            {
                id: 2,
                name: '医学编辑',
            }
        ] as any
        setAuthCodeList(list)
    }

    useEffect(() => {
        if (isCreateAuthShow) {
            initAuthCodeList()
        } else {
            resetFields()
        }
    }, [isCreateAuthShow])

    return (
        <Form className={styles['create-auth']} form={form} {...formItemLayout}>
            <Drawer
                title="新建后台用户"
                width={500}
                destroyOnClose
                onClose={() => closeAuthCreate()}
                visible={isCreateAuthShow}
                footer={
                    <Row justify='end'>
                        <Col pull={2}>
                            <Button type='primary' onClick={() => handleSubmitForm()}>确认完成</Button>
                        </Col>
                        <Col pull={1}>
                            <Button onClick={() => closeAuthCreate()}>取消操作</Button>
                        </Col>
                    </Row>
                }>
                <Row className={styles['form-box']}>
                    <Col span={24}>
                        <Form.Item name='username' label='用户名' rules={[
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
                        <Form.Item name='phonenumber' label='手机号' rules={[
                            { required: true, whitespace: true, message: '手机号不能为空' },
                            { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }]}>
                            <Input placeholder='请填写手机号' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='email' label='邮箱' rules={[
                            { required: true, whitespace: true, message: '邮箱不能为空' },
                            { pattern: /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请填写正确的邮箱' }]}>
                            <Input placeholder='请填写邮箱' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='auth_code' label='权限类型' rules={[{ required: true, message: '请选择权限类型' }]}>
                            <Select placeholder='请选择权限类型'>
                                {
                                    authCodeList.map((item: selectType, index: number) => (
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

export default AuthCreate