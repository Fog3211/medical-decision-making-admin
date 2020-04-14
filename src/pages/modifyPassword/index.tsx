import React from 'react'
import { Button, Row, Col, Card, Space, Form } from 'antd'
import { FormProps } from 'antd/es/form'
import styles from './index.less'

export interface ModifyPasswordProps extends FormProps {

}

const ModifyPassword: React.FC<ModifyPasswordProps> = (props: ModifyPasswordProps) => {
    return (
        <Form className={styles['modify-password']}>
            <Card title='个人账户'>

            </Card>
        </Form>
    )
}

export default ModifyPassword
