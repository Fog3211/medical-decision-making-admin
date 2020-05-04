import { searchFormType, loginTypeConfigType } from '@config/type.config'
import {
    EmailRules, TelphoneRules, NameRules, PasswordRules,
    StrictEmailRules, StrictTelphoneRules
} from '@config/rule.config'

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
export const adminerManageForm: searchFormType[] = [
    { span: 8, type: 'input', formProps: { name: 'id', label: '用户ID' }, comProps: { placeholder: '请输入ID', } },
    { span: 8, type: 'input', formProps: { name: 'name', label: '姓名', }, comProps: { placeholder: '请输入用户名', } },
    { span: 8, type: 'select', formProps: { name: 'adminer_code', label: '权限类型', }, optionRequestUrl: 'kk', comProps: { allowClear: true, showSearch: true, placeholder: '请选择权限类型', } },
    { span: 8, type: 'select', formProps: { name: 'adminer_status', label: '权限状态', }, option: [{ id: 0, name: '正常' }, { id: 1, name: '禁用' }], comProps: { allowClear: true, placeholder: '请选择权限状态', } },
    { span: 8, type: 'input', formProps: { name: 'telphone', label: '手机号', rules: TelphoneRules }, comProps: { placeholder: '请输入手机号', } },
]
//用户管理form
export const userManageForm: searchFormType[] = [
    { span: 6, type: 'input', formProps: { name: 'id', label: '用户ID' }, comProps: { placeholder: '请输入ID', } },
    { span: 6, type: 'input', formProps: { name: 'nickName', label: '昵称' }, comProps: { placeholder: '请输入用户昵称' } },
    { span: 6, type: 'input', formProps: { name: 'telphone', label: '手机号', rules: TelphoneRules }, comProps: { placeholder: '请输入手机号' } },
    { span: 6, type: 'input', formProps: { name: 'email', label: '邮箱', rules: EmailRules }, comProps: { placeholder: '请输入邮箱' } },
    { span: 8, type: 'timeRange', formProps: { name: 'createat', label: '注册时间', }, comProps: { allowClear: true } },
]
// 登录form配置
export const loginTypeConfig: loginTypeConfigType[] = [
    { key: 'email', label: '邮箱', rules: EmailRules, placeholder: '请填写邮箱' },
    { key: 'telphone', label: '手机号', rules: TelphoneRules, placeholder: '请填写手机号' }
]
// 疾病管理form配置
export const diseaseDataForm: searchFormType[] = [
    { span: 8, type: 'timeRange', formProps: { name: 'createat', label: '创建时间', }, comProps: { allowClear: true, showTime: true } },
    { span: 8, type: 'select', formProps: { name: 'department', label: '科室', }, comProps: { allowClear: true, showSearch: true, placeholder: '请选择科室', } },
    { span: 8, type: 'select', formProps: { name: 'diseaseName', label: '疾病名称', }, comProps: { allowClear: true, showSearch: true, placeholder: '请选择疾病名称', } },
]
// 医院管理form配置
export const hospitalDataForm: searchFormType[] = [
    { span: 8, type: 'timeRange', formProps: { name: 'createat', label: '创建时间', }, comProps: { allowClear: true, showTime: true } },
]
// 修改密码form配置
export const modifyPasswordForm: searchFormType[] = [
    { span: 24, type: 'input', formProps: { name: 'id', label: '用户ID', }, comProps: { disabled: true, placeholder: '用户唯一标识', } },
    { span: 24, type: 'input', formProps: { name: 'name', label: '用户名', rules: NameRules }, comProps: { placeholder: '请输入用户名', }, },
    { span: 24, type: 'input', formProps: { name: 'password', label: '密码', rules: PasswordRules }, comProps: { placeholder: '请输入密码', type: 'password' }, },
    { span: 24, type: 'input', formProps: { name: 'email', label: '邮箱', rules: StrictEmailRules }, comProps: { placeholder: '请填写邮箱', }, },
    { span: 24, type: 'input', formProps: { name: 'telphone', label: '手机号', rules: StrictTelphoneRules }, comProps: { placeholder: '请填写手机号', }, },
]
// 用户详细信息form配置
export const userDetailForm: searchFormType[] = [
    { span: 12, type: 'input', formProps: { name: 'id', label: '用户ID', }, comProps: { disabled: true } },
    { span: 12, type: 'input', formProps: { name: 'nickName', label: '昵称', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'name', label: '用户姓名', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'sex', label: '性别', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'age', label: '年龄', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'telphone', label: '手机号', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'createAt', label: '注册时间', }, comProps: { disabled: true, } },
]