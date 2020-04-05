import { ColumnProps } from 'antd/lib/table'
// 权限管理
export const authManageColumns: ColumnProps<any>[] = [
  { title: '用户PUID', dataIndex: 'puid', align: 'center', key: 'puid', },
  { title: '姓名', dataIndex: 'username', align: 'center', key: 'username', },
  { title: '手机号', dataIndex: 'phonenumber', align: 'center', key: 'phone', },
  { title: '创建时间', dataIndex: 'create_time', align: 'center', key: 'create_time', },
  { title: '权限', dataIndex: 'auth_label', align: 'center', key: 'auth_label', },
]
// 用户管理
export const userManageColumns: ColumnProps<any>[] = [
  { title: '用户PUID', dataIndex: 'puid', align: 'center', key: 'puid', },
  { title: '姓名', dataIndex: 'username', align: 'center', key: 'username', },
  { title: '手机号', dataIndex: 'phonenumber', align: 'center', key: 'phone', },
  { title: '创建时间', dataIndex: 'create_time', align: 'center', key: 'create_time', },
]
