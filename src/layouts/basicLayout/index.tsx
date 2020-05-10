import React, { useState, useEffect, useContext } from 'react'
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { Link } from "react-router-dom"
import { UserInfo } from "./widget/index"
import { SwitchPage, ThemePicker } from '@components/index'
import { routes } from '@config/router.config'
import { menus } from '@config/menu.config'
import IconMap from '@config/icon.config'
import { themeSettingType } from '@config/type.config'
import { GlobalContext } from '@store/index'
import { themeUtils } from '@utils/index'
import { defaultSetting } from '@config/theme.config'

const layoutConfig = {
  logo: null,
  title: '辅助医疗决策系统',
}
export interface BasicLayoutProps { }

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { globalState, dispatchGlobalState } = useContext(GlobalContext)
  const { userInfo } = globalState

  const [pathname, setPathname] = useState('/')
  const [navTheme, setNavTheme] = useState<MenuThemeProps>('dark')
  const [themeSetting, setThemeSetting] = useState<themeSettingType>(defaultSetting)

  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }))

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
  const changeThemeByLocalSetting = (themeSetting: themeSettingType) => {
    if (!themeSetting) return

    Object.keys(themeSetting).forEach((key) => {
      themeUtils.changeAntdTheme(key, themeSetting[key])
    })

    setThemeSetting(themeSetting)
  }

  useEffect(() => {
    getPathname(menus)
  }, [])

  useEffect(() => {
    themeUtils.initAntdPrimaryTheme()
    const themeSetting = JSON.parse(localStorage.getItem("af-theme-setting"))
    changeThemeByLocalSetting(themeSetting)
  }, [])

  return (
    <ProLayout
      {...layoutConfig}
      navTheme={themeSetting.navTheme}
      layout={themeSetting.navMode}
      style={{
        height: '100vh',
        filter: `invert(${themeSetting.colourWeakness}%)`
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
      <ThemePicker changeThemeByLocalSetting={changeThemeByLocalSetting} />
    </ProLayout>
  )
}

export default BasicLayout