import React, { useState, useEffect, useContext } from 'react'
import { Form, Row, Col, Input, Checkbox, Button, Select, message } from 'antd'
import { loginTypeConfig } from '@config/form.config'
import { loginTypeConfigType } from '@config/type.config'
import { MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons'
import { USER_LOGIN } from '@config/api.config'
import { FormProps } from 'antd/es/form'
import { fetchData, encryptionUtils } from '@utils/index'
import { GlobalContext } from '@store/index'
import styles from './index.less'

const { Option } = Select

export interface LoginProps extends FormProps { }

const Login: React.FC<LoginProps> = (props) => {
    const { dispatchGlobalState } = useContext(GlobalContext)

    const [loginType, setLoginType] = useState<loginTypeConfigType>({} as any)

    const [form] = Form.useForm()
    const { validateFields } = form

    // 提交表单
    const submitForm = () => {
        validateFields().then(values => {
            fetchData({
                type: 'POST',
                url: USER_LOGIN,
                data: {
                    ...values,
                    password: encryptionUtils.encrypt(values.password)
                },
            }).then(res => {
                message.success('登录成功，欢迎回来~')
                saveLoginInfo(res.result)
                values.autoLogin && sessionStorage.setItem('token', res.result?.token)
                window.location.hash = '/#home'
            })
        })
    }
    // 改变登录方式
    const changeLoginType = (value: string) => {
        loginTypeConfig.map(item => {
            if (item.key === value) {
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
    // 保存登录信息
    const saveLoginInfo = (result: anyObj) => {
        const savedGlobalState = {
            userInfo: {
                id: result.id,
                name: result.name,
            },
            isLogin: true
        }

        sessionStorage.setItem('savedGlobalState', JSON.stringify(savedGlobalState))
        dispatchGlobalState(savedGlobalState)
    }
    // 清除登录信息
    const clearLoginInfo = () => {
        sessionStorage.clear()
        dispatchGlobalState({
            userInfo: {},
            isLogin: false
        })
    }

    useEffect(() => {
        initLoginType()
        clearLoginInfo()
    }, [])

    return (
        <div className={styles['login']}>
            <div className={styles['login-container']}>
                <div className={styles['admin-info']}>辅助医疗决策后台管理系统</div>
                <Form form={form} initialValues={{ email: '@test-admin.com', autoLogin: true }}
                    className={styles['login-form']} onFinish={submitForm}>
                    <Row>
                        <Col span={8}>
                            <Select defaultValue="email" value={loginType.key}
                                style={{ width: '100%' }}
                                onChange={(value) => changeLoginType(value)}>
                                <Option value="email"><MailOutlined /> 邮箱</Option>
                                <Option value="telphone"><PhoneOutlined /> 手机</Option>
                            </Select>
                        </Col>
                        <Col span={16}>
                            <Form.Item name={loginType.key} rules={loginType.rules}>
                                <Input placeholder={loginType.placeholder} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name='password' rules={[
                        { required: true, whitespace: true, message: '填写密码不能为空' },
                        { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请保证密码格式为6~10位数字+字母组合' }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder='请填写密码' />
                    </Form.Item>
                    <Form.Item name='autoLogin' valuePropName='checked'>
                        <Checkbox style={{ color: '#fff' }}>自动登录</Checkbox>
                    </Form.Item>
                    <Button type='primary' block htmlType='submit'
                        style={{ letterSpacing: 1 }}>登录系统</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login 
