let basicURL: string = ''

if (process.env.NODE_ENV === 'development') {
  basicURL = '/admin'
} else {
  basicURL = window.location.origin + '/admin'
}

// 登录系统
export const USER_LOGIN = `${basicURL}/login`
// 删除用户
export const USER_MANAGE = `${basicURL}/user`
// 删除医院
export const HOSPITAL_MANAGE = `${basicURL}/hospital`
// 后台人员管理
export const ADMINER_MANAGE = `${basicURL}/adminer`
// 疾病管理
export const DISEASE_MANAGE = `${basicURL}/disease`
// 决策管理
export const DECISION_MANAGE = `${basicURL}/decision`
// 权限管理
export const AUTH_MANAGE = `${basicURL}/auth`
// 根据用户权限获取路由
export const GET_ROUTES_BY_AUTH = `${basicURL}/authRoutes`
// 获取科室列表
export const GET_DEPARTMENT_LIST = `${basicURL}/department`
// 获取部位列表
export const GET_PART_LIST = `${basicURL}/part`


