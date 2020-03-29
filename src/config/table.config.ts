import { ColumnProps } from 'antd/lib/table';
export const TAG_TYPE = [
  { type: 'default', title: '默认标签' },
  {
    type: 'entity',
    title: '实体标签',
  },
  {
    type: 'topic',
    title: '话题分类标签',
  },
  {
    type: 'quality',
    title: '质量分级标签',
  },
];
export const tagNameManageColumns: ColumnProps<any>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    key: 'id',
  },
  {
    title: '标签名称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '标签描述',
    dataIndex: 'describe',
    align: 'center',
    key: 'describe',
    width: 150,
  },
  {
    title: '所属业务线',
    dataIndex: 'department',
    align: 'center',
    key: 'department',
  },
  {
    title: '添加人',
    dataIndex: 'editor',
    align: 'center',
    key: 'editor',
  },
  {
    title: '添加时间',
    dataIndex: 'createDate',
    align: 'center',
    key: 'createDate',
  },
  {
    title: '用户是否可见',
    dataIndex: 'show',
    align: 'center',
    key: 'show',
    render: text => {
      return Boolean(text) === false ? '隐藏' : '可见';
    },
  },
];
