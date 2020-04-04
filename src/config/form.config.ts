import { searchFormType } from '@config/type.config'

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
    { key: 'auth_code', label: '权限类型', placeholder: '请选择权限类型', span: 8, type: 'select', props: { allowClear: true, showSearch: true } },
    { key: 'auth_status', label: '权限状态', placeholder: '请选择权限状态', span: 8, type: 'select', props: { allowClear: true } },
    { key: 'phonenumber', label: '手机号', placeholder: '请输入手机号', span: 8, type: 'input', rules: [{ pattern: /^[1]([3-9])[0-9]{9}$/, message: '请填写正确的手机号' }], props: {} },
]