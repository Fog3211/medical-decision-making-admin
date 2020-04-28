import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Card, Form, Input, message } from 'antd'
import { FormProps } from 'antd/es/form'
import { formItemLayout, modifyPasswordForm } from '@config/form.config'
import styles from './index.less'
import { fetchData } from '@utils/index'

export interface ModifyPasswordProps extends FormProps {

}

const ModifyPassword: React.FC<ModifyPasswordProps> = (props) => {
    const [formConfig, setFormConfig] = useState([])

    const [form] = Form.useForm()
    const { resetFields } = form

    const submitForm = (values) => {
        fetchData({
            type: 'POST',
            data: values,
            url: ''
        }).then(res => {
            if (res.code === 200) {

            } else {
                message.error(res.msg)
            }
        })
    }

    useEffect(() => {
        setFormConfig(modifyPasswordForm)
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
