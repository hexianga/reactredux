import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const stateToProps = state => ({
  loginStatus: state.login,
  requestStatus: state.httpStatus,
})
// @connect(stateToProps)
class Home extends Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
    }
  }

  // 测试学习两个新生命周期
  // https://user-gold-cdn.xitu.io/2018/8/12/1652a030ed1506e0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1
  // nextprops: 表示接收到的新属性
  // nextState: 表示接下来的状态
  // 通过属性来推导状态，props 改变或者 setState 调用会执行
  // 替代 componentWillReceiveProps
  // static getDerivedStateFromProps(nextprops, nextState) {
  //   console.log('getDerivedStateFromProps', nextprops, nextState);
  //
  //   return {
  //     shows: true,
  //   }
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate', prevProps, prevState, this.state);
  // }

  // render 之后，componentDidUpdate 之前
  // prevProps 和 prevState，表示之前的属性和之前的 state， 很少用到
  // 更新阶段涉及的生命周期
  // static getDerivedStateFromProps()
  // shouldComponentUpdate()
  // render()
  // getSnapshotBeforeUpdate()
  // componentDidUpdate()
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate', prevProps, prevState);
  //   return null;
  // }

  testDecorator = () => {
    function testable(target) {
      target.prototype.isTestable = {
        a: 3,
      }
    }

    @testable
    class MyTestableClass {
      a: string;
      constructor() {
        this.a = 'a'
      }
    }

    // console.log('=========', new MyTestableClass()) // true
  }

  // 测试学习异步 action 的处理
  handleClick = () => {
    const { dispatch } = this.props
    const { show } = this.state

    dispatch({
      type: 'REQUESTSTART',
      // payload: {
      //   param: 'param',
      // },
    })

    // 异步分发 action 的方式一：
    // this.action(dispatch);
    // 异步分发 action 的方式二：
    // dispatch(this.asyncAction)

    // this.setState({
    //   show: !show,
    // })

    // setTimeout(() => {
    //   // ();
    // }, 1000)
    // dispatch({ type: 'REQUESTSTART' })
    // dispatch({ type: 'LOGINED' })
    //
  }

  // 给异步方法传递 dispatch 解决异步 action 问题
  action = dispatch => setTimeout(() => {
    dispatch({ type: 'REQUESTSTART' })
  }, 1000)

  // 使用 redux-thunk
  asyncAction = (dispatch, getState) => {
    dispatch({ type: 'REQUESTSTART' });
  }


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
export default connect(stateToProps)(Home);
// export default Home
// export default hot(module)(connect(stateToProps)(Home));
