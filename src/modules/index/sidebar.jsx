import React, { Component } from 'react';
import { history } from '@net/history.js'
import * as style from './sidebar.scss'

const list = {
  'books': '读书笔记',
  'ones': '随笔',
  'aboutme': '关于我',
  'musics': '歌单',
  'dayreport': '日报',
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

  render() {
    const { selectedCategory } = this.state
    return (
      <div className={style.sideBarWrapper}>
        <ul className={style.categoryWrapper}>
         {
           Object.keys(list).map((category) => {
             return (
              <li
                className={selectedCategory === category ? style.selectedCategory : ''}
                key={category}
                onClick={() => this.goToPage(category)}
              >
                {list[category]}
              </li>
             )
           })
         }
        </ul>
      </div>
    )
  } 
}

export default SideBar;
