import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Space, Button, Table, Popconfirm, Tag, message } from 'antd'
import { searchFormType, adminerManageItemType } from '@config/type.config'
import { adminerManageForm } from '@config/form.config'
import { adminerManageColumns } from '@config/table.config'
import { AdminerEdit, AdminerCreate } from './widget/index'
import { PlusOutlined } from '@ant-design/icons'
import { fetchData } from '@utils/index'
import { ADMINER_MANAGE } from '@config/api.config'
import styles from './index.less'

export interface AdminerManageProps { }

const AdminerManage: React.FC<AdminerManageProps> = (props) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<adminerManageItemType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)
    const [currentRecordId, setCurrentRecordId] = useState<string>('')
    const [isEditAdminerShow, setIsEditAdminerShow] = useState<boolean>(false)
    const [isCreateAdminerShow, setIsCreateAdminerShow] = useState<boolean>(false)

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
        clearTableData()
        setIsLoading(true)
        validateFields().then(values => {
            fetchData({
                url: ADMINER_MANAGE,
                type: 'GET',
                data: values
            }).then(res => {
                setIsLoading(false)
                setTableData(res.result?.data)
                setTotalSize(res.result?.count)
            })
        })
    }
    // 删除当前行的权限
    const handleDeleteAdminer = (id: string) => {
        fetchData({
            url: `${ADMINER_MANAGE}/${id}`,
            type: 'DELETE'
        }).then(() => {
            message.success('删除成功')
            getTableData()
        })
    }
    // 编辑当前行的数据
    const handleEditAdminer = (id: string) => {
        setCurrentRecordId(id)
        setIsEditAdminerShow(true)
    }
    // 初始化表格列
    const initTableColumns = () => {
        const columns = [
            ...adminerManageColumns,
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate',
                render: (text, record: adminerManageItemType) => {
                    return (
                        <Space className={styles['operate-box']} size={10}>
                            <Tag color='var(--success-color)'
                                onClick={() => handleEditAdminer(record.id)}>编辑</Tag>
                            <Popconfirm
                                title="确定删除该用户的权限?"
                                onConfirm={() => handleDeleteAdminer(record.id)}
                                okText="是"
                                cancelText="否"
                            >
                                <Tag color='var(--danger-color)'>删除</Tag>
                            </Popconfirm>
                        </Space>
                    )
                }
            }
        ]
        setColumns(columns)
    }
    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(adminerManageForm)
    }

    useEffect(() => {
        initTableColumns()
        initSearchForm()
    }, [])

    useEffect(() => {
        getTableData()
    }, [pageNo, pageSize])

    return (
        <div className={styles['adminer-manage']}>
            <Form form={form}>
                <Row gutter={24}>
                    <SearchForm formConfig={formConfig} />
                    <Col span={7} offset={1}>
                        <Space size={20}>
                            <Button type='primary' onClick={() => getTableData()}>查询</Button>
                            <Button onClick={() => resetFields()}>重置</Button>
                            <Button type='dashed' icon={<PlusOutlined />}
                                onClick={() => setIsCreateAdminerShow(true)}
                            >新建用户</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table bordered
                rowKey={(record: adminerManageItemType, index: number) => String(index)}
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
            <AdminerEdit currentRecordId={currentRecordId}
                isEditAdminerShow={isEditAdminerShow}
                closeAdminerEdit={() => setIsEditAdminerShow(false)}
                getTableData={() => getTableData()} />
            {/* 新建用户 */}
            <AdminerCreate isCreateAdminerShow={isCreateAdminerShow}
                closeAdminerCreate={() => setIsCreateAdminerShow(false)}
                getTableData={() => getTableData()} />
        </div>
    )
}

export default AdminerManage 
