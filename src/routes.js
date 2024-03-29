import React from 'react';
import { Switch, Route } from 'react-router';

import './assets/style/theme.css';
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
import SingleStartup from './components/Startups/Single';
import Contact from './components/Contact';
import Blog from './components/Blog';
import SingleBlog from './components/Blog/single';

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/blog' exact component={Blog} />
        <Route path='/blog/single/:id' exact component={SingleBlog} />
        <Route path='/startups' exact component={Startups} />
        <Route path='/single/:name' exact component={SingleStartup} />
        <Route path='/about' exact component={About} />
        <Route path='/user/activation' exact component={UserActivation} />
        <Route path='/user/forgot-password' exact component={PasswordReset} />
        <PrivateRoute path='/account/:id' exact component={Account} />
        <PrivateRoute path='/account/startups/:name' exact component={SingleStartup} />
        <Route component={EmptyPage} />
      </Switch>
    </Layout>
  );
}

export default Routes;
