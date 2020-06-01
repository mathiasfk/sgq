import React from 'react';
import { Link } from 'react-router-dom';
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

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering, classes } = this.props;
        const { user, submitted } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h2" align="center">Cadastro</Typography>
                <form className={classes.form} noValidate name="form" onSubmit={this.handleSubmit}>
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Nome"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            name="firstName" 
                            value={user.firstName} 
                            onChange={this.handleChange}
                        />
                        { submitted && !user.firstName &&
                            <Alert severity="info">Nome é necessário</Alert>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Sobrenome"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                            name="lastName" 
                            value={user.lastName} 
                            onChange={this.handleChange}
                        />
                        { submitted && !user.lastName &&
                            <Alert severity="info">Sobrenome é necessário</Alert>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nome de usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            name="username" 
                            value={user.username} 
                            onChange={this.handleChange}
                        />
                        { submitted && !user.username &&
                            <Alert severity="info">Nome de usuário é necessário</Alert>
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
                            value={user.password}
                            onChange={this.handleChange}
                        />
                        { submitted && !user.password &&
                            <Alert severity="info">Senha é necessária</Alert>
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
                            Cadastrar
                        </Button>
                    </Grid>
                    <Grid container item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            href="/login"
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Container>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(withStyles(styles)(RegisterPage));
export { connectedRegisterPage as RegisterPage };