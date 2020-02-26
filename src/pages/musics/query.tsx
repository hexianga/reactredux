import React from 'react'
import { Table, Row, Col, Form, Button, Select, Input } from 'antd' // ts 报错
// const { Table, Row, Col, Form, Button, Select, Input } = require('antd')  // ts 不报错
import style from './style.scss'

const { Option } = Select as any

class Query extends React.Component<any, any> {
  state = {
    exportLoading: false,
  }

  componentDidMount() {
    document.title = "喜爱音乐列表"
    this.getMusicList()
  }

  exportMusicList = () => {
    this.setState({
      exportLoading: true,
    })
  }

  resetForm = () => {
    this.props.form.resetFields()
    this.getMusicList()
  }

  getMusicList = () => {

  }

  // antd 的六个尺寸：xs sm md lg xl xxl   576 768 992 1200 1600
  // offset: 栅格左侧间隔数 span：栅格的跨度
  // label：设置 label 占据的栅格  wrapple：设置表单占据的栅格
  formItemLayout = {
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 20 },
    },
    labelCol: {
      xs: { span: 12 },
      sm: { span: 4 },
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const { exportLoading } = this.state

    return (
      <div className={style.queryList}>
        <Form {...this.formItemLayout}>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="歌名">
                {getFieldDecorator('title')(<Input placeholder="请输入歌名" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="原唱">
                {getFieldDecorator('originSinger')(<Input placeholder="请输入原唱" allowClear />)}
              </Form.Item></Col>
            <Col span={6}>
              <Form.Item label="演唱">
                {getFieldDecorator('singer')(<Input placeholder="请输入演唱者" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="来源">
                {getFieldDecorator('source')(
                  <Select placeholder="请选择来源" allowClear>
                    <Option value={1}>我想和你唱</Option>
                    <Option value={2}>抖音</Option>
                    <Option value={3}></Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={18}/>
            <Col span={6}>
              <div className="operate-wrapper">
                <Button type="primary">查询</Button>
                <Button type="primary" onClick={this.resetForm}>重置</Button>
                <Button type="primary" loading={exportLoading} onClick={this.exportMusicList}>导出</Button>
              </div>
              </Col>
          </Row>
        </Form>
      </div>
    ) 
  }
}

export default Form.create()(Query)

