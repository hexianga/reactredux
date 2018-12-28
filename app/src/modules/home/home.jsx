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
    dispatch({ type: 'REQUESTSTART' })
    // dispatch({ type: 'LOGINED' })
  }

  secondClick = (e) => {
    e.stopPropagation()
    const { dispatch } = this.props

    dispatch({ type: 'REQUESTSTART' })
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

// export default connect(stateToProps)(Home);
