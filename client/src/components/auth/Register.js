import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/userAction';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        errors: {},
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {email, username, password, password2} = this.state;

        const user = {
            username,
            email,
            password,
            password2,
        };
        this.props.registerUser(user, this.props.history);
    };

    render() {
        const {errors} = this.state;
        return (
            <div className='container text-center py-5 mt-3'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form onSubmit={this.handleSubmit}>
                            <h1 className='h1 mb-3 font-weight-normal elegantshadow'>
                                Register A New Admin
                            </h1>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <input
                                    type='text'
                                    className={classnames(
                                        'form-control form-control-lg',
                                        {
                                            'is-invalid': errors.username,
                                        },
                                    )}
                                    name='username'
                                    onChange={this.handleChange}
                                />
                                {errors.username && (
                                    <div className='invalid-feedback'>
                                        {errors.username}
                                    </div>
                                )}
                            </div>
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
                            <div className='form-group'>
                                <label htmlFor='password2'>
                                    Confirmed Password
                                </label>
                                <input
                                    type='password'
                                    className={classnames(
                                        'form-control form-control-lg',
                                        {
                                            'is-invalid': errors.password2,
                                        },
                                    )}
                                    name='password2'
                                    onChange={this.handleChange}
                                />
                                {errors.password2 && (
                                    <div className='invalid-feedback'>
                                        {errors.password2}
                                    </div>
                                )}
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Register
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
        errors: state.errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user, history) => dispatch(registerUser(user, history)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Register));
