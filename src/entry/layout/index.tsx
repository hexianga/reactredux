// @ts-nocheck
import React, { Component } from 'react';
import SideBar from '../sidebar/index';
import HomeRouter from '../router/index'
import style from './style.scss'

class Layout extends Component<any, any> {
  componentDidMount(): void {

  }

  render(): JSX.Element {
    const { match } = this.props
    return (
      <>
        <SideBar />
        <div className={style.containerWrapper}>
          <HomeRouter match={match} />
        </div>
      </>
    )
  }
}

export default Layout;
