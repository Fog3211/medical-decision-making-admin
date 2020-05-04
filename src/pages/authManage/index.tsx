import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Space, Button, Table, Popconfirm, Tag } from 'antd'
import { searchFormType, authManageItemType } from '@config/type.config'
import { authManageForm } from '@config/form.config'
import { authManageColumns } from '@config/table.config'
import { AuthEdit, AuthCreate } from './widget/index'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

export interface AuthManageProps {

}

const AuthManage: React.FC<AuthManageProps> = (props: AuthManageProps) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<authManageItemType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)
    const [currentRecordId, setCurrentRecordId] = useState<number>(0)
    const [isEditAuthShow, setIsEditAuthShow] = useState<boolean>(false)
    const [isCreateAuthShow, setIsCreateAuthShow] = useState<boolean>(false)

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    // 改变当前页号
    const handlePageNoChange = (pageNo: number) => {
        setPageNo(pageNo)
    }
    // 改变分页数量
    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize)
    }
    // 清空之前的数据
    const clearTableData = () => {
        setTableData([])
    }
    // 获取数据
    const getTableData = () => {
        const data = [
            {
                id: 1,
                telphone: 1738122,
                username: 'fog3211',
                puid: 222,
                auth_label: '系统管理员',
                create_time: '2020-08-09 22:00:03'
            }
        ] as any
        setTableData(data)
        validateFields().then(values => {
            console.log(values)
        }).catch()
    }
    // 删除当前行的权限
    const handleDeleteAuth = (id: number) => {
        getTableData()
    }
    // 编辑当前行的数据
    const handleEditAuth = (id: number) => {
        setCurrentRecordId(id)
        setIsEditAuthShow(true)
    }
    // 初始化表格列
    const initTableColumns = () => {
        const columns = [
            ...authManageColumns,
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate',
                render: (text, record: authManageItemType) => {
                    return (
                        <div className={styles['operate-box']}>
                            <Tag color='var(--success-color)'
                                onClick={() => handleEditAuth(record.id)}>编辑</Tag>
                            <Popconfirm
                                title="确定删除该用户的权限?"
                                onConfirm={() => handleDeleteAuth(record.id)}
                                okText="是"
                                cancelText="否"
                            >
                                <Tag color='var(--danger-color)'
                                    onClick={() => handleDeleteAuth(record.id)}>删除</Tag>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
        setColumns(columns)
    }

    useEffect(() => {
        initTableColumns()
    }, [])

    useEffect(() => {
        getTableData()
    }, [pageNo, pageSize])

    return (
        <div className={styles['auth-manage']}>
            <Form form={form}>
                <Row gutter={24}>
                    <SearchForm formConfig={authManageForm} />
                    <Col span={7} offset={1}>
                        <Space size={20}>
                            <Button type='primary' onClick={() => getTableData()}>查询</Button>
                            <Button onClick={() => resetFields()}>重置</Button>
                            <Button type='dashed' icon={<PlusOutlined />}
                                onClick={() => setIsCreateAuthShow(true)}
                            >新建用户</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table bordered
                rowKey={(record: authManageItemType, index) => String(index)}
                pagination={{
                    defaultPageSize: 20,
                    current: pageNo,
                    total: totalSize,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ['20', '30', '40', '50'],
                    onChange: pageNo => handlePageNoChange(pageNo),
                    onShowSizeChange: (pageNo, pageSize) => handlePageSizeChange(pageSize)
                }}
                loading={isLoading}
                columns={columns}
                dataSource={tableData} />
            {/* 编辑用户权限 */}
            <AuthEdit currentRecordId={currentRecordId}
                isEditAuthShow={isEditAuthShow}
                closeAuthEdit={() => setIsEditAuthShow(false)}
                getTableData={() => getTableData()} />
            {/* 新建用户 */}
            <AuthCreate isCreateAuthShow={isCreateAuthShow}
                closeAuthCreate={() => setIsCreateAuthShow(false)}
                getTableData={() => getTableData()} />
        </div>
    )
}

export default AuthManage 
