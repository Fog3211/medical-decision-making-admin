import React from 'react'
import { Breadcrumb } from 'antd'
import { menus } from '@config/menu.config'
import styles from './index.less'

interface CurrentPathProps {
    routePath: string
}

const CurrentPath: React.FC<CurrentPathProps> = (props: CurrentPathProps) => {
    const renderBreadcrumb = (menus: Array<any>) => {
        let result = []
        let flag = false //找到一个匹配的就停止
        const { routePath } = props

        menus.map(item => {
            if (flag === true) return
            if (item.children) {
                const childResult = renderBreadcrumb(item.children)
                if (childResult.length > 0) {
                    result.push(item.name)
                    result = result.concat(childResult)
                }
            } else {
                if (item.path === routePath) {
                    result.push(item.name)
                    flag = true
                }
            }
        })
        return result
    }
    return (
        <div className={styles['current-path']}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span>首页</span>
                </Breadcrumb.Item>
                {
                    renderBreadcrumb(menus).map((item, index) => {
                        return (
                            <Breadcrumb.Item key={index}>
                                <span>{item}</span>
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        </div>
    )
}

export default CurrentPath