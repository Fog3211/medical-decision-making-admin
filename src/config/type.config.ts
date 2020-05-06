// 搜索form的类型
export type searchFormItemType = 'input' | 'select' | 'datetime' | 'textArea' | 'timeRange'
// 搜索form类型
export type searchFormType = {
    span: number
    type: searchFormItemType
    optionRequestUrl?: string
    option?: selectType[]
    formProps: FormPropsType
    comProps: ComPropsType
    filter?: boolean
}
export type FormPropsType = {
    name: string
    label: string
    rules?: anyObj[]
}
export type ComPropsType = {
    allowClear?: boolean
    showSearch?: boolean
    placeholder?: any
    showTime?: boolean
    disabled?: boolean
    type?: string
}
// 下拉选择form选项组合类型
export type optionistContainer = {
    [name: string]: selectType[]
}
//后台人员管理列表类型
export type adminerManageItemType = {
    id: string
    name: string
    telphone: number
    auth_label: string
}
//后台人员管理列表类型
export type adminerRecordType = {
    id: string
    name: string
    telphone: number
    email: string
    createAt: string
    auth: number
    password: string
}
// 用户信息类型
export type userInfoType = {
    name: string
    isLogin: boolean
    avatar: string
}
//权限管理列表类型
export type userManageItemType = {
    id: string
    name: string
    telphone: number
    auth: string
    isForbidden: boolean
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
    id: string
    handler: string
    createAt: string
    diseaseName: string
    diseaseCode: string
}
//医院数据管理类型
export type hospitalListType = {
    id: string
    handler: string
    createAt: string
    name: string
}
// 主题设置
export type themeSettingType = {
    navTheme: MenuThemeProps
    navColor: string
    navMode: menuLayoutType
    primaryColor: string
    colourWeakness: number
}

