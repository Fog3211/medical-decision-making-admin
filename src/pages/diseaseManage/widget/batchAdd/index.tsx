import React, { useEffect } from 'react'
import { Button, Input, Row, Form, Drawer, Space, message } from 'antd'
import { DISEASE_MANAGE } from '@config/api.config'
import { fetchData } from '@utils/index'

const { TextArea } = Input

export interface BatchAddProps {
  isBatchOperateShow: boolean
  closeBatchOperate: Function
}

const BatchAdd: React.FC<BatchAddProps> = (props) => {
  const { isBatchOperateShow, closeBatchOperate } = props

  const [form] = Form.useForm()
  const { resetFields, validateFields } = form

  // 提交node表单(新增和编辑已有没有id区分)
  const submitForm = () => {
    validateFields().then(values => {
      fetchData({
        url: DISEASE_MANAGE,
        data: {
          ...values
        },
        type: 'POST'
      }).then(res => {
        if (res.data.status === 200) {
          message.success('批量添加疾病成功')
        } else {
          message.error(res.data.msg)
        }
      })
    })
  }

  useEffect(() => {
    if (!isBatchOperateShow) resetFields()
  }, [isBatchOperateShow])

  return (
    <Form form={form}>
      <Drawer visible={isBatchOperateShow} onClose={() => closeBatchOperate()}
        title={`批量操作添加数据`} width={500}
        footer={
          <Row justify='end'>
            <Space size={30} style={{ marginRight: 20 }}>
              <Button onClick={() => closeBatchOperate()}>取消</Button>
              <Button type='primary' onClick={() => submitForm()}>保存</Button>
            </Space>
          </Row>
        }>
        <Form.Item name='list'>
          <TextArea autoSize />
        </Form.Item>
      </Drawer>
    </Form>
  )
}

export default BatchAdd