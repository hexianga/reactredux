import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import { requestText } from './service'
import TestMarkown from '../../../assets/test.md'

class Container extends Component {
  state = {
    markdown: '',
  }

  async componentDidMount() {
    const text = await requestText(TestMarkown);
    this.setState({ markdown: text });
  }

  render() {
    const { markdown } = this.state;
    return (
      <ReactMarkdown
        source={markdown}
      />
    )
  }
}

export default Container;
