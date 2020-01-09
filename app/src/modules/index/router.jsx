import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Article from '../article';
import ArticleList from '../articleList';

export default ({ match }) => {
  const path = match.path.replace(/\/$/g, '')
  return (
    <>
      <Switch>
        <Route path={`${path}/article/:id`} component={Article} />
        <Route path={`${path}/:id`} component={ArticleList} />
      </Switch>
    </>
  )  
}