import React, { useState, useEffect } from 'react'
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { Link } from "react-router-dom"
import { SwitchPage } from '@components/index'
import { routes } from '@config/router.config'
import { menus } from '@config/menu.config'
import { IconMap } from '@config/icon.config'

const layoutConfig = {
  // logo: null,
  title: '辅助医疗决策系统',
  // layout: 'topmenu' as any
}
export default () => {
  const [menuData, setMenuData] = useState<MenuDataItem[]>([])
  const [mylocation, setMylocation] = useState('/')
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
      // menuRender={() => <Menus navTheme='dark'></Menus>}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom
        }
        return <Link to={menuItemProps.path} onClick={() => setMylocation(menuItemProps.path)}>{defaultDom}</Link>
      }}
      menuDataRender={() => loopMenuItem(menus)}
      location={{ pathname: mylocation }}
    >
      <SwitchPage routes={routes} ></SwitchPage>
    </ProLayout>
  )
}
