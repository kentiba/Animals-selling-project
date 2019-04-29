import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from './Product';
import {getProductList} from '../../store/actions/projectActions';
import SearchField from '../searchField/SearchField';
import Pagination from '../pagination/Pagination';
import './product.css';

const initialStateProducts = [];

class ProductList extends Component {
    state = {
        products: initialStateProducts,
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products,
        });
    }
    componentDidMount() {
        this.props.getProductList();
    }

    render() {
        const {products} = this.state;
        if (products === initialStateProducts) {
            return (
                <div className='row serverError'>
                    <h1>
                        There is an error in the server. Please refresh the page
                        or try later
                    </h1>
                </div>
            );
        }

        const renderProducts = products.map((product, index) => {
            return <Product key={index} products={product} />;
        });
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12 paginationBar'>
                        <Pagination />
                    </div>
                    <div className='col-md-12 col-lg-3 searchBar'>
                        <SearchField />
                    </div>
                    <div className='col-md-12 col-lg-9 productCards'>
                        <div className='row justify-content-center'>
                            {renderProducts.length !== 0 ? (
                                renderProducts
                            ) : (
                                <div className='no-products'>
                                    <h1>
                                        There are no products matching your
                                        requst. Please refresh the page or
                                        change your search parameters
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.project.productsList,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getProductList: () => dispatch(getProductList()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductList);
