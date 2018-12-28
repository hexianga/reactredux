import React, { Component } from 'react';

class HomeTest extends Component {
  render() {
    console.log('我是测试组件，没有监听 state');
    return (
      <div>
        <span>HomeTest Hello</span>
      </div>
    );
  }
}

export default HomeTest;
