import React, { Component } from 'react';
import { Menu } from 'antd'
import MenuConfig from './menu'
import history from 'entry/history'
import style from './sidebar.scss'

const { SubMenu } = Menu as any

const list = {
  books: '读书笔记',
  ones: '随笔',
  aboutme: '关于我',
  musics: '歌单',
  dayreport: '日报',
}



class SideBar extends Component {
  state = {
    selectedCategory: 'books',
  }

  goToPage = (category) => {
    this.setState({
      selectedCategory: category
    })
    history.push(`/${category}`)
  }

  handleClick = (e: any): void => {
    history.push(e.key)
  }

  render(): JSX.Element {
    // const { selectedCategory } = this.state
    return (
      <div className={style.sideBarWrapper}>
        <div className={style.title}>个人后台管理</div>
        <Menu
          onClick={this.handleClick}
          mode="inline"
          theme="dark"
        >
          {
            MenuConfig.map((menu) => {
              return (
                <SubMenu
                  key={menu.key}
                  title={<span>{menu.title}</span>}
                >
                  {menu.subMenu.map((subItem) => {
                    return <Menu.Item key={subItem.path}>{subItem.title}</Menu.Item>
                  })}
                </SubMenu>
              )
            })
          }
        </Menu>
        {/* <ul className={style.categoryWrapper}>
          {
           Object.keys(list).map((category) => (
             <li
               className={selectedCategory === category ? style.selectedCategory : ''}
               key={category}
               onClick={() => this.goToPage(category)}
             >
               {list[category]}
             </li>
           ))
         }
        </ul> */}
      </div>
    )
  }
}

export default SideBar;
