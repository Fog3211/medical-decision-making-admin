import React, { useState, useEffect } from 'react'
import { FormProps } from 'antd/lib/form'
import { Select, Input, DatePicker, Form, Col, message } from 'antd'
import { fetchData } from '@utils/index'
import { searchFormType, optionistContainer } from '@config/type.config'

const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select

export interface SearchFormProps extends FormProps {
    formConfig: searchFormType[]
}

const SearchForm: React.FC<SearchFormProps> = (props: SearchFormProps) => {
    const { formConfig } = props

    const [optionistContainer, setOptionistContainer] = useState<optionistContainer>({})

    // 获取下拉列表数据
    const getOptionList = async (url: string, key: string) => {
        fetchData({
            url
        }).then(res => {
            if (res.code === 200) {
                updateOptionistContainer(key, res.data)
            } else {
                message.error(res.msg)
            }
        }).catch(err => {
            message.error(err)
        })
    }
    // 更新下拉数据
    const updateOptionistContainer = (key: string, option: selectType[]) => {
        const result = {
            ...optionistContainer,
            [key]: option
        }
        setOptionistContainer(result)
    }
    // 初始化下拉数据
    const initSelectList = () => {
        const result = {}
        formConfig.map(item => {
            if (item.option) {
                updateOptionistContainer(item.key, item.option)
                result[item.key] = item.option
            } else if (item.optionRequestUrl) {
                getOptionList(item.optionRequestUrl, item.key)
            }
        })
    }

    useEffect(() => {
        initSelectList()
    }, [])

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
                    <Select {...item.props} placeholder={item.placeholder} >
                        {
                            optionistContainer[item.key] && optionistContainer[item.key].map((option: selectType, jndex) => (
                                <Option key={jndex} value={option.id}>{option.name}</Option>
                            ))
                        }
                    </Select>
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