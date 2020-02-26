import React, { Component } from 'react';
import Home from './home';
import HomeTest from './hometest';

class HomeContainer extends Component<any, any> {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const props = this.props;

    return (
      <div>
        <Home {...props} />
        <HomeTest {...props} />
      </div>
    );
  }
}

export default HomeContainer;
