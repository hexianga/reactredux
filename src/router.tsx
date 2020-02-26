import React from 'react';
import LoadableComponent from './loadable'
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '@net/history'

const HomePage = LoadableComponent(() => import(/* webpackChunkName: 'antdlayout' */ 'modules/antdlayout'))  as any
const Event = LoadableComponent(() => import(/* webpackChunkName: 'event' */ 'modules/event'))  as any
const WebSocketTest = LoadableComponent(() => import(/* webpackChunkName: 'websocket' */ 'modules/websocket'))  as any
const Preview = LoadableComponent(() => import(/* webpackChunkName: 'preview' */ 'modules/preview'))  as any
const CartAnimation = LoadableComponent(() => import(/* webpackChunkName: 'cartanimation' */ 'modules/cartanimation'))  as any
const ReactList = LoadableComponent(() => import(/* webpackChunkName: 'reactList' */ 'modules/reactList'))  as any
const Demo = LoadableComponent(() => import(/* webpackPrefetch: true */ /* webpackChunkName: 'demo' */ 'modules/demo'))  as any
const Home = LoadableComponent(() => import(/* webpackChunkName: 'home' */ 'modules/index')) as any

class AppComponent extends React.Component<any, any> {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/layout" component={HomePage} />
          <Route path="/event" component={Event} />
          <Route path="/websocket" component={WebSocketTest} />
          <Route path="/preview" component={Preview} />
          <Route path="/cartanimation" component={CartAnimation} />
          <Route path="/reactList" component={ReactList} />
          <Route path="/demo" component={Demo} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

// 返回函数式组件
export default AppComponent;
