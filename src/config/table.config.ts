import { ColumnProps } from 'antd/lib/table'
// 权限管理
export const authManageColumns: ColumnProps<any>[] = [
  { title: '用户PUID', dataIndex: 'puid', align: 'center', key: 'puid', },
  { title: '姓名', dataIndex: 'name', align: 'center', key: 'name', },
  { title: '手机号', dataIndex: 'telphone', align: 'center', key: 'phone', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
  { title: '权限', dataIndex: 'auth_label', align: 'center', key: 'auth_label', },
]
// 用户管理
export const userManageColumns: ColumnProps<any>[] = [
  { title: '用户ID', dataIndex: 'id', align: 'center', key: 'id', },
  { title: '昵称', dataIndex: 'nickName', align: 'center', key: 'nickName', },
  { title: '用户姓名', dataIndex: 'name', align: 'center', key: 'name', },
  { title: '年龄', dataIndex: 'age', align: 'center', key: 'age', },
  { title: '性别', dataIndex: 'sex', align: 'center', key: 'sex', },
  { title: '手机号', dataIndex: 'telphone', align: 'center', key: 'phone', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
]
// 疾病数据管理
export const diseaseDataColumns: ColumnProps<any>[] = [
  { title: '疾病编号', dataIndex: 'diseaseCode', align: 'center', key: 'diseaseCode', },
  { title: '疾病名称', dataIndex: 'diseaseName', align: 'center', key: 'diseaseName', },
  { title: '所属科室', dataIndex: 'department', align: 'center', key: 'department', },
  { title: '常见症状', dataIndex: 'symptom', align: 'center', key: 'symptom', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
  { title: '处理人', dataIndex: 'handler', align: 'center', key: 'handler', },
]
// 疾病数据管理
export const hospitalDataColumns: ColumnProps<any>[] = [
  { title: '疾病编号', dataIndex: 'diseaseCode', align: 'center', key: 'diseaseCode', },
  { title: '疾病名称', dataIndex: 'diseaseName', align: 'center', key: 'diseaseName', },
  { title: '所属科室', dataIndex: 'department', align: 'center', key: 'department', },
  { title: '常见症状', dataIndex: 'symptom', align: 'center', key: 'symptom', },
  { title: '创建时间', dataIndex: 'createdAt', align: 'center', key: 'createdAt', },
  { title: '处理人', dataIndex: 'handler', align: 'center', key: 'handler', },
]
