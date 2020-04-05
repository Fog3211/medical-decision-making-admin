import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Input, Checkbox, Button, Select, message } from 'antd'
import { loginTypeConfig } from '@config/form.config'
import { loginTypeConfigType } from '@config/type.config'
import IconMap from '@config/icon.config'
import { FormProps } from 'antd/es/form'
import { fetchData } from '@utils/index'
import styles from './index.less'

const { Option } = Select
export interface DiseaseDataProps extends FormProps {

}

const DiseaseData: React.FC<DiseaseDataProps> = (props: DiseaseDataProps) => {
    const [loginType, setLoginType] = useState<loginTypeConfigType>({} as any)

    const [form] = Form.useForm()
    const { validateFields } = form

    // 提交表单
    const submitForm = () => {
        validateFields().then(values => {
            fetchData({
                type: 'GET',
                url: '',
                data: {

                },
            }).then(res => {
                if (res.code === 200) {
                    if (values.autoLogin) {
                        sessionStorage.setItem('token', 'll')
                    }
                    window.location.hash = '/#home'
                    console.log(values)
                } else {
                    message.error(res.msg)
                }
                console.log(res)
            })

        })
    }
    // 改变登录方式
    const changeLoginType = (value: string) => {
        loginTypeConfig.map(item => {
            if (item.key === value) {
                console.log(item)
                setLoginType(item)
            }
        })
    }
    // 初始化登录方式
    const initLoginType = () => {
        if (loginTypeConfig && loginTypeConfig.length > 0) {
            setLoginType(loginTypeConfig[0])
        }
    }

    useEffect(() => {
        initLoginType()
    }, [])

    return (
        <div className={styles['login']}>
            <div className={styles['login-container']}>
                <div className={styles['admin-info']}>辅助医疗决策后台管理系统</div>
                <Form form={form} initialValues={{ email: '@test-admin.com', autoLogin: true }}
                    className={styles['login-form']} onFinish={() => submitForm()}>
                    <Row>
                        <Col span={6}>
                            <Select defaultValue="email" value={loginType.key}
                                style={{ width: '100%' }}
                                onChange={(value) => changeLoginType(value)}>
                                <Option value="email">{IconMap['email']} 邮箱</Option>
                                <Option value="phonenumber">{IconMap['phone']} 手机</Option>
                            </Select>
                        </Col>
                        <Col span={18}>
                            <Form.Item name={loginType.key} rules={loginType.rules}>
                                <Input placeholder={loginType.placeholder} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name='password' rules={[
                        { required: true, whitespace: true, message: '填写密码不能为空' },
                        { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请保证密码格式为6~10位数字+字母组合' }]}>
                        <Input.Password prefix={IconMap['lock']} placeholder='请填写密码' />
                    </Form.Item>
                    <Form.Item name='autoLogin' valuePropName='checked'>
                        <Checkbox>自动登录</Checkbox>
                    </Form.Item>
                    <Button type='primary' block htmlType='submit'
                        style={{ letterSpacing: 1 }}>登录系统</Button>
                </Form>
            </div>
        </div>
    )
}

export default DiseaseData 
