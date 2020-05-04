import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, Form, message } from 'antd'
import { FormProps } from 'antd/es/form'
import { SearchForm } from '@components/index'
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
            url: `${AUTH_MANAGE}/${id}`,
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
        const result = {
            ...values,
            password: encryptionUtils.decrypt(values.password)
        }
        setFieldsValue(result)
    }
    // 获取用户信息
    const getUserInfo = () => {
        if (!id) {
            message.error('请先登录')
            return
        }
        fetchData({
            type: 'GET',
            url: `${AUTH_MANAGE}/${id}`,
        }).then((res) => {
            initFormValues(res.result)
        })
    }
    // 清空表单
    const clearFormValues = () => {
        resetFields(['name', 'email', 'telphone', 'password'])
    }

    useEffect(() => {
        setFormConfig(modifyPasswordForm)
        getUserInfo()
    }, [])

    return (
        <Form className={styles['modify-password']} {...formItemLayout}
            onFinish={submitForm} form={form}>
            <Card title='个人账户' style={{ width: 600 }}>
                <SearchForm formConfig={formConfig} />
                <Form.Item style={{ margin: '0 auto', textAlign: 'center', width: '100%' }}>
                    <Button type='primary' htmlType='submit'>保存</Button>
                    <Button style={{ marginLeft: 40 }} onClick={() => clearFormValues()}>重置</Button>
                </Form.Item>
            </Card>
        </Form>
    )
}

export default ModifyPassword
