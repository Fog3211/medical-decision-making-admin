// 搜索form的类型
export type searchFormItemType = 'input' | 'select' | 'datetime' | 'rangePicker' | 'textArea'
// 搜索form类型
export type searchFormType = {
    key: string
    label: string
    placeholder?: string
    span?: number
    type: searchFormItemType
    optionRequestUrl?: string
    rules?: anyObj[]
    option?: selectType[]
    props?: anyObj
}
// 下拉选择form选项组合类型
export type optionistContainer = {
    [name: string]: selectType[]
}
//权限管理列表类型
export type authManageItemType = {
    id: number
    puid: number
    username: string
    telphone: number
    auth_label: string
}
//权限管理列表类型
export type authRecordType = {
    id: number
    puid: number
    name: string
    telphone: number
    email: string
    create_time: string
    auth_code: number
    is_forbidden: boolean
}
// 用户信息类型
export type userInfoType = {
    username: string
    isLogin: boolean
    avatar: string
}
//权限管理列表类型
export type userManageItemType = {
    id: number
    puid: number
    username: string
    telphone: number
    auth_label: string
}
//登录form类型
export type loginTypeConfigType = {
    key: string
    label: string
    rules: anyObj[]
    placeholder: string
}
//疾病数据管理类型
export type diseaseDataListType = {
    id: number
    handler: string
    create_time: string
    diseaseName: string
}
//医院数据管理类型
export type hospitalDataListType = {
    id: number
    handler: string
    create_time: string
    hospitalName: string
}
// 主题设置
export type themeSettingType = {
    navTheme: MenuThemeProps
    navColor: string
    navMode: menuLayoutType
    primaryColor: string
    colourWeakness: number
}

