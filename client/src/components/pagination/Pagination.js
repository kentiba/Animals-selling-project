import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductList} from '../../store/actions/projectActions';
import './pagination.css';

class Pagination extends Component {
    handleClick = e => {
        e.preventDefault();
        const pageNumber = e.target.value;

        const {
            ageFrom,
            ageTo,
            weightFrom,
            weightTo,
            location,
            breed,
        } = this.props.pagination;

        this.props.getProductList(
            ageFrom,
            ageTo,
            weightFrom,
            weightTo,
            location,
            breed,
            pageNumber,
        );
    };
    render() {
        const {
            hasNextPage,
            hasPreviousPage,
            nextPage,
            currentPage,
            lastPage,
            previousPage,
            lastPageBox,
            firstPageBox,
        } = this.props.pagination;
        return (
            <React.Fragment>
                {this.props.products.length > 0 && (
                    <ul className='pagination'>
                        {firstPageBox && (
                            <li value={1} onClick={this.handleClick}>
                                1
                            </li>
                        )}
                        {hasPreviousPage && (
                            <li value={previousPage} onClick={this.handleClick}>
                                {previousPage}
                            </li>
                        )}
                        <li
                            value={currentPage}
                            onClick={this.handleClick}
                            className='active'
                        >
                            {currentPage}
                        </li>
                        {hasNextPage && (
                            <li value={nextPage} onClick={this.handleClick}>
                                {nextPage}
                            </li>
                        )}
                        {lastPageBox && (
                            <li value={lastPage} onClick={this.handleClick}>
                                {lastPage}
                            </li>
                        )}
                    </ul>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        pagination: state.project.pagination,
        products: state.project.productsList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductList: (
            ageFrom,
            ageTo,
            weightFrom,
            weightTo,
            location,
            breed,
            pageNumber,
        ) =>
            dispatch(
                getProductList(
                    ageFrom,
                    ageTo,
                    weightFrom,
                    weightTo,
                    location,
                    breed,
                    pageNumber,
                ),
            ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Pagination);
