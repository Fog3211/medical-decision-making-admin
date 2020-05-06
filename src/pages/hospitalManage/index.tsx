import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Space, Button, Table, Popconfirm, message, Tag } from 'antd'
import { hospitalForm } from '@config/form.config'
import { hospitalManageColumns } from '@config/table.config'
import { searchFormType, hospitalListType } from '@config/type.config'
import { HospitalDetail } from './widget/index'
import { HOSPITAL_MANAGE } from '@config/api.config'
import { fetchData } from '@utils/index'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

export interface hospitalManageProps { }

const hospitalManage: React.FC<hospitalManageProps> = (props) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<hospitalListType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)
    const [isHospitalDetailShow, setIsHospitalDetailShow] = useState<boolean>(false)
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
                url: HOSPITAL_MANAGE,
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
        setFormConfig(hospitalForm)
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
            ...hospitalManageColumns,
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate', fixed: 'right',
                render: (text, record: hospitalListType) => {
                    return (
                        <div className={styles['operate-box']}>
                            <Tag className={styles['show-detail-btn']}
                                onClick={() => showHospitalDetail(record.id)} color='var(--info-color)'>查看详情</Tag>
                            <Popconfirm
                                title="确定删除本条医院数据？"
                                onConfirm={() => handleDeleteHospital(record.id)}
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
    // 编辑医院数据
    const showHospitalDetail = (id: string) => {
        setCurrentRecordId(id)
        setIsHospitalDetailShow(true)
    }
    // 删除医院数据
    const handleDeleteHospital = (id: string) => {
        fetchData({
            url: `${HOSPITAL_MANAGE}/${id}`,
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
        <div className={styles['hospital-manage']}>
            <Form form={form} onFinish={getTableData}>
                <Row gutter={24}>
                    <SearchForm formConfig={formConfig} />
                    <Col span={8} offset={16} style={{ textAlign: 'right' }}>
                        <Space size={20}>
                            <Button type='primary' htmlType='submit'>查询</Button>
                            <Button onClick={() => resetFields()}>重置</Button>
                            <Button type='dashed' icon={<PlusOutlined />}>添加数据</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table bordered className={styles['hospital-data-list']}
                rowKey={(record: hospitalListType, index: number) => String(index)}
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
            {/* 医院详细信息 */}
            <HospitalDetail isHospitalDetailShow={isHospitalDetailShow}
                currentRecordId={currentRecordId}
                getTableData={getTableData}
                closeHospitalDetail={() => setIsHospitalDetailShow(false)} />
        </div>
    )
}

export default hospitalManage 
