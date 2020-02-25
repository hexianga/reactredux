import React from 'react';
import LoadableComponent from './loadable'
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './utils/history'

const HomeContainer = LoadableComponent(() => import(/* webpackChunkName: 'home' */ 'modules/home'))
const HomePage = LoadableComponent(() => import(/* webpackChunkName: 'antdlayout' */ 'modules/antdlayout'))
const Event = LoadableComponent(() => import(/* webpackChunkName: 'event' */ 'modules/event'))
const WebSocketTest = LoadableComponent(() => import(/* webpackChunkName: 'websocket' */ 'modules/websocket'))
const Preview = LoadableComponent(() => import(/* webpackChunkName: 'preview' */ 'modules/preview'))
const CartAnimation = LoadableComponent(() => import(/* webpackChunkName: 'cartanimation' */ 'modules/cartanimation'))
const ReactList = LoadableComponent(() => import(/* webpackChunkName: 'reactList' */ 'modules/reactList'))
const Demo = LoadableComponent(() => import(/* webpackPrefetch: true */ /* webpackChunkName: 'demo' */ 'modules/demo'))
const Home = LoadableComponent(() => import(/* webpackChunkName: 'home' */ 'modules/index'))

function AppComponent() {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={HomeContainer} /> */}
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

// 返回函数式组件
export default AppComponent;
