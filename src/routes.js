import React from 'react';
import { Switch, Route } from 'react-router';

import './assets/style/style.css';

import Home from './components/Home';
import Startups from './components/Startups';
import About from './components/About';

function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/startups' component={Startups}/>
      <Route path='/about' component={About}/>
    </Switch>
  );
}

export default Routes;
