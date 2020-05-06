let basicURL: string = ''

if (process.env.NODE_ENV === 'development') {
  basicURL = '/admin'
} else {
  basicURL = window.location.origin + '/admin'
}

// 登录系统
const USER_LOGIN = `${basicURL}/login`
// 删除用户
const USER_MANAGE = `${basicURL}/user`
// 删除医院
const HOSPITAL_MANAGE = `${basicURL}/hospital`
// 后台人员管理
const ADMINER_MANAGE = `${basicURL}/adminer`
// 疾病管理
const DISEASE_MANAGE = `${basicURL}/disease`
// 决策管理
const DECISION_MANAGE = `${basicURL}/decision`
// 权限管理
const AUTH_MANAGE = `${basicURL}/auth`
// 根据用户权限获取路由
const GET_ROUTES_BY_AUTH = `${basicURL}/authRoutes`

export {
  USER_LOGIN,
  USER_MANAGE,
  HOSPITAL_MANAGE,
  AUTH_MANAGE,
  DISEASE_MANAGE,
  DECISION_MANAGE,
  ADMINER_MANAGE,
  GET_ROUTES_BY_AUTH
}


