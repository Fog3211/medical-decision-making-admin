import React, { useState, useEffect } from 'react'
import { SearchForm } from '@components/index'
import { Form, Row, Col, Space, Button, Table, Popconfirm, message, Tag } from 'antd'
import { diseaseDataForm } from '@config/form.config'
import { diseaseDataColumns } from '@config/table.config'
import { searchFormType, diseaseDataListType } from '@config/type.config'
import { } from '@config/api.config'
import { fetchData } from '@utils/index'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

export interface DiseaseDataProps {

}

const DiseaseData: React.FC<DiseaseDataProps> = (props: DiseaseDataProps) => {
    const [formConfig, setFormConfig] = useState<searchFormType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<diseaseDataListType[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [totalSize, setTotalSize] = useState<number>(0)

    const [form] = Form.useForm()
    const { resetFields, validateFields } = form

    // 获取表格数据
    const getTableData = () => {
        validateFields().then(values => {
            console.log(values)
            // setIsLoading(true)
            const data = [{
                id: 1,
                diseaseName: '高血压',
                diseaseCode: 'G339820',
                handler: 'fog3211',
                create_time: 'asdsa',
                symptom: '头痛，胸闷',
                department: '内科',
                tag: ['三高', '高血压']
            }] as any
            setTableData(data)
            fetchData({
                type: 'GET',
                url: '',
                data: {

                }
            }).then(res => {
                setIsLoading(false)
            })
        })
    }
    // 初始化搜索form
    const initSearchForm = () => {
        setFormConfig(diseaseDataForm)
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
            ...diseaseDataColumns,
            {
                title: '搜索关键词', dataIndex: 'tag', align: 'center', key: 'tag', render: (value: any) => {
                    return value.slice(0, 5).map((u: string, index: number) => (
                        <Tag key={index}>{u}</Tag>
                    ))
                }
            },
            {
                title: '操作', dataIndex: 'operate', align: 'center', key: 'operate',
                render: (text, record: diseaseDataListType) => {
                    return (
                        <div className={styles['operate-box']}>
                            <Tag className={styles['show-detail-btn']}
                                onClick={() => showDiseaseDetail(record.id)} color='var(--info-color)'>查看详情</Tag>
                            <Popconfirm
                                title="确定删除本条疾病数据？"
                                onConfirm={() => handleDeleteDisease(record.id)}
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
    // 编辑疾病数据
    const showDiseaseDetail = (id: number) => {

    }
    // 删除疾病数据
    const handleDeleteDisease = (id: number) => {

    }


    useEffect(() => {
        initSearchForm()
        initTableColumns()
    }, [])

    useEffect(() => {
        getTableData()
    }, [pageNo, pageSize])

    return (
        <div className={styles['disease-data']}>
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
            <Table bordered className={styles['disease-data-list']}
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
        </div>
    )
}

export default DiseaseData 
