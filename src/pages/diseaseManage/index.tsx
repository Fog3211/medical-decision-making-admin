import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Space, Button, Table, Popconfirm, message, Tag } from 'antd'
import { diseaseManageForm } from '@config/form.config'
import { diseaseManageColumns } from '@config/table.config'
import { searchFormType, diseaseDataListType } from '@config/type.config'
import { DISEASE_MANAGE } from '@config/api.config'
import { DiseaseDetail, BatchAdd } from './widget/index'
import { fetchData } from '@utils/index'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

export interface DiseaseManageProps { }

const DiseaseManage: React.FC<DiseaseManageProps> = () => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<diseaseDataListType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)
    const [isDiseaseDetailShow, setIsDiseaseDetailShow] = useState<boolean>(false)
    const [currentRecordId, setCurrentRecordId] = useState<string>('')

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    // 获取表格数据
    const getTableData = () => {
        validateFields().then(values => {
            console.log(values)
            setIsLoading(true)
            fetchData({
                type: 'GET',
                url: DISEASE_MANAGE,
                data: {
                    ...values,
                    pageNo,
                    pageSize
                }
            }).then(res => {
                setIsLoading(false)
                setTableData(res.result.data)
                setTotalSize(res.result.count)
            })
        })
    }
    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(diseaseManageForm)
    }
    // 改变当前页号
    const handlePageNoChange = (pageNo: number) => {
        setPageNo(pageNo)
    }
    // 改变分页数量
    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize)
    }
    // 初始化表格列
    const initTableColumns = () => {
        const columns = [
            ...diseaseManageColumns,
            {
                title: '别称', dataIndex: 'alias', align: 'center', key: 'alias', render: (value: any) => {
                    return value?.split('，').slice(0, 5).map((u: string, index: number) => (
                        <Tag key={index}>{u}</Tag>
                    ))
                }
            },
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate', fixed: 'right',
                render: (text, record: diseaseDataListType) => {
                    return (
                        <div className={styles['operate-box']}>
                            <Tag className={styles['show-detail-btn']}
                                onClick={() => showDiseaseDetail(record._id)} color='var(--info-color)'>查看详情</Tag>
                            <Popconfirm
                                title="确定删除本条疾病数据？"
                                onConfirm={() => handleDeleteDisease(record._id)}
                                okText="是"
                                cancelText="否"
                            >
                                <Button type='primary' danger size='small'
                                    style={{ marginLeft: 20, fontSize: 12 }} >删除</Button>
                            </Popconfirm>
                        </div >
                    )
                }
            }
        ]
        setColumns(columns)
    }
    // 编辑疾病数据
    const showDiseaseDetail = (id: string) => {
        setCurrentRecordId(id)
        setIsDiseaseDetailShow(true)
    }
    // 删除疾病数据
    const handleDeleteDisease = (id: string) => {
        fetchData({
            url: `${DISEASE_MANAGE}/${id}`,
            type: 'DELETE'
        }).then(() => {
            message.success('删除成功')
            getTableData()
        })
    }
    // 批量新增数据
    const handleAddData = () => {

    }

    useEffect(() => {
        initSearchForm()
        initTableColumns()
    }, [])

    useEffect(() => {
        getTableData()
    }, [pageNo, pageSize])

    return (
        <div className={styles['disease-manage']}>
            <Form form={form} onFinish={getTableData}>
                <Row gutter={24}>
                    <SearchForm formConfig={formConfig} />
                    <Col span={8} style={{ textAlign: 'center' }}>
                        <Space size={30}>
                            <Button type='primary' htmlType='submit'>查询</Button>
                            <Button onClick={() => resetFields()}>重置</Button>
                            <Button type='dashed' icon={<PlusOutlined />} onClick={() => handleAddData()}>添加数据</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table bordered className={styles['disease-manage-list']}
                scroll={{ x: 1500 }}
                rowKey={(record: diseaseDataListType, index) => String(index)}
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
            {/* 疾病详细信息 */}
            <DiseaseDetail isDiseaseDetailShow={isDiseaseDetailShow}
                currentRecordId={currentRecordId}
                getTableData={getTableData}
                closeDiseaseDetail={() => setIsDiseaseDetailShow(false)} />
            {/* <BatchAdd/> */}
        </div>
    )
}

export default DiseaseManage 
