import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Button, Table, Popconfirm } from 'antd'
import { searchFormType, userManageItemType } from '@config/type.config'
import { userManageForm } from '@config/form.config'
import { userManageColumns } from '@config/table.config'
import styles from './index.less'

export interface UserManageProps {

}

const UserManage: React.FC<UserManageProps> = () => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<userManageItemType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(userManageForm)
    }
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
        validateFields().then(values => {

        })
    }
    // 删除当前行的权限
    const handleDeleteAuth = (id: number) => {
    }
    // 编辑当前行的数据
    const handleEditAuth = (id: number) => {
    }
    // 初始化表格列
    const initTableColumns = () => {
        const columns = [
            ...userManageColumns,
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate',
                render: (text, record: userManageItemType) => {
                    return (
                        <div className={styles['operate-box']}>
                            <Button onClick={() => handleEditAuth(record.id)}>编辑</Button>
                            <Popconfirm
                                title="确定删除本行所在人员的权限?"
                                onConfirm={() => handleDeleteAuth(record.id)}
                                okText="是"
                                cancelText="否"
                            >
                                <Button type='primary' danger size='small'
                                    style={{ marginLeft: 20, fontSize: 12 }} >删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
        setColumns(columns)
    }

    useEffect(() => {
        initSearchForm()
        initTableColumns()
    }, [])

    useEffect(() => {
        getTableData()
    }, [pageNo, pageSize])

    return (
        <div className={styles['auth-manage']}>
            <Form form={form}>
                <Row gutter={24}>
                    <SearchForm formConfig={formConfig} />
                    <Col offset={1}>
                        <Button type='primary' onClick={() => getTableData()}>查询</Button>
                        <Button onClick={() => resetFields()} style={{ marginLeft: 30 }}>重置</Button>
                    </Col>
                </Row>
            </Form>
            <Table bordered
                rowKey={(record: userManageItemType, index) => String(index)}
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
        </div>
    )
}

export default UserManage 
