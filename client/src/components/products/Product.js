import React, {Component} from 'react';
import ProductDeatils from './ProductDetails';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart, removeProduct} from '../../store/actions/projectActions';
import defaultImage from '../../assets/default.png';
import AgeConvertor from '../common/AgeConvertor';
import './product.css';

class Product extends Component {
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
                    className='btn btn-outline-danger mb-3'
                    onClick={() => removeProduct(id)}
                >
                    Remove from Cart
                </button>
            );
        } else {
            return (
                <button
                    className='btn btn-outline-success mb-3'
                    onClick={this.handleClick}
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
            image,
        } = this.props.products;
        return (
            <div>
                <div className='card product text-center'>
                    {/* id cant be just a number so I added a letter before the id number */}
                    <div data-toggle='modal' data-target={'#A' + id}>
                        <img
                            className='card-img-top'
                            src={image ? image : defaultImage}
                            alt='ProductImage'
                        />
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>Breed: {breed}</li>
                            <li className='list-group-item'>
                                Age : {AgeConvertor(dateOfBirth)}
                            </li>
                            <li className='list-group-item'>Sex: {sex}</li>
                            <li className='list-group-item'>
                                Weight: {weight / 1000}
                            </li>
                        </ul>
                    </div>
                    <div className='card-body'>
                        {this.cartButton(id)}
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
                <ProductDeatils products={this.props.products} />
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
)(Product);
