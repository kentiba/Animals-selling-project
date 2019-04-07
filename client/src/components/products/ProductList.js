import React, {Component} from 'react';
import Product from './Product';
import {connect} from 'react-redux';
import {getProductList} from '../../store/actions/projectActions';
import SearchField from '../searchField/SearchField';

class ProductList extends Component {
    state = {
        products: [],
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.cows,
        });
    }
    componentDidMount() {
        this.props.getProductList();
    }
    render() {
        const {products} = this.state;
        const renderProducts = products.map((product, index) => {
            return <Product key={index} cow={product} />;
        });
        return (
            <div className='py-5 mt-3'>
                <SearchField />
                <div className='row justify-content-center'>
                    {renderProducts.length !== 0 ? (
                        renderProducts
                    ) : (
                        <div className='no-products'>
                            <h1>
                                There are no products matching your requst.
                                Please refresh the page or change your search
                                parameters
                            </h1>
                        </div>
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
