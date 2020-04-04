import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Drawer, Modal, Switch, Form, message, Select, Input } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { authRecordType } from '@config/type.config'
import { } from '@config/api.config'
import { formItemLayout } from '@config/form.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

const { confirm } = Modal
const { Option } = Select

export interface AuthEditProps {
    currentRecordId: number
    isEditAuthShow: boolean
    closeAuthEdit: Function
    getTableData: Function
}

const AuthEdit: React.FC<AuthEditProps> = (props: AuthEditProps) => {
    const { currentRecordId, isEditAuthShow, closeAuthEdit, getTableData } = props

    const [authCodeList, setAuthCodeList] = useState<selectType[]>([])

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
    const handleSubmitForm = (values: authRecordType) => {
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
    }
    // 获取权限数据详情
    const getCurrentRecord = (id: number) => {
        // fetchData({
        //     type: 'GET',
        //     url: '',
        //     data: {

        //     },
        // }).then(res => {
        //     if (res.code === 200) {
        //         handleFormFixed(res.data)
        //     } else {
        //         message.error(res.msg)
        //     }
        //     console.log(res)
        // })
        const record = {
            id: 1,
            name: 'fogaaa',
            password: 'adsadalk',
            auth_code: 2,
            is_forbidden: false
        } as any
        handleFormFixed(record)
    }
    // 填充表单
    const handleFormFixed = (data: authRecordType) => {
        setFieldsValue(data)
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
        if (isEditAuthShow) {
            initAuthCodeList()
            getCurrentRecord(currentRecordId)
        } else {
            resetFields()
        }
    }, [isEditAuthShow])

    return (
        <Form className={styles['edit-auth']} form={form} {...formItemLayout}>
            <Drawer
                title="用户权限编辑"
                width={500}
                destroyOnClose
                onClose={() => closeAuthEdit()}
                visible={isEditAuthShow}
                footer={
                    <Row justify='end'>
                        <Col pull={2}>
                            <Button type='primary' onClick={() => beforeSubmit()}>确认完成</Button>
                        </Col>
                        <Col pull={1}>
                            <Button onClick={() => closeAuthEdit()}>取消操作</Button>
                        </Col>
                    </Row>
                }>
                <Row className={styles['form-box']}>
                    <Col span={24}>
                        <Form.Item name='username' label='用户名' >
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
                    <Col span={24}>
                        <Form.Item name='is_forbidden' label='是否禁用' valuePropName='checked'>
                            <Switch checkedChildren="禁用" unCheckedChildren="关闭" />
                        </Form.Item>
                    </Col>
                </Row>
            </Drawer>
        </Form>
    )
}

export default AuthEdit