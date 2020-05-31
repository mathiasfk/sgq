import React from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect } from "react-router-dom";
//import { connect } from 'react-redux';

//import { userActions } from '../_actions';

// core components
import { LoginPage } from 'views/Login/Login';
import { RegisterPage } from 'views/Register/Register';

export default function LoginLayout () {

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}