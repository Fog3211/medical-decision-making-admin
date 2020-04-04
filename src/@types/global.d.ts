// 任意对象
interface anyObj {
    [name: string]: any
}
// 请求类型
interface fetchType {
    type: 'GET' | 'POST' | 'PUT' | 'DELETE'
    url: string
    data: anyObj
}
// 下拉选择类型
interface selectType {
    id: number
    name: string | string
}