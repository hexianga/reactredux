import React, { Component } from 'react'

class WebSocketTest extends Component {
  socket = null
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8181?at=hexiangfirst");
    
    this.socket.onopen = () => {
      console.log('connection successful');
    };

    this.socket.onmessage = function (event) {
      console.log(JSON.parse(event.data));
    };

    this.socket.onerror = function (error) {
      console.log('error', error);
    };

    this.socket.onclose = function (close) {
      console.log('close', close);
    };

  }

  sendMessage = () => {
    this.socket.send(JSON.stringify({
      at: 'hexiangfirst',
      data: `react redux send message `
    }))
  }

  closeConnection = () => {
    this.socket.close()
  }

  render() {
    return (
      <div>
        <button onClick={this.sendMessage}>点击发送数据</button>
        <button onClick={this.closeConnection}>点击关闭socket连接</button>
      </div>
    )
  }
}

export default WebSocketTest
