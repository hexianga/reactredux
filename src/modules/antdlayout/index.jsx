import React, { Component } from 'react'
import {
  Layout, Button, Menu, Icon, Row, Col
} from 'antd'
import './index.scss';

const { Sider, Header, Content } = Layout;
const { SubMenu } = Menu;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    }
  }

  toggle = () => {
    const { collapse } = this.state
    this.setState({
      collapse: !collapse,
    })
  }

  render() {
    const { collapse } = this.state
    return (
      <Layout>
        <Sider
          collapsible={true}
          collapsed={collapse}
          onCollapse={this.toggle}
        >
          <div className="logo-container">
            <div className="logo" />
            <h2 className="logo-title" style={{ display: collapse ? 'none' : 'block' }}>hacker</h2>
          </div>
          <Menu
            theme="dark"
            style={{ height: '100vh' }}
            mode="inline"
          >
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={(
                <span>
                  <Icon type="appstore" />
                  <span>Navigation Three</span>
                </span>
              )}
            >
              <Menu.Item key="9">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
              <SubMenu key="sub1-2" title="Submenu">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }}>
            <h2>Header</h2>
          </Header>
          <Content style={{ marginTop: '20px', paddingLeft: '20px' }}>
            <h2>Content</h2>
            <Row style={{ background: 'blue' }}>
              <Col xs={12} sm={8} md={6} lg={4} xl={2} style={{ background: 'red' }}>Col</Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default HomePage
