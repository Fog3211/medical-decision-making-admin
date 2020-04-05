import React from 'react'
import { Avatar, Dropdown, Menu, Space } from "antd"
import { userInfoType } from "@config/type.config"
import IconMap from '@config/icon.config'
import styles from './index.less'

export interface UserInfoProps {
    userInfo: userInfoType
}
// 默认用户信息
const defaultInfo: userInfoType = {
    username: '未登录',
    avatar: '',
    isLogin: false
}
const UserInfo: React.FC<UserInfoProps> = (props: UserInfoProps) => {
    const userInfo = props.userInfo || defaultInfo

    // 注销登录
    const handleLogout = () => {

        sessionStorage.clear()
        window.location.href = '/#login'
    }
    // 更改语
    const changeLocate = () => {

    }
    // 切换主题
    const changeTheme = () => {

    }
    // 修改密码
    const changePassword = () => {

    }
    return (
        <div className={styles['user-info']}>
            <Dropdown placement="bottomCenter" overlay={
                <Menu>
                    <Menu.Item onClick={() => changePassword()}>
                        <span>{IconMap['key']}修改密码</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={() => changeLocate()}>{IconMap['global']}语言切换</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={() => changeTheme()}>{IconMap['theme']}自定义主题</span>
                    </Menu.Item>
                    <Menu.Item>
                        <span onClick={() => handleLogout()}>{IconMap['logout']}注销登录</span>
                    </Menu.Item>
                </Menu>}>
                <Space className={styles['avatar-box']} size={10}>
                    <span>{userInfo.username || defaultInfo.username}</span>
                    <Avatar src={userInfo.avatar || defaultInfo.avatar} />
                </Space>
            </Dropdown>
        </div>
    )
}

export default UserInfo 
