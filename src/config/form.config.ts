import { GET_DEPARTMENT_LIST, GET_PART_LIST } from '@config/api.config'
import { searchFormType, loginTypeConfigType } from '@config/type.config'
import {
    EmailRules, TelphoneRules, NameRules, PasswordRules,
    StrictEmailRules, StrictTelphoneRules, StrictRequiredRules
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
    { span: 8, type: 'timeRange', formProps: { name: 'createdAt', label: '创建时间', }, comProps: { allowClear: true, showTime: true } },
    { span: 8, type: 'input', formProps: { name: 'name', label: '姓名', }, comProps: { placeholder: '请输入用户名', } },
    { span: 8, type: 'input', formProps: { name: 'telphone', label: '手机号', rules: TelphoneRules }, comProps: { placeholder: '请输入手机号', } },
]
//用户管理form
export const userManageForm: searchFormType[] = [
    { span: 6, type: 'input', formProps: { name: 'id', label: '用户ID' }, comProps: { placeholder: '请输入ID', } },
    { span: 6, type: 'input', formProps: { name: 'name', label: '用户姓名' }, comProps: { placeholder: '请输入用户姓名' } },
    { span: 6, type: 'input', formProps: { name: 'nickName', label: '昵称' }, comProps: { placeholder: '请输入用户昵称' } },
    { span: 6, type: 'input', formProps: { name: 'telphone', label: '手机号', rules: TelphoneRules }, comProps: { placeholder: '请输入手机号' } },
    { span: 6, type: 'select', formProps: { name: 'sex', label: '性别' }, comProps: { allowClear: true, placeholder: '请选择性别' }, option: [{ id: 1, name: '男' }, { id: 2, name: '女' }] },
    { span: 8, type: 'timeRange', formProps: { name: 'createdAt', label: '注册时间', }, comProps: { allowClear: true } },
]
// 登录form配置
export const loginTypeConfig: loginTypeConfigType[] = [
    { key: 'email', label: '邮箱', rules: EmailRules, placeholder: '请填写邮箱' },
    { key: 'telphone', label: '手机号', rules: TelphoneRules, placeholder: '请填写手机号' }
]
// 疾病管理form配置
export const diseaseManageForm: searchFormType[] = [
    { span: 8, type: 'timeRange', formProps: { name: 'createdAt', label: '创建时间', }, comProps: { allowClear: true, showTime: true } },
    { span: 8, type: 'select', formProps: { name: 'departmentKey', label: '科室', }, comProps: { allowClear: true, showSearch: true, placeholder: '请选择科室', }, requestUrl: GET_DEPARTMENT_LIST },
    { span: 8, type: 'select', formProps: { name: 'partKey', label: '部位', }, comProps: { allowClear: true, showSearch: true, placeholder: '请选择部位', }, requestUrl: GET_PART_LIST },
    { span: 8, type: 'input', formProps: { name: 'name', label: '疾病名称', }, comProps: { placeholder: '请输入疾病名称', } },
    { span: 8, type: 'input', formProps: { name: 'alias', label: '疾病别称', }, comProps: { placeholder: '请输入疾病别称', } },
]
// 医院管理form配置
export const hospitalForm: searchFormType[] = [
    { span: 8, type: 'timeRange', formProps: { name: 'createdAt', label: '录入时间', }, comProps: { allowClear: true } },
    { span: 8, type: 'input', formProps: { name: 'name', label: '医院名称', }, comProps: { placeholder: '请输入医院名称', } },
    { span: 8, type: 'input', formProps: { name: 'phone', label: '电话', }, comProps: { placeholder: '请输入医院电话', } },
    { span: 8, type: 'input', formProps: { name: 'province', label: '省份', }, comProps: { allowClear: true, placeholder: '请选择所在省份', } },
    { span: 8, type: 'input', formProps: { name: 'city', label: '城市', }, comProps: { allowClear: true, placeholder: '请选择所在城市', } },
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
    { span: 12, type: 'input', formProps: { name: 'createdAt', label: '注册时间', }, comProps: { disabled: true, } },
]
// 医院详细信息form配置
export const hospitalDetailForm: searchFormType[] = [
    { span: 12, type: 'input', formProps: { name: '_id', label: '医院ID', }, comProps: { disabled: true } },
    { span: 12, type: 'input', formProps: { name: 'name', label: '医院名称', rules: StrictRequiredRules }, comProps: {} },
    { span: 12, type: 'input', formProps: { name: 'province', label: '省份', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'city', label: '城市', }, comProps: { disabled: true, } },
    { span: 12, type: 'input', formProps: { name: 'address', label: '具体地址', rules: StrictRequiredRules }, comProps: {} },
    { span: 12, type: 'input', formProps: { name: 'phone', label: '电话', rules: StrictRequiredRules }, comProps: {} },
    { span: 12, type: 'input', formProps: { name: 'createdAt', label: '录入时间', }, comProps: { disabled: true, } },
    { span: 24, type: 'textArea', formProps: { name: 'introduction', label: '简介', rules: StrictRequiredRules }, comProps: { placeholder: '请输入医院简介', autoSize: { minRows: 2, maxRows: 6 } } },
]
// 疾病详细信息form配置
export const diseaseDetailForm: searchFormType[] = [
    { span: 12, type: 'input', formProps: { name: '_id', label: '疾病ID', }, comProps: { disabled: true } },
    { span: 12, type: 'input', formProps: { name: 'name', label: '疾病名称', rules: StrictRequiredRules }, comProps: {} },
    { span: 12, type: 'input', formProps: { name: 'createdAt', label: '录入时间', }, comProps: { disabled: true, } },
    { span: 24, type: 'textArea', formProps: { name: 'introduction', label: '症状描述', rules: StrictRequiredRules }, comProps: { placeholder: '请输入疾病症状描述', autoSize: { minRows: 2, maxRows: 6 } }, },
    { span: 24, type: 'textArea', formProps: { name: 'treatment', label: '治疗方案', rules: StrictRequiredRules }, comProps: { placeholder: '请输入疾病治疗方案', autoSize: { minRows: 2, maxRows: 6 } }, }
]
// 决策审核搜索form配置
export const decisionAuditForm: searchFormType[] = [
    { span: 6, type: 'input', formProps: { name: 'name', label: '用户姓名', }, comProps: { placeholder: '请输入用户姓名', } },
    { span: 6, type: 'input', formProps: { name: 'handler', label: '处理人', }, comProps: { placeholder: '请输入处理人', } },
    { span: 6, type: 'input', formProps: { name: 'question', label: '问题描述', }, comProps: { placeholder: '请输入问题描述' }, },
    { span: 6, type: 'input', formProps: { name: 'status', label: '处理状态', }, comProps: { placeholder: '请选择处理状态', }, option: [{ id: 1, name: '处理中' }, { id: 2, name: '未处理' }, { id: 3, name: '已完成' }] }
]
// 决策审核搜索form配置
export const decisionDetailForm: searchFormType[] = [
    { span: 12, type: 'input', formProps: { name: 'name', label: '用户姓名', }, comProps: { placeholder: '请输入用户姓名', disabled: true } },
    { span: 12, type: 'input', formProps: { name: 'handler', label: '处理人', }, comProps: { placeholder: '请输入处理人', disabled: true } },
    { span: 12, type: 'input', formProps: { name: 'question', label: '问题描述', }, comProps: { placeholder: '请输入问题描述', disabled: true }, },
    { span: 12, type: 'input', formProps: { name: 'status', label: '处理状态', }, comProps: { placeholder: '请选择处理状态', }, option: [{ id: 1, name: '处理中' }, { id: 2, name: '未处理' }, { id: 3, name: '已完成' }] },
    { span: 24, type: 'textArea', formProps: { name: 'answer', label: '治疗方案', rules: StrictRequiredRules }, comProps: { placeholder: '请输入疾病治疗方案', autoSize: { minRows: 2, maxRows: 6 } }, }
]