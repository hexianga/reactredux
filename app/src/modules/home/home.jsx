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
    this.action(dispatch);
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
    this.testDecorator();
    console.log(this.props)
    const { show } = this.state
    return (
      <div>
        <div onClick={this.handleClick}>点击登录</div>
        <div onClick={this.secondClick}>取消登录</div>
        {show && <span>Home Hello</span>}
      </div>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
}

// export default hot(module)(connect(stateToProps)(Home));
