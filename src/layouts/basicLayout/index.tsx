import React, { useState, useEffect } from 'react'
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { Link } from "react-router-dom"
import { Avatar, Dropdown, Menu } from "antd"
import { SwitchPage } from '@components/index'
import { routes } from '@config/router.config'
import { menus } from '@config/menu.config'
import IconMap from '@config/icon.config'

const layoutConfig = {
  // logo: null,
  title: '辅助医疗决策系统',
  // layout: 'topmenu' as any
}

export interface BasicLayoutProps {

}

const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const [menuData, setMenuData] = useState<MenuDataItem[]>([])
  const [pathname, setPathname] = useState('/demo')

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }))

  useEffect(() => {
    setMenuData(menus)
  }, [])

  return (
    <ProLayout
      {...layoutConfig}
      style={{
        height: '100vh',
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom
        }
        return <Link to={menuItemProps.path} onClick={() => setPathname(menuItemProps.path)}>{defaultDom}</Link>
      }}
      menuDataRender={() => loopMenuItem(menus)}
      location={{ pathname: pathname }}
      rightContentRender={() =>
        (<div>
          <Dropdown placement="bottomCenter" overlay={<Menu>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                修改密码
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                注销登录
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                多语言设置
              </a>
            </Menu.Item>
          </Menu>}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              name
            </a>
          </Dropdown>
          <Avatar src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" />
        </div>)
      }
    >
      <SwitchPage routes={routes} />
    </ProLayout>
  )
}

export default BasicLayout