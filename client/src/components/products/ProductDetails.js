import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../../store/actions/projectActions';
import {confirmAlert} from 'react-confirm-alert';
import defaultImage from '../../assets/default.png';
import AgeConvertor from '../common/AgeConvertor';
import dayjs from 'dayjs';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './product.css';

class ProductDeatils extends Component {
    handleClick = e => {
        e.preventDefault();
        const {products, addToCart, checkout} = this.props;
        if (checkout.find(prod => prod.id === products.id)) {
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
            addToCart(products);
        }
    };
    render() {
        const {
            id,
            weight,
            dateOfBirth,
            sex,
            breed,
            location,
            description,
            image,
            created,
        } = this.props.products;

        return (
            <div
                className='modal fade'
                id={'A' + id}
                tabIndex='-1'
                role='dialog'
                aria-hidden='true'
            >
                <div
                    className='modal-dialog text-center productDetail'
                    role='document'
                >
                    <div className='modal-content'>
                        <img
                            className='card-img-top'
                            src={image ? image : defaultImage}
                            alt='Card cap'
                        />

                        <div className='modal-body'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    Breed: {breed}
                                </li>
                                <li className='list-group-item'>
                                    Age : {AgeConvertor(dateOfBirth)}
                                </li>
                                <li className='list-group-item'>Sex: {sex}</li>
                                <li className='list-group-item'>
                                    Weight: {weight / 1000}
                                </li>
                                <li className='list-group-item'>
                                    Location: {location}
                                </li>
                                <li className='list-group-item'>
                                    Description:{' '}
                                    {description
                                        ? description
                                        : 'No description'}
                                </li>
                                <li className='list-group-item'>
                                    Posted on:{' '}
                                    {dayjs(created).format('MMM DD YYYY')}
                                </li>
                            </ul>
                        </div>
                        <div className='modal-footer justify-content-around'>
                            <button
                                type='button'
                                className='btn btn-outline-danger'
                                data-dismiss='modal'
                            >
                                Close
                            </button>
                            <button
                                type='button'
                                className='btn btn-outline-success'
                                onClick={this.handleClick}
                                data-dismiss='modal'
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
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
)(ProductDeatils);
