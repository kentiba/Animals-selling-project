import React, {Component} from 'react';
import {loginUser} from '../../store/actions/userAction';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import './auth.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {},
    };

    componentDidMount() {
        if (this.props.user.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        const User = {email, password};
        this.props.loginUser(User);
    };
    render() {
        const {errors} = this.state;
        return (
            <div className='container text-center py-5 mt-3'>
                <div className='row login-container'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form onSubmit={this.handleSubmit}>
                            <h1 className='h1 mb-3 font-weight-normal elegantshadow'>
                                Admin
                            </h1>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className={classnames(
                                        'form-control form-control-lg',
                                        {
                                            'is-invalid': errors.email,
                                        },
                                    )}
                                    name='email'
                                    onChange={this.handleChange}
                                />
                                {errors.email && (
                                    <div className='invalid-feedback'>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    className={classnames(
                                        'form-control form-control-lg',
                                        {
                                            'is-invalid': errors.password,
                                        },
                                    )}
                                    name='password'
                                    onChange={this.handleChange}
                                />
                                {errors.password && (
                                    <div className='invalid-feedback'>
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        errors: state.errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Login));
