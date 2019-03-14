import React, {Component} from 'react';
import './product.css';
import ProductDeatils from './ProductDetails';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart} from '../../store/actions/projectActions';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import defaultImage from '../../assets/default.png';
class Product extends Component {
    handleClick = e => {
        e.preventDefault();
        const {cow, addToCart, checkout} = this.props;
        if (checkout.find(prod => prod.id === cow.id)) {
            confirmAlert({
                customUI: ({onClose}) => {
                    return (
                        <div className='custom-ui'>
                            <h1>
                                This product has already been added to checkout
                            </h1>
                            <button
                                type='button'
                                className='btn btn-outline-danger'
                                onClick={onClose}
                            >
                                Ok
                            </button>
                        </div>
                    );
                },
            });
        } else {
            addToCart(cow);
        }
    };
    render() {
        const {id, weight, age, sex, breed, image} = this.props.cow;
        return (
            <div>
                <div className='card product text-center p-3 m-3'>
                    {/* id cant be just a number so I added a letter before the id number */}
                    <div data-toggle='modal' data-target={'#A' + id}>
                        <img
                            className='card-img-top'
                            src={image ? image : defaultImage}
                            alt='Card cap'
                        />
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>Breed: {breed}</li>
                            <li className='list-group-item'>Age: {age}</li>
                            <li className='list-group-item'>Sex: {sex}</li>
                            <li className='list-group-item'>
                                Weight: {weight / 1000}
                            </li>
                        </ul>
                    </div>
                    <div className='card-body'>
                        <button
                            className='btn btn-outline-success mb-3'
                            onClick={this.handleClick}
                        >
                            Add to Cart
                        </button>
                        <br />
                        {this.props.user.isAuthenticated && (
                            <Link
                                to={'/editProduct/' + id}
                                className='btn btn-outline-warning'
                            >
                                Edit
                            </Link>
                        )}
                    </div>
                </div>

                {/* modal */}
                <ProductDeatils cow={this.props.cow} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        checkout: state.project.checkout,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: product => dispatch(addToCart(product)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Product);
