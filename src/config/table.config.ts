import { ColumnProps } from 'antd/lib/table'
// 权限管理
export const adminerManageColumns: ColumnProps<any>[] = [
  { title: '用户ID', dataIndex: 'id', align: 'center', key: 'id', },
  { title: '姓名', dataIndex: 'name', align: 'center', key: 'name', },
  { title: '手机号', dataIndex: 'telphone', align: 'center', key: 'phone', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
  { title: '权限', dataIndex: 'auth', align: 'center', key: 'auth', },
]
// 用户管理
export const userManageColumns: ColumnProps<any>[] = [
  { title: '用户ID', dataIndex: 'id', align: 'center', key: 'id', },
  { title: '昵称', dataIndex: 'nickName', align: 'center', key: 'nickName', },
  { title: '用户姓名', dataIndex: 'name', align: 'center', key: 'name', },
  { title: '年龄', dataIndex: 'age', align: 'center', key: 'age', },
  { title: '性别', dataIndex: 'sex', align: 'center', key: 'sex', },
  { title: '手机号', dataIndex: 'telphone', align: 'center', key: 'telphone', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
]
// 疾病数据管理
export const diseaseManageColumns: ColumnProps<any>[] = [
  { title: '疾病编号', dataIndex: 'diseaseCode', align: 'center', key: 'diseaseCode', },
  { title: '疾病名称', dataIndex: 'diseaseName', align: 'center', key: 'diseaseName', },
  { title: '所属科室', dataIndex: 'department', align: 'center', key: 'department', },
  { title: '常见症状', dataIndex: 'symptom', align: 'center', key: 'symptom', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
  { title: '处理人', dataIndex: 'handler', align: 'center', key: 'handler', },
]
// 医院数据管理
export const hospitalManageColumns: ColumnProps<any>[] = [
  { title: '医院名称', dataIndex: 'name', align: 'center', key: 'name', },
  { title: '电话', dataIndex: 'phone', align: 'center', key: 'phone', },
  { title: '省份', dataIndex: 'province', align: 'center', key: 'province', },
  { title: '城市', dataIndex: 'city', align: 'center', key: 'city', },
  { title: '具体地址', dataIndex: 'address', align: 'center', key: 'address', },
  { title: '处理人', dataIndex: 'handler', align: 'center', key: 'handler', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
]
