import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Button, Table, Popconfirm, message } from 'antd'
import { searchFormType, userManageItemType } from '@config/type.config'
import { userManageForm } from '@config/form.config'
import { userManageColumns } from '@config/table.config'
import { USER_MANAGE } from '@config/api.config'
import { UserDetail } from './widget/index'
import { fetchData } from '@utils/index'
import styles from './index.less'

export interface UserManageProps { }

const UserManage: React.FC<UserManageProps> = (props) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<userManageItemType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)
    const [isUserDetailShow, setIsUserDetailShow] = useState<boolean>(false)
    const [currentRecordId, setCurrentRecordId] = useState<string>(null)

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
    // 获取数据
    const getTableData = () => {
        setIsLoading(true)
        validateFields().then(values => {
            fetchData({
                url: USER_MANAGE,
                data: {
                    ...values,
                    pageNo,
                    pageSize,
                }
            }).then(res => {
                setIsLoading(false)
                setTableData(res.result.data)
                setTotalSize(res.result.count)
            })
        })
    }
    // 封禁用户
    const handleForbiddenUser = (id: string) => {
        fetchData({
            url: `${USER_MANAGE}/${id}`,
            type: 'DELETE'
        }).then(() => {
            message.success('封禁/解封成功')
            getTableData()
        })
    }
    // 查看详细信息
    const showUserDetail = (id: string) => {
        setCurrentRecordId(id)
        setIsUserDetailShow(true)
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
                            <Button onClick={() => showUserDetail(record.id)} size='small'>查看</Button>
                            {
                                record.isForbidden ?
                                    <Popconfirm
                                        title="确定解禁该用户?"
                                        onConfirm={() => handleForbiddenUser(record.id)}
                                        okText="是"
                                        cancelText="否"
                                    >
                                        <Button type='primary' size='small'
                                            style={{ marginLeft: 20, fontSize: 12 }} >解禁</Button>
                                    </Popconfirm> :
                                    <Popconfirm
                                        title="确定封禁该用户?"
                                        onConfirm={() => handleForbiddenUser(record.id)}
                                        okText="是"
                                        cancelText="否"
                                    >
                                        <Button type='primary' danger size='small'
                                            style={{ marginLeft: 20, fontSize: 12 }} >封禁</Button>
                                    </Popconfirm>
                            }
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
        <div className={styles['user-manage']}>
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
                rowKey={(record: userManageItemType, index: number) => String(index)}
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
            {/* 查看用户详细信息 */}
            <UserDetail isUserDetailShow={isUserDetailShow}
                currentRecordId={currentRecordId}
                closeUserDetail={() => setIsUserDetailShow(false)} />
        </div>
    )
}

export default UserManage 
