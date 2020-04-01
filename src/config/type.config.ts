// 对象类型
export interface anyObj {
    [name: string]: any
}
// 主题类型
export type MenuThemeProps = 'light' | 'dark'
// 日期类型
export type dateType = {
    startTime?: string
    endTime?: string
}
// 搜索form的类型
export type searchFormItemType = 'input' | 'select' | 'datetime' | 'cascader' | 'rangePicker' | 'textArea'
// 搜索form
export type searchFormType = {
    key: string
    label: string
    placeholder?: string
    span: number
    type: searchFormItemType
    props?: anyObj
}
//权限管理列表类型
export type authManageItemType = {
    id: number
    name: string
}
