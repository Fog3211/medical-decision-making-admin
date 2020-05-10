import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Space, Button, Table, Popconfirm, message, Tag } from 'antd'
import { decisionAuditForm } from '@config/form.config'
import { decisionAuditColumns } from '@config/table.config'
import { searchFormType, decisionAuditListType } from '@config/type.config'
import { DecisionAuditDetail } from './widget/index'
import { DECISION_MANAGE } from '@config/api.config'
import { fetchData } from '@utils/index'
import styles from './index.less'

export interface decisionAuditProps { }

const decisionAudit: React.FC<decisionAuditProps> = (props) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<decisionAuditListType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)
    const [isDecisionAuditDetailShow, setIsDecisionAuditDetailShow] = useState<boolean>(false)
    const [currentRecordId, setCurrentRecordId] = useState<string>('')

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    // 获取表格数据
    const getTableData = () => {
        validateFields().then(values => {
            clearTableData()
            setIsLoading(true)

            fetchData({
                type: 'GET',
                url: DECISION_MANAGE,
                data: {
                    ...values,
                    pageNo,
                    pageSize,
                }
            }).then(res => {
                setIsLoading(false)
                setTableData(res.result?.data)
                setTotalSize(res.result?.count)
            })
        })
    }
    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(decisionAuditForm)
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
    // 初始化表格列
    const initTableColumns = () => {
        const columns = [
            ...decisionAuditColumns,
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate', fixed: 'right',
                render: (text, record: decisionAuditListType) => {
                    return (
                        <div className={styles['operate-box']}>
                            <Tag className={styles['show-detail-btn']}
                                onClick={() => showDecisionAuditDetail(record._id)} color='var(--success-color)'>处理</Tag>
                            <Popconfirm
                                title="确定关闭本条决策审核？"
                                onConfirm={() => handleDeleteHospital(record._id)}
                                okText="是"
                                cancelText="否"
                            >
                                <Button type='primary' danger size='small'
                                    style={{ marginLeft: 20, fontSize: 12 }} >关闭</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
        setColumns(columns)
    }
    // 编辑医院数据
    const showDecisionAuditDetail = (id: string) => {
        setCurrentRecordId(id)
        setIsDecisionAuditDetailShow(true)
    }
    // 删除医院数据
    const handleDeleteHospital = (id: string) => {
        fetchData({
            url: `${DECISION_MANAGE}/${id}`,
            type: 'DELETE'
        }).then(() => {
            message.success('删除成功')
            getTableData()
        })
    }

    useEffect(() => {
        initSearchForm()
        initTableColumns()
    }, [])

    useEffect(() => {
        getTableData()
    }, [pageNo, pageSize])

    return (
        <div className={styles['decisionAudit']}>
            <Form form={form} onFinish={getTableData}>
                <Row gutter={24}>
                    <SearchForm formConfig={formConfig} />
                    <Col span={8} offset={16} style={{ textAlign: 'center' }}>
                        <Space size={30}>
                            <Button type='primary' htmlType='submit'>查询</Button>
                            <Button onClick={() => resetFields()}>重置</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table bordered className={styles['decisionAudit-list']}
                rowKey={(record: decisionAuditListType, index: number) => String(index)}
                scroll={{ x: 1500 }}
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
            {/* 决策详细信息 */}
            <DecisionAuditDetail isDecisionAuditDetailShow={isDecisionAuditDetailShow}
                currentRecordId={currentRecordId}
                getTableData={getTableData}
                closeDecisionAuditDetail={() => setIsDecisionAuditDetailShow(false)} />
        </div>
    )
}

export default decisionAudit 
