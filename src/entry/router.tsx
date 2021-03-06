import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history'
import LoadableComponent from './loadable'

const HomePage = LoadableComponent(() => import(/* webpackChunkName: 'antdlayout' */ 'modules/antdlayout')) as any
const Event = LoadableComponent(() => import(/* webpackChunkName: 'event' */ 'modules/event')) as any
const WebSocketTest = LoadableComponent(() => import(/* webpackChunkName: 'websocket' */ 'modules/websocket')) as any
const Preview = LoadableComponent(() => import(/* webpackChunkName: 'preview' */ 'modules/preview')) as any
const CartAnimation = LoadableComponent(() => import(/* webpackChunkName: 'cartanimation' */ 'modules/cartanimation')) as any
const ReactList = LoadableComponent(() => import(/* webpackChunkName: 'reactList' */ 'modules/reactList')) as any
const Demo = LoadableComponent(() => import(/* webpackPrefetch: true */ /* webpackChunkName: 'demo' */ 'modules/demo')) as any
const Layout = LoadableComponent(() => import(/* webpackChunkName: 'home' */ './layout')) as any

class AppComponent extends React.Component<any, any> {
  componentDidMount(): void {

  }

  render(): JSX.Element {
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
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    );
  }
}

// 返回函数式组件
export default AppComponent;
