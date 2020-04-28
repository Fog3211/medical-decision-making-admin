import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export interface NotFoundProps {

}
const NoFound: React.FC<NotFoundProps> = () => (
    <Result
        status={404}
        title="404"
        subTitle="糟糕，页面走丢了"
        extra={
            <Button type="primary">
                <Link to={'/home'} >回到首页</Link>
            </Button>
        }
    />
)

export default NoFound
