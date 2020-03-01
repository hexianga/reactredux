import React, { Component } from 'react';
import SideBar from './sidebar';
import HomeRouter from './router'
import style from './index.scss'

class Home extends Component<any, any> {
  render() {
    return (
      <div>
        <SideBar />
        <div className={style.containerWrapper}>
          <HomeRouter match={this.props.match} />
        </div>
      </div>
    )
  }
}

export default Home;
