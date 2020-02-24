import React, { Component } from 'react'
import './index.css'

class Event extends Component {
  // react阻止冒泡事件：https://zhuanlan.zhihu.com/p/26742034
  handleClickOne = (e) => {
    console.log('点击合成事件', e)
    console.log('对应的 dom 事件', e.nativeEvent)
  }

  handleClickTwo = (e) => {
    e.stopPropagation()

    console.log('点击合成事件', e)
    console.log('对应的 dom 事件', e.nativeEvent)
  }

  render() {
    return (
      <div className="box1" onClick={e => this.handleClickOne(e)}>
        点我吧！！！我是外层元素
        <div className="box2" onClick={e => this.handleClickTwo(e)}>点我吧！！！我是里层元素</div>
      </div>
    )
  }
}

export default Event
