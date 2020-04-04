import React, { useState, useEffect } from 'react'
import { FormProps } from 'antd/lib/form'
import { Select, Input, DatePicker, Form, Col } from 'antd'
import { searchFormType } from '@config/type.config'

const { RangePicker } = DatePicker
const { TextArea } = Input

export interface SearchFormProps extends FormProps {
    formConfig: searchFormType[]
}

const SearchForm: React.FC<SearchFormProps> = (props: SearchFormProps) => {

    const { formConfig } = props

    // 根据类型渲染搜索组件
    const renderFormItemByType = (item: searchFormType) => {
        if (!item) return null
        const { type } = item

        switch (type) {
            case 'input':
                return (
                    <Input {...item.props} placeholder={item.placeholder} />
                )
            case 'select':
                return (
                    <Select {...item.props} placeholder={item.placeholder} />
                )
            case 'datetime':
                return (
                    <DatePicker {...item.props} style={{ width: '100%' }} />
                )
            case 'rangePicker':
                return (
                    <RangePicker {...item.props} style={{ width: '100%' }} />
                )
            case 'textArea':
                return (
                    <TextArea {...item.props} placeholder={item.placeholder} />
                )
            default:
                return null
        }
    }

    return (
        <>
            {
                formConfig.map((item, index) => (
                    <Col key={index} span={item.span}>
                        <Form.Item label={item.label} name={item.key} rules={item.rules}>
                            {renderFormItemByType(item)}
                        </Form.Item>
                    </Col>
                ))
            }
        </>
    )
}


export default SearchForm