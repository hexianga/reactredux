import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeContainer from 'modules/home/homeContainer';

function AppComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
      </Switch>
    </Router>
  );
}

// 返回函数式组件
export default AppComponent;
