import { searchFormType, loginTypeConfigType } from '@config/type.config'

//form布局
export const formItemLayout = {
    labelCol: {
        sm: { span: 4 }
    },
    wrapperCol: {
        sm: { span: 20 }
    }
}
//权限管理form
export const authManageForm: searchFormType[] = [
    { key: 'puid', label: '用户PUID', placeholder: '请输入PUID', span: 8, type: 'input', rules: [{ pattern: /^[0-9]*$/, message: 'PUID只能为纯数字' }], props: {} },
    { key: 'username', label: '姓名', placeholder: '请输入用户名', span: 8, type: 'input', props: {} },
    { key: 'auth_code', label: '权限类型', placeholder: '请选择权限类型', span: 8, type: 'select', optionRequestUrl: 'kk', props: { allowClear: true, showSearch: true } },
    { key: 'auth_status', label: '权限状态', placeholder: '请选择权限状态', span: 8, type: 'select', option: [{ id: 0, name: '正常' }, { id: 1, name: '禁用' }], props: { allowClear: true } },
    { key: 'telphone', label: '手机号', placeholder: '请输入手机号', span: 8, type: 'input', rules: [{ pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }], props: {} },
]
//用户管理form
export const userManageForm: searchFormType[] = [
    { key: 'puid', label: '用户PUID', placeholder: '请输入PUID', span: 6, type: 'input', rules: [{ pattern: /^[0-9]*$/, message: 'PUID只能为纯数字' }], props: {} },
    { key: 'nickName', label: '昵称', placeholder: '请输入用户昵称', span: 6, type: 'input', props: {} },
    { key: 'telphone', label: '手机号', placeholder: '请输入手机号', span: 6, type: 'input', rules: [{ pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }], props: {} },
    { key: 'email', label: '邮箱', placeholder: '请输入邮箱', span: 6, type: 'input', rules: [{ pattern: /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请填写正确的邮箱' }], props: {} },
    { key: 'create_time', label: '注册时间', span: 8, type: 'rangePicker', props: { allowClear: true } },
]
// 登录form配置
export const loginTypeConfig: loginTypeConfigType[] = [
    { key: 'email', label: '邮箱', rules: [{ required: true, whitespace: true, message: '邮箱不能为空' }, { pattern: /^[A-Za-z0-9]+@test-admin.com$/, message: '请填写正确的邮箱' }], placeholder: '请填写邮箱' },
    { key: 'telphone', label: '手机号', rules: [{ required: true, whitespace: true, message: '手机号不能为空' }, { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }], placeholder: '请填写手机号' }
]
// 疾病管理form配置
export const diseaseDataForm: searchFormType[] = [
    { key: 'create_time', label: '创建时间', span: 8, type: 'rangePicker', props: { allowClear: true, showTime: true } },
    { key: 'department', label: '科室', placeholder: '请选择科室', span: 8, type: 'select', props: { allowClear: true, showSearch: true } },
    { key: 'diseaseName', label: '疾病名称', placeholder: '请选择疾病名称', span: 8, type: 'select', props: { allowClear: true, showSearch: true } },
]
// 医院管理form配置
export const hospitalDataForm: searchFormType[] = [
    { key: 'create_time', label: '创建时间', span: 8, type: 'rangePicker', props: { allowClear: true, showTime: true } },

]
// 修改密码form配置
export const modifyPasswordForm: searchFormType[] = [
    { key: 'ID', label: 'ID', type: 'input', props: { disabled: true, placeholder: '用户唯一标识', }, rules: [{ required: true, message: 'ID不能为空' }] },
    { key: 'username', label: '用户名', type: 'input', props: { placeholder: '请输入用户名', }, rules: [{ required: true, whitespace: true, message: '用户名不能为空' }] },
    { key: 'password', label: '密码', type: 'input', props: { placeholder: '请输入密码', type: 'password' }, rules: [{ required: true, whitespace: true, message: '用户名不能为空' }, { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/, message: '密码必须为6~15位数字字母组合' }], },
    { key: 'email', label: '邮箱', type: 'input', props: { placeholder: '请填写邮箱', }, rules: [{ required: true, whitespace: true, message: '邮箱不能为空' }, { pattern: /^[A-Za-z0-9]+@test-admin.com$/, message: '请填写正确的邮箱' }] },
    { key: 'phone_number', label: '手机号', type: 'input', props: { placeholder: '请填写手机号', }, rules: [{ required: true, whitespace: true, message: '手机号不能为空' }, { pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }], },
]