import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCheckoutList} from '../../store/actions/projectActions';
import {logoutUser} from '../../store/actions/userAction';

class navbar extends Component {
    componentWillMount() {
        // calling this function will make sure the navbar is always updated when a user add a product to cart
        this.props.getCheckoutList();
    }
    handleClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const {checkoutList, user} = this.props;
        const adminLinks = (
            <Fragment>
                <li
                    className='nav-item'
                    data-toggle='collapse'
                    data-target='.navbar-collapse.show'
                >
                    <Link className='nav-link' to={'/createProduct'}>
                        New Product
                    </Link>
                </li>
                <li
                    className='nav-item'
                    data-toggle='collapse'
                    data-target='.navbar-collapse.show'
                >
                    <Link className='nav-link' to={'/orders'}>
                        Orders
                    </Link>
                </li>
                <li
                    className='nav-item'
                    data-toggle='collapse'
                    data-target='.navbar-collapse.show'
                >
                    <Link className='nav-link' to={'/register'}>
                        Register
                    </Link>
                </li>

                <li
                    className='nav-item'
                    data-toggle='collapse'
                    data-target='.navbar-collapse.show'
                >
                    <Link
                        className='nav-link'
                        to={'/'}
                        onClick={this.handleClick}
                    >
                        Logout
                    </Link>
                </li>
            </Fragment>
        );
        return (
            <nav className='navbar navbar-expand-lg navbar-dark fixed-top'>
                <div className='container'>
                    <Link className='navbar-brand' to={'/'}>
                        LOGO
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarContent'
                        aria-controls='navbarContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon' />
                    </button>

                    <div
                        className='collapse navbar-collapse '
                        id='navbarContent'
                    >
                        <ul className='navbar-nav ml-auto'>
                            <li
                                className='nav-item'
                                data-toggle='collapse'
                                data-target='.navbar-collapse.show'
                            >
                                <Link className='nav-link' to={'/'}>
                                    Products
                                </Link>
                            </li>

                            <li
                                className='nav-item'
                                data-toggle='collapse'
                                data-target='.navbar-collapse.show'
                            >
                                <Link className='nav-link' to={'/checkout'}>
                                    Checkout{' '}
                                    {checkoutList.length !== 0 && (
                                        <span>({checkoutList.length})</span>
                                    )}
                                </Link>
                            </li>
                            <li
                                className='nav-item'
                                data-toggle='collapse'
                                data-target='.navbar-collapse.show'
                            >
                                <Link className='nav-link' to={'/contact'}>
                                    Contact
                                </Link>
                            </li>
                            <li
                                className='nav-item'
                                data-toggle='collapse'
                                data-target='.navbar-collapse.show'
                            >
                                <Link className='nav-link' to={'/about'}>
                                    About
                                </Link>
                            </li>
                            {user.isAuthenticated ? (
                                adminLinks
                            ) : (
                                <li
                                    className='nav-item'
                                    data-toggle='collapse'
                                    data-target='.navbar-collapse.show'
                                >
                                    <Link className='nav-link' to={'/login'}>
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        checkoutList: state.project.checkout,
        user: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCheckoutList: () => dispatch(getCheckoutList()),
        logoutUser: () => dispatch(logoutUser()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(navbar);
