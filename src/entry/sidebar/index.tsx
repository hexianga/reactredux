// @ts-nocheck
import React, { Component } from 'react';
import { Menu } from 'antd'
import MenuConfig from './menu'
import history from '../history'
import style from './style.scss'

const { SubMenu, Item } = Menu as any

class SideBar extends Component {

  handleClick = (e: any): void => {
    history.push(e.key)
  }

  render(): JSX.Element {
    return (
      <div className={style.sideBarWrapper}>
        <div className={style.title}>个人后台管理</div>
        <Menu
          onClick={this.handleClick}
          mode="inline"
          theme="dark"
        >
          {
            MenuConfig.map((menu) => (
              <SubMenu
                key={menu.key}
                title={<span>{menu.title}</span>}
              >
                {menu.subMenu.map((subItem) => {
                  return <Item key={subItem.path}>{subItem.title}</Item>
                })}
              </SubMenu>
            ))
          }
        </Menu>
      </div>
    )
  }
}

export default SideBar;
