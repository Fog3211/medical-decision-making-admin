import React from 'react'
import { Button, Row, Col, Card, Space, Form } from 'antd'
import { FormProps } from 'antd/es/form'
import styles from './index.less'

export interface NewsPushProps extends FormProps {

}

const NewsPush: React.FC<NewsPushProps> = (props: NewsPushProps) => {
    return (
        <Form className={styles['news-push']}>
            <Card title='个人账户'>

            </Card>
        </Form>
    )
}

export default NewsPush
