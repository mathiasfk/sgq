/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

// core components
import Admin from "layouts/Admin.js";
import { LoginLayout } from "layouts/LoginLayout.js";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import { history } from './_helpers';
import { store } from './_helpers';
import { PrivateRoute } from './_components';

import config from 'react-global-configuration';

config.set({'apiUrl': process.env.REACT_APP_API_URL || 'http://localhost:3000'});


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/register" component={LoginLayout} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect from="*" to="/admin" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
