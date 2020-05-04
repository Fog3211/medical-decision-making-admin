import React, { useState, useEffect } from 'react'
import { Form, Checkbox, Button, Input, Card, DatePicker, message, Modal, Row, Col } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { } from '@config/api.config'
import { timeFormatRule } from '@config/rule.config'
import { fetchData } from "@utils/index"
import dayjs from "dayjs"
import styles from './index.less'

const { TextArea } = Input
const { RangePicker } = DatePicker
const { confirm } = Modal

export interface DecisionSettingProps { }

const DecisionSetting: React.FC<DecisionSettingProps> = (props) => {
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const [form] = Form.useForm()
    const { validateFields } = form

    // 提交表单
    const submitForm = (values: any) => {
        const { push_type, push_time, tids, keyWords } = values
        const date: dateType = {}
        if (push_time && push_time.length > 0) {
            date.start_time = dayjs(push_time[0]).format(timeFormatRule)
            date.end_time = dayjs(push_time[1]).format(timeFormatRule)
        } else {
            date.start_time = dayjs().format(timeFormatRule)
            date.end_time = dayjs().format(timeFormatRule)
        }
        const rest: any = {
            tids: tids || null,
            start_time: date.start_time,
            end_time: date.end_time,
            keyWords: keyWords || null
        }
        if (!push_type || push_type.length === 0) {
            message.error('请选择推送位置')
            return
        }
        confirm({
            title: '确定执行强推操作？',
            icon: <QuestionCircleOutlined />,
            onOk: () => {
                push_type.map((item: string) => {
                    handleDecisionSetting(rest, item)
                })
            },
            okText: '确定',
            cancelText: '取消',
        })
    }
    // 强推操作
    const handleDecisionSetting = (rest: any, type: string) => {
        fetchData({
            type: "GET",
            url: '',
            data: {
                ...rest,
                type
            }
        }).then(() => message.success('操作成功'))
    }
    // 改变推送类型时
    const changePushType = (value: any[] = []) => {
        if (value.includes(17)) {
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
    }

    useEffect(() => {
        // 选中搜索页时不校验，提交时校验
        if (isSearch) return
        validateFields(['keyWords'])
    }, [isSearch])

    return (
        <Row className={styles['force-push-post']}>
            <Col span={12}>
                <Card className={styles['form-card']}>
                    <Form form={form} layout={'vertical'} onFinish={submitForm}>
                        <Form.Item label="选择推送位置" name="push_type">
                            <Checkbox.Group onChange={(e) => changePushType(e)}>
                                <Checkbox value={15}>推荐页</Checkbox>
                                <Checkbox value={16}>关注页</Checkbox>
                                <Checkbox value={17}>搜索页</Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item label="需要推送的帖子ID" name="tids" rules={[{ required: true, message: '请输入帖子的id' }]}>
                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder={'请输入需要推送的帖子ID,多个请用英文逗号分隔'} />
                        </Form.Item>
                        <Form.Item label="自动决策时间" name="push_time"
                            rules={[{ required: true, message: '请选择自动决策时间' }]}>
                            <RangePicker showTime style={{ width: '60%' }} />
                        </Form.Item>
                        <Form.Item label="搜索关键词（仅搜索页生效）" name="keyWords"
                            rules={[{ required: isSearch, message: '请输入搜索关键词' }]}
                        >
                            <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder={'请输入搜索关键词,多个请用英文逗号分隔'} />
                        </Form.Item>
                        <div className={styles['submit-btn-box']}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default DecisionSetting