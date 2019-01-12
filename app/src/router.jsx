import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeContainer from 'modules/home/homeContainer';
import HomePage from 'modules/antdlayout/index';
import Event from 'modules/event/index';

function AppComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/layout" component={HomePage} />
        <Route path="/event" component={Event} />
      </Switch>
    </Router>
  );
}

// 返回函数式组件
export default AppComponent;
