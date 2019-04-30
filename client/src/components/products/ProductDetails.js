import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart, removeProduct} from '../../store/actions/projectActions';
import defaultImage from '../../assets/default.png';
import AgeConvertor from '../common/AgeConvertor';
import dayjs from 'dayjs';
import './product.css';

class ProductDeatils extends Component {
    handleClick = e => {
        e.preventDefault();
        const {products, addToCart} = this.props;
        addToCart(products);
    };
    cartButton = id => {
        const {checkout, removeProduct} = this.props;
        if (checkout.find(product => product.id === id)) {
            return (
                <button
                    className='btn btn-outline-danger'
                    onClick={() => removeProduct(id)}
                    data-dismiss='modal'
                >
                    Remove from Cart
                </button>
            );
        } else {
            return (
                <button
                    className='btn btn-outline-success'
                    onClick={this.handleClick}
                    data-dismiss='modal'
                >
                    Add to Cart
                </button>
            );
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
                            alt='ProductImage'
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
                            {this.cartButton(id)}
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
        removeProduct: id => dispatch(removeProduct(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDeatils);
