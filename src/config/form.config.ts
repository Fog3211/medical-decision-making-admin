import { searchFormType } from '@config/type.config'

//权限管理form
export const authManageForm: searchFormType[] = [
    { key: 'date', label: '时间段', span: 8, type: 'rangePicker', props: { allowClear: true } },
    { key: 'type', label: '反馈类型', placeholder: '请选择反馈类型', span: 8, type: 'select', props: { allowClear: true } },
    { key: 'module', label: '模块/功能', placeholder: '请选择模块/功能', span: 8, type: 'cascader', props: { allowClear: true, showSearch: true } },
    { key: 'status', label: '状态', placeholder: '请选择状态', span: 8, type: 'select', props: { allowClear: true } },
    { key: 'puid', label: '处理人', placeholder: '请选择处理人', span: 8, type: 'select', props: { allowClear: true, showSearch: true } }
]