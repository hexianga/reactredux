import React from 'react'
import { Table, message } from 'antd'
import Query from './query'
import Api from '@net/create-request'
import style from './style.scss'

class MusicList extends React.Component {
  state = {
    dataSource: [],
  }

  pagination = {
    page: 1,
    pageSize: 20,
    total: 0,
  }

  async componentDidMount() {
    try {
      const response = await Api.music.list()
      if (response.rescode === 0) {
        this.pagination.total = response.result.total
        this.setState({
          dataSource: response.result.list
        })
      } else {
        message.warning(response.resmsg)
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  columns = [
    {
      title: '歌名',
      dataIndex: 'title'
    }, {
      title: '原唱',
      dataIndex: 'originSinger'
    }, {
      title: '演唱',
      dataIndex: 'singer'
    }, {
      title: '发行时间',
      dataIndex: 'publishTime'
    }, {
      title: '来源',
      dataIndex: 'source',
    }, {
      title: '喜爱程度',
      dataIndex: 'star'
    }
  ]

  onTableChange = (pagination) => {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.page = pagination.current
  }

  render () {
    const { dataSource } = this.state
    console.log('dataSource', dataSource)

    const pagination = {
      current: this.pagination.page,
      pageSize: this.pagination.pageSize,
      total: this.pagination.pageSize,
      showSizeChanger: true,
    }

    return (
      <div className={style.musicList}>
        <Query />
        <Table
          pagination={pagination}
          dataSource={dataSource}
          onChange={this.onTableChange}
          columns={this.columns}
        />
      </div>
    ) 
  }
}

export default MusicList

