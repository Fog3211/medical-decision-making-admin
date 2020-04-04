import { Button, Result } from 'antd';
import React from 'react'

const NoFound: React.FC<{}> = () => (
    <Result
        status={404}
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Button type="primary"
                onClick={() => window.location.href = '#/home'}
            >
                回到首页
      </Button>
        }
    />
)

export default NoFound
