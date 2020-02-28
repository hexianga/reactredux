import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MusicList from '@pages/musics';
import DayReport from '@pages/day-report';
import Article from '../article';
import ArticleList from '../articleList';

export default ({ match }) => {
  const path = match.path.replace(/\/$/g, '')
  return (
    <>
      <Switch>
        <Route path={`${path}/dayreport`} component={DayReport} />
        <Route path={`${path}/musics`} component={MusicList} />
        <Route path={`${path}/article/:id`} component={Article} />
        <Route path={`${path}/:id`} component={ArticleList} />
      </Switch>
    </>
  )
}
