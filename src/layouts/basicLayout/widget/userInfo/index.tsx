import React from 'react'
import { Avatar, Dropdown, Menu, Space } from "antd"
import { userInfoType } from "@config/type.config"
import { Link } from "react-router-dom"
import IconMap from '@config/icon.config'
import styles from './index.less'

export interface UserInfoProps {
    userInfo: userInfoType
}
// 默认用户信息
const defaultInfo: userInfoType = {
    name: '未登录',
    avatar: 'https://files.yunqueyi.com//image/jpeg/HJ_B010_024_A-20181210174220493.jpg',
    isLogin: false
}
const UserInfo: React.FC<UserInfoProps> = (props) => {
    const userInfo = props.userInfo || defaultInfo

    // 注销登录
    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = '/#login'
    }

    return (
        <div className={styles['user-info']}>
            <Dropdown placement="bottomCenter" overlay={
                <Menu>
                    <Menu.Item>
                        <Link to='/modifyPassword'> {IconMap['key']} 修改密码</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={() => handleLogout()}>{IconMap['logout']}注销登录</span>
                    </Menu.Item>
                </Menu>}>
                <Space className={styles['avatar-box']} size={10}>
                    <span>{userInfo.name || defaultInfo.name}</span>
                    <Avatar src={userInfo.avatar || defaultInfo.avatar} />
                </Space>
            </Dropdown>
        </div>
    )
}

export default UserInfo 
