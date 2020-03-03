// @ts-nocheck
import React from 'react'
import { Table, message } from 'antd'
import Api from 'net/create-request'
import Query from './query'
import style from './style.scss'

class MusicList extends React.Component<any, any> {
  state = {
    dataSource: [],
  }

  pagination = {
    page: 1,
    pageSize: 20,
    total: 0,
  }

  columns: Array<object> = [
    {
      width: 0,
      title: 'id',
      dataIndex: 'id'
    }, {
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

  componentDidMount(): void {
    this.getMusicList()
  }

  getMusicList = async (params = {}): Promise<any> => {
    try {
      const response = await Api.music.list({
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        ...params,
      })
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

  onTableChange = (pagination): void => {
    this.pagination.pageSize = pagination.pageSize
    this.pagination.page = pagination.current
  }

  render(): JSX.Element {
    const { dataSource } = this.state

    const pagination = {
      current: this.pagination.page,
      pageSize: this.pagination.pageSize,
      total: this.pagination.pageSize,
      showSizeChanger: true,
    }

    return (
      <div className="paeg-body">
        <div className={style.musicList}>
          <Query getMusicList={this.getMusicList} />
          <div className="content-table">
            <Table
              rowKey="id"
              pagination={pagination}
              dataSource={dataSource}
              onChange={this.onTableChange}
              columns={this.columns}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MusicList
