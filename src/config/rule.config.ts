// 时间格式化格式
export const timeFormatRule = 'YYYY-MM-DD HH:mm:ss'
// 邮箱校验规则
export const EmailRules = [
    { pattern: /^[A-Za-z0-9]+@test-admin.com$/, message: '请填写正确的邮箱' }
]
// 邮箱校验规则(必填)
export const StrictEmailRules = [
    { required: true, whitespace: true, message: '邮箱不能为空' },
    { pattern: /^[A-Za-z0-9]+@test-admin.com$/, message: '请填写正确的邮箱' }
]
// 手机号校验规则
export const TelphoneRules = [
    { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }
]
// 手机号校验规则（必填）
export const StrictTelphoneRules = [
    { required: true, whitespace: true, message: '手机号不能为空' },
    { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }
]
// 用户名检验规则
export const NameRules = [
    { required: true, whitespace: true, message: '用户名不能为空' }
]
// 密码检验规则
export const PasswordRules = [
    { required: true, whitespace: true, message: '用户名不能为空' },
    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码必须为6~15位数字字母组合' }
]
// 必填字段校验
export const StrictRequiredRules = [
    { required: true, whitespace: true, message: '必填字段，请检查输入' },
]