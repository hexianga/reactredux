import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeContainer from 'modules/home/homeContainer';
import HomePage from 'modules/antdlayout/index';
import Event from 'modules/event/index';
import WebSocketTest from 'modules/websocket/index';
import Preview from 'modules/preview/index';
import CartAnimation from 'modules/cartanimation/index';

function AppComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/layout" component={HomePage} />
        <Route path="/event" component={Event} />
        <Route path="/websocket" component={WebSocketTest} />
        <Route path="/preview" component={Preview} />
        <Route path="/cartanimation" component={CartAnimation} />
      </Switch>
    </Router>
  );
}

// 返回函数式组件
export default AppComponent;
