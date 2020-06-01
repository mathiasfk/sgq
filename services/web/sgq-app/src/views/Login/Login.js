import React from 'react';
import { connect } from 'react-redux';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// helpers
import { userActions } from '../../_actions';

// style
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn, classes } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h2" align="center">Login</Typography>
                <form className={classes.form} noValidate name="form" onSubmit={this.handleSubmit}>
                    <Grid container xs={12} spacing={1}>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            name="username" 
                            value={username} 
                            onChange={this.handleChange}
                        />
                        { submitted && !username &&
                            <Alert severity="warning">Usuário é necessário</Alert>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={this.handleChange}
                        />
                        { submitted && !password &&
                            <Alert severity="warning">Senha é necessária</Alert>
                        }
                        </Grid>
                        <Grid container item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Entrar
                            </Button>
                        </Grid>
                        <Grid container item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                href="/register"
                            >
                                Cadastrar
                            </Button>
                        </Grid>
                        {
                            alert.message &&
                            <Alert severity="error">{alert.message}</Alert>
                        }
                    </Grid>
                </form>
            </Container>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
}

const connectedLoginPage = connect(mapState, actionCreators)(withStyles(styles)(LoginPage));
export { connectedLoginPage as LoginPage };