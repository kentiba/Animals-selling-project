import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    getCheckoutList,
    removeProduct,
    submitRequest,
} from '../../store/actions/projectActions';
import defaultImage from '../../assets/default.png';
import Spinner from '../../assets/loading.gif';
import './checkout.css';
import AgeConvertor from '../common/AgeConvertor';

class Checkout extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        note: '',
        spinner: false,
    };

    componentDidMount() {
        this.props.getCheckoutList();
    }

    handleClick = id => {
        this.props.removeProduct(id);
    };
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({spinner: true});
        const info = [this.state, this.props.checkoutList];
        this.props.submitRequest(info, this.props.history);
    };

    //for the spinner
    toggleSpinner = () => {
        if (
            this.state.spinner === true &&
            Object.keys(this.props.errors).length === 0
        ) {
            return (
                <div>
                    <img
                        src={Spinner}
                        alt='spinner'
                        style={{
                            position: 'absolute',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            left: 0,
                            right: 0,
                            width: '25vw',
                            height: 'auto',
                        }}
                    />
                </div>
            );
        }
        return null;
    };

    render() {
        const {checkoutList, errors} = this.props;
        const renderList = checkoutList.map(item => {
            const weight = item.weight / 1000;
            return (
                <tr key={item.id} className='checkout'>
                    <td>
                        <img
                            src={item.image ? item.image : defaultImage}
                            alt='productPicture'
                            width={75}
                            height={75}
                        />
                    </td>
                    <td>{AgeConvertor(item.age)}</td>
                    <td>{weight}</td>
                    <td>{item.sex}</td>
                    <td>{item.breed}</td>
                    <td>{item.location}</td>

                    <td>
                        <button
                            className='btn btn-outline-danger'
                            onClick={() => this.handleClick(item.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
        return (
            <div className='container py-5 mt-3'>
                <div className='text-center'>
                    <h1>Checkout </h1>
                    <div className='table-responsive'>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>Image</th>
                                    <th scope='col'>Age</th>
                                    <th scope='col'>Weight</th>
                                    <th scope='col'>Sex</th>
                                    <th scope='col'>Breed</th>
                                    <th scope='col'>Location</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>
                            <tbody>{renderList}</tbody>
                        </table>
                    </div>
                    <div>
                        {checkoutList.length === 0 && <p>No item was added</p>}
                    </div>
                </div>
                {checkoutList.length !== 0 && (
                    <div className='text-center'>
                        <h5>
                            Please write your information below so we can
                            contact you as soon as possible
                        </h5>
                        {/* show only if errors exist */}
                        {Object.keys(errors).length > 0 && (
                            <div className='alert alert-danger'>
                                <p>
                                    we encountered an error while processing
                                    your request, please refresh the page and
                                    try again
                                </p>
                            </div>
                        )}
                        {/* Spinner */}
                        {this.toggleSpinner()}
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    className='form-control w-50 m-auto'
                                    id='name'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className='form-control w-50 m-auto'
                                    id='email'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>Phone number</label>
                                <input
                                    type='number'
                                    className='form-control w-50 m-auto'
                                    id='phone'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='note'>
                                    Any additional request ?
                                </label>
                                <textarea
                                    className='form-control w-50 m-auto'
                                    id='note'
                                    rows='3'
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button
                                className='btn btn-outline-success m-auto'
                                type='submit'
                            >
                                Submit My Order
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        checkoutList: state.project.checkout,
        errors: state.errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCheckoutList: () => dispatch(getCheckoutList()),
        removeProduct: id => dispatch(removeProduct(id)),
        submitRequest: (info, history) =>
            dispatch(submitRequest(info, history)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Checkout));
