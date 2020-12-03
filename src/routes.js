import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import './assets/style/style.css';
import './assets/style/media.css';

import Home from './components/Home';
import Startups from './components/Startups';
import About from './components/About';
import Layout from './layout';
import EmptyPage from './components/Hoc/404';
import PrivateRoute from './components/Hoc/PrivateRoute';
import Account from './components/Account';
import UserActivation from './components/Hoc/UserActivation';
import PasswordReset from './components/Hoc/PasswordReset';

function Routes() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/startups' component={Startups} />
          <Route path='/about' component={About} />
          <Route path='/user/activation' component={UserActivation} />
          <Route path='/user/forgot-password' component={PasswordReset} /> 
          <PrivateRoute path='/account/:id' component={Account} />
          <Route component={EmptyPage} />
        </Switch>
      </Layout>
    </>
  );
}

export default Routes;
