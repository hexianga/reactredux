import React, { Component } from 'react';
import history from 'entry/history'
import style from './index.scss'

const filelist = [
  {
    title: '2019最新Android面试题',
    id: '1'
  },
  {
    title: '2019最新Android面试题',
    id: '2'
  },
  {
    title: '2019最新Android面试题',
    id: '3'
  }
]
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filelist,
    }
  }

  componentDidMount() { // eslint-disable
  }

  gotoArticle = async (fileId) => {
    history.push(`/article/${fileId}`)
  }

  render() {
    return (
      <div className={style.articleList}>
        {
          filelist.map(file => (
            <div onClick={() => this.gotoArticle(file.id)} key={file.id}>
              <h2>{file.title}</h2>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Home;
