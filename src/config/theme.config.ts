import { themeSettingType } from '@config/type.config'

export const lightNavColor = '#ffffff'

export const darkNavColor = '#001529'

export const defaultPrimaryColor = '#1890ff'

// 默认主题配置
export const defaultSetting: themeSettingType = {
    navTheme: 'dark',
    navColor: darkNavColor,
    navMode: 'sidemenu',
    primaryColor: defaultPrimaryColor,
    colourWeakness: 0
}

// 可供选择的主题方案
export const presetColorList = ['#1890ff', '#d0021b', '#f5a623', '#bd10e0', '#37D67A', '#8b572a']

