import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const stateToProps = state => ({
  loginStatus: state.login,
  requestStatus: state.httpStatus,
})

@connect(stateToProps)
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
    }
  }

  // https://user-gold-cdn.xitu.io/2018/8/12/1652a030ed1506e0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1
  // nextprops: 表示接收到的新属性
  // nextState: 表示接下来的状态
  // 通过属性来推导状态，props 改变或者 setState 调用会执行
  // 替代 componentWillReceiveProps
  static getDerivedStateFromProps(nextprops, nextState) {
    console.log('=================', nextprops, nextState);
    return null;
  }

  componentDidUpdate() {

  }

  // render 之后，componentDidUpdate 之前
  // prevProps 和 prevState，表示之前的属性和之前的 state， 很少用到
  // 更新阶段涉及的生命周期
  // static getDerivedStateFromProps()
  // shouldComponentUpdate()
  // render()
  // getSnapshotBeforeUpdate()
  // componentDidUpdate()
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('=================', prevProps, prevState);
    return null;
  }

  testDecorator = () => {
    function testable(target) {
      target.prototype.isTestable = {
        a: 3,
      }
    }

    @testable
    class MyTestableClass {
      constructor() {
        this.a = 'a'
      }
    }

    console.log('=========', new MyTestableClass()) // true
  }

  handleClick = () => {
    const { dispatch } = this.props
    const { show } = this.state
    // this.action(dispatch);
    this.setState({
      show: !show,
    })
    //
    // setTimeout(() => {
    //   // ();
    // }, 1000)
    // dispatch({ type: 'REQUESTSTART' })
    // dispatch({ type: 'LOGINED' })
  }

  // 这样写不就是解决了异步的问题吗？
  action = dispatch => setTimeout(() => {
    dispatch({ type: 'REQUESTSTART' })
  }, 1000)

  secondClick = (e) => {
    e.stopPropagation()
    const { dispatch } = this.props

    dispatch({ type: 'REQUESTSUCCESS' })
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>点击登录</div>
        <div onClick={this.secondClick}>取消登录</div>
        <span>Home Hello</span>
      </div>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
}

// export default hot(module)(connect(stateToProps)(Home));
