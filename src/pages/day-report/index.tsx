
import React from 'react'
import ReactQuill from 'react-quill';
import moment from 'moment'
import { Button, DatePicker, message } from 'antd'
import Api from 'net/create-request'
import 'react-quill/dist/quill.snow.css'
import style from './style.scss'

// 常见的几种富文本编辑器(还有 draft js)
// https://blog.csdn.net/Loya0813/article/details/84391944

class DayReport extends React.Component<any, any> {
  todayTimeStramp: number = new Date(new Date().toLocaleDateString()).valueOf()

  state = {
    id: undefined,
    selectedTime: this.todayTimeStramp,
    content: '',
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  componentDidMount(): void {
    this.getContent(this.todayTimeStramp)
  }

  handleChange = (value): void => {
    this.setState({
      content: value
    })
  }

  saveContent = async (): Promise<any> => {
    try {
      const { content, id } = this.state
      const response = await Api.dayreport.post_save({
        id,
        content,
        createTime: this.todayTimeStramp,
      })
      if (response.rescode === 0) {
        message.success('保存成功！')
        if (!id) {
          this.setState({
            id: response.result.id
          })
        }
      } else {
        message.warning(response.resmsg)
      }
    } catch (err) {
      message.warning('保存失败！')
      console.log(err)
    }
  }

  getContent = async (selectedTime: number): Promise<any> => {
    try {
      const response = await Api.dayreport.getContent({
        createTime: selectedTime,
      })
      if (response.rescode === 0) {
        this.setState({
          selectedTime,
          content: response.result.content,
          id: response.result.id
        })
      } else if (response.rescode === 1) {
        message.warning(response.resmsg)
      } else if (response.rescode === 2) {
        this.setState({
          selectedTime,
          content: '',
          id: undefined
        })
      }
    } catch (err) {
      message.warning('获取数据失败！')
      console.log(err)
    }
  }

  onChange = async (value): Promise<any> => {
    const selectedTime = new Date(moment(value).format('MM/DD/YYYY')).valueOf()
    if (selectedTime > this.todayTimeStramp) {
      this.setState({
        selectedTime,
        content: '',
        id: undefined,
      })
    } else {
      await this.getContent(selectedTime)
    }
  }

  render(): JSX.Element {
    const { content, selectedTime } = this.state
    console.log(selectedTime, this.todayTimeStramp)
    const readonly = selectedTime !== this.todayTimeStramp

    return (
      <div className={style.container}>
        <DatePicker onChange={this.onChange} defaultValue={moment(this.todayTimeStramp)} />
        <ReactQuill
          readOnly={readonly}
          value={content}
          onChange={this.handleChange}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
        />
        <div className="operate-area">
          <Button type="primary" onClick={this.saveContent} disabled={readonly}>保存</Button>
        </div>
      </div>
    )
  }
}

export default DayReport
