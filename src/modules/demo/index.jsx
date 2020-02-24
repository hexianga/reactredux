import React, { Component } from 'react'
import { Upload } from 'antd'
import Api from '../../utils/create-request'

export default class Demo extends Component {

  handleChange = async (e) => {
    const response = await Api.common.upload()

  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
      </div>
    )
  }
}