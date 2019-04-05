import React, {Component} from 'react';
import Product from './Product';
import {connect} from 'react-redux';
import {getProductList} from '../../store/actions/projectActions';
import Loading from '../../assets/loading.gif';
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
