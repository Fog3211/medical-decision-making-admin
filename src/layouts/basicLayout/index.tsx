import React, { useState, useEffect } from 'react'
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { Link } from "react-router-dom"
import { UserInfo } from "./widget/index"
import { SwitchPage, ThemePicker } from '@components/index'
import { routes } from '@config/router.config'
import { menus } from '@config/menu.config'
import IconMap from '@config/icon.config'
import { userInfoType, themeSettingType } from '@config/type.config'
import { theme } from '@utils/index'

const layoutConfig = {
  logo: null,
  title: '辅助医疗决策系统',
  // layout: 'topmenu' as any
}
export interface BasicLayoutProps {

}

const BasicLayout: React.FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const [pathname, setPathname] = useState('/')
  const [userInfo, setUserInfo] = useState<userInfoType>(null)
  const [navTheme, setNavTheme] = useState<themeSettingType>({} as any)

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }))

  const getUserInfo = () => {
    const result = {
      avatar: "https://img95.699pic.com/photo/40011/0709.jpg_wh860.jpg",
      username: 'fog2312',
      isLogin: true
    }
    setUserInfo(result)
  }
  // 找到对应的pathname
  const getPathname = (menus: MenuDataItem[]) => {
    menus.map(item => {
      if (item.children) {
        getPathname(item.children)
      } else {
        const currentUrl = window.location.hash
        if ('#' + item.path === currentUrl) {
          setPathname(item.path)
        }
      }
    })
  }
  // 更据localstorage设置主题
  const setThemeByLocalSetting = (themeSetting: themeSettingType) => {
    if (!themeSetting) return

    Object.keys(themeSetting).forEach((key) => {
      theme.changeAntdTheme(key, themeSetting[key])
    })
    changeNavTheme()
  }
  // 设置导航栏主题
  const changeNavTheme = () => {
    const navTheme = theme.getCssVarValue("--nav-theme") || 'dark' as any

    setNavTheme(navTheme)
  }

  useEffect(() => {
    getPathname(menus)
    getUserInfo()
  }, [])

  return (
    <ProLayout
      {...layoutConfig}
      style={{
        height: '100vh'
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom
        }
        return <Link to={menuItemProps.path} onClick={() => setPathname(menuItemProps.path)}>{defaultDom}</Link>
      }}
      menuDataRender={() => loopMenuItem(menus)}
      location={{ pathname: pathname }}
      rightContentRender={() => <UserInfo userInfo={userInfo} />}
    >
      <SwitchPage routes={routes} />
      <ThemePicker setThemeByLocalSetting={setThemeByLocalSetting} />
    </ProLayout>
  )
}

export default BasicLayout