import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { LoginPage } from 'views/Login/Login';
import { RegisterPage } from 'views/Register/Register';

// style
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { CssBaseline } from '@material-ui/core';

class LoginLayout extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert, classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <CssBaseline/>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Switch>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </Switch>
                        </Grid>
                        <Grid item xs={12}>
                            <Container component="main" maxWidth="xs">
                            {
                            alert.message && 
                                <Alert severity={`${alert.type}`}>{alert.message}</Alert>
                            }
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(withStyles(styles)(LoginLayout));
export { connectedApp as LoginLayout };