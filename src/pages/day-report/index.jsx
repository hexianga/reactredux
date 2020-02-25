
import React from 'react'
import ReactQuill from 'react-quill';
import Api from '@net/create-request'
import 'react-quill/dist/quill.snow.css'
import style from './style.scss'

// 常见的几种富文本编辑器(还有 draft js)
// https://blog.csdn.net/Loya0813/article/details/84391944

class DayReport extends React.Component {
  state = {
    text: ''
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
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

  handleChange = (value) => {
    this.setState({
      text: value
    })
  }

  render() {
    return (
      <div className={style.container}>
          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            theme="snow"
            modules={this.modules}
            formats={this.formats}
          />
      </div>
    )
  }
}
  
export default DayReport
