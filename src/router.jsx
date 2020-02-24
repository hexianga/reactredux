import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import HomeContainer from 'modules/home';
import HomePage from 'modules/antdlayout';
import Event from 'modules/event';
import WebSocketTest from 'modules/websocket';
import Preview from 'modules/preview';
import CartAnimation from 'modules/cartanimation';
import ReactList from 'modules/reactList';
import Demo from 'modules/demo';
import Home from 'modules/index';
import { history } from './utils/history'

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
