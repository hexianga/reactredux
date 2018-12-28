import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const stateToProps = (state) => {
  return {
    loginStatus: state.login,
    requestStatus: state.httpStatus,
  };
}
// @connect(stateToProps)
class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      show: true,
    };
  }

  handleClick = () => {
    const { dispatch } = this.props;

    // dispatch( {type: 'LOGINED'} );
    dispatch({ type: 'REQUESTSTART' });
  }

  secondClick = (e) => {
    e.stopPropagation()
    const { dispatch } = this.props;

    dispatch({ type: 'REQUESTSTART' });
  }


  render() {
    console.log(this.props);
    const { show } = this.state;
    return (
      <div>
        <div onClick={this.handleClick}>点击登录</div>
        <div onClick={this.secondClick}>取消登录</div>
        { show && <span>Home Hello</span>}
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(stateToProps)(Home);
