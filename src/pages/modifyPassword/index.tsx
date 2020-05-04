import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, Form, Input, message } from 'antd'
import { FormProps } from 'antd/es/form'
import { formItemLayout, modifyPasswordForm } from '@config/form.config'
import { AUTH_MANAGE } from '@config/api.config'
import { GlobalContext } from '@store/index'
import { fetchData, encryptionUtils } from '@utils/index'
import styles from './index.less'

export interface ModifyPasswordProps extends FormProps { }

const ModifyPassword: React.FC<ModifyPasswordProps> = (props) => {
    const { globalState } = useContext(GlobalContext)
    const { userInfo } = globalState
    const { id } = userInfo

    const [formConfig, setFormConfig] = useState([])

    const [form] = Form.useForm()
    const { resetFields, setFieldsValue } = form

    // 提交表单
    const submitForm = (values: anyObj) => {
        fetchData({
            type: 'PUT',
            url: AUTH_MANAGE,
            data: {
                ...values,
                password: encryptionUtils.encrypt(values.password)
            },
        }).then(() => {
            message.success('密码修改成功,请重新登录')
            window.location.hash = '/#login'
        })
    }
    // 填充表单的值
    const initFormValues = (values: anyObj) => {
        setFieldsValue(values)
    }
    // 获取用户信息
    const getUserInfo = () => {
        fetchData({
            type: 'GET',
            url: AUTH_MANAGE,
            data: {
                id
            },
        }).then((res) => {
            initFormValues(res.result)
        })
    }

    useEffect(() => {
        setFormConfig(modifyPasswordForm)
        getUserInfo()
    }, [])

    return (
        <Form className={styles['modify-password']} {...formItemLayout}
            onFinish={submitForm} form={form}>
            <Card title='个人账户' style={{ width: 600 }}>
                {
                    formConfig.map((item, index: number) => (
                        <Form.Item name={item.key} label={item.label} key={index} rules={item.rules}>
                            <Input {...item.props} />
                        </Form.Item>
                    ))
                }
                <Form.Item style={{ margin: '0 auto', textAlign: 'center', width: '100%' }}>
                    <Button type='primary' htmlType='submit'>保存</Button>
                    <Button style={{ marginLeft: 40 }} onClick={() => resetFields()}>重置</Button>
                </Form.Item>
            </Card>
        </Form>
    )
}

export default ModifyPassword
