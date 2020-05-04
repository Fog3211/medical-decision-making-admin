// 对象类型
type anyObj = {
    [name: string]: any
}
// 主题设置相关类型
type menuLayoutType = 'topmenu' | 'leftmenu'
type MenuThemeProps = 'light' | 'dark'
// 日期类型
type dateType = {
    startTime?: string
    endTime?: string
    start_time?: string
    end_time?: string
}
// 请求类型
interface fetchType {
    type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    url: string
    data?: anyObj
}
// 下拉选择类型
interface selectType {
    id: string | number
    name: string | number
}