import { ColumnProps } from 'antd/lib/table'

export const authManageColumns: ColumnProps<any>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    key: 'sex',
  },
  {
    title: '权限级别',
    dataIndex: 'auth',
    align: 'center',
    key: 'auth',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
    key: 'create_time',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align: 'center',
    key: 'phone',
  }
]
