import React, {Component} from 'react';
import Product from './Product';
import {connect} from 'react-redux';
import {getProductList} from '../../store/actions/projectActions';
import Loading from '../../assets/loading.gif';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class ProductList extends Component {
    state = {
        products: [],
        currentPage: 1,
        productsPerPage: 2,
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.cows,
        });
    }
    componentDidMount() {
        this.props.getProductList();
    }

    handleChange = page => {
        this.setState({
            currentPage: page,
        });
    };

    render() {
        const {products, currentPage, productsPerPage} = this.state;

        // Logic for displaying products
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProduct = products.slice(
            indexOfFirstProduct,
            indexOfLastProduct,
        );

        const renderProducts = currentProduct.map((product, index) => {
            return <Product key={index} cow={product} />;
        });

        // Logic for displaying page numbers
        const renderPageNumbers = (
            <Pagination
                onChange={this.handleChange}
                current={this.state.currentPage}
                total={products.length}
                pageSize={productsPerPage}
            />
        );

        return (
            <div className='py-5 mt-3'>
                <ul className='pagination justify-content-center'>
                    {renderProducts.length !== 0 && renderPageNumbers}
                </ul>
                <div className='row justify-content-center'>
                    {renderProducts.length !== 0 ? (
                        renderProducts
                    ) : (
                        <img src={Loading} alt='loading' />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cows: state.project.cowsList,
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
