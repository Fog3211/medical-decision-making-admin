import React, { useEffect, useState } from 'react'
import { FormProps } from 'antd/lib/form'
import { Select, Input, DatePicker, Form, Row, Col } from 'antd'
import { searchFormType } from '@config/type.config'
import { fetchData } from '@utils/index'

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select

export interface SearchFormProps extends FormProps {
    formConfig: searchFormType[]
}

const SearchForm: React.FC<SearchFormProps> = (props) => {
    const { formConfig: _formConfig } = props

    const [formConfig, setFormConfig] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(true)

    // 根据类型渲染搜索组件
    const renderFormItemByType = (item: searchFormType) => {
        if (!item) return null
        const { type } = item

        switch (type) {
            case 'input':
                return (
                    <Input {...item.comProps} />
                )
            case 'select':
                return (
                    <Select {...item.comProps}
                        filterOption={item.filter ? (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true}
                    >{
                            item.option && item.option.map((item: anyObj, index: number) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))
                        }
                    </Select>
                )
            case 'datetime':
                return (
                    <DatePicker {...item.comProps} style={{ width: '100%' }} />
                )
            case 'timeRange':
                return (
                    <RangePicker {...item.comProps} style={{ width: '100%' }} />
                )
            case 'textArea':
                return (
                    <TextArea {...item.comProps} />
                )
            default:
                return null
        }
    }
    const getSelectList = async (url: string) => {
        const res = await fetchData({
            url
        })
        return res.result.map(u => { return { id: u.key, name: u.name } })
    }
    const initSelectList = async () => {
        if (!Array.isArray(_formConfig)) {
            return []
        }
        const copyFormConfig = JSON.parse(JSON.stringify(_formConfig))

        for (const [index, item] of copyFormConfig.entries()) {
            if (item.requestUrl && !item.option) {
                item.option = await getSelectList(item.requestUrl)
            }
        }
        setFormConfig(copyFormConfig)
    }

    useEffect(() => {
        initSelectList()
    }, [_formConfig])

    return (
        <>
            {
                formConfig.map((item, index) => (
                    <Col key={index} span={item.span}>
                        <Form.Item {...item.formProps}>
                            {renderFormItemByType(item)}
                        </Form.Item>
                    </Col>
                ))
            }
        </>
    )
}

export default SearchForm