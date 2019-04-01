import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductList} from '../../store/actions/projectActions';
import './searchField.css';

const gramPerKilo = 1000;

class SearchField extends Component {
    state = {
        ageFromyy: '',
        ageFrommm: '',
        ageFromdd: '',
        ageToyy: '',
        ageTomm: '',
        ageTodd: '',
        weightFrom: '',
        weightTo: '',
        location: '',
        breed: '',
        pageNumber: 1,
    };

    // componentDidMount() {
    //     this.props.getProductList();
    // }

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    handleClick = e => {
        e.preventDefault();
        const pageNumber = e.target.value;

        const {
            ageFromyy,
            ageFrommm,
            ageFromdd,
            ageToyy,
            ageTomm,
            ageTodd,
            weightFrom,
            weightTo,
            location,
            breed,
        } = this.state;

        const currentDate = new Date();
        const ageFrom =
            ageFromyy || ageFrommm || ageFromdd
                ? new Date(
                      currentDate.getFullYear() - ageFromyy,
                      currentDate.getMonth() - ageFrommm,
                      currentDate.getDate() - ageFromdd,
                  )
                : '';
        const ageTo =
            ageToyy || ageTomm || ageTodd
                ? new Date(
                      currentDate.getFullYear() - ageToyy,
                      currentDate.getMonth() - ageTomm,
                      currentDate.getDate() - ageTodd,
                  )
                : '';

        this.props.getProductList(
            ageFrom,
            ageTo,
            weightFrom ? weightFrom * gramPerKilo : '',
            weightTo ? weightTo * gramPerKilo : '',
            location,
            breed,
            pageNumber,
        );
    };
    handleSubmit = e => {
        e.preventDefault();
        const {
            ageFromyy,
            ageFrommm,
            ageFromdd,
            ageToyy,
            ageTomm,
            ageTodd,
            weightFrom,
            weightTo,
            location,
            breed,
            pageNumber,
        } = this.state;

        const currentDate = new Date();
        const ageFrom =
            ageFromyy || ageFrommm || ageFromdd
                ? new Date(
                      currentDate.getFullYear() - ageFromyy,
                      currentDate.getMonth() - ageFrommm,
                      currentDate.getDate() - ageFromdd,
                  )
                : '';
        const ageTo =
            ageToyy || ageTomm || ageTodd
                ? new Date(
                      currentDate.getFullYear() - ageToyy,
                      currentDate.getMonth() - ageTomm,
                      currentDate.getDate() - ageTodd,
                  )
                : '';

        this.props.getProductList(
            ageFrom,
            ageTo,
            weightFrom ? weightFrom * gramPerKilo : '',
            weightTo ? weightTo * gramPerKilo : '',
            location,
            breed,
            pageNumber,
        );
    };

    firstPage = () => {
        const {currentPage, previousPage} = this.props;
        if (currentPage !== 1 && previousPage !== 1) {
            return (
                <li value={1} onClick={this.handleClick}>
                    1
                </li>
            );
        } else {
            return null;
        }
    };
    LastPage = () => {
        const {lastPage, currentPage, nextPage} = this.props;
        if (currentPage !== lastPage && nextPage !== lastPage) {
            return (
                <li value={lastPage} onClick={this.handleClick}>
                    {lastPage}
                </li>
            );
        } else {
            return null;
        }
    };
    render() {
        console.log(this.props.pagination);
        const {
            count,
            hasNextPage,
            hasPreviousPage,
            nextPage,
            currentPage,
            lastPage,
            previousPage,
        } = this.props.pagination;

        return (
            <div>
                <ul className='pagination'>
                    {this.firstPage()}
                    {hasPreviousPage && (
                        <li value={previousPage} onClick={this.handleClick}>
                            {previousPage}
                        </li>
                    )}

                    <li value={currentPage} onClick={this.handleClick}>
                        {currentPage}
                    </li>
                    {hasNextPage && (
                        <li value={nextPage} onClick={this.handleClick}>
                            {nextPage}
                        </li>
                    )}
                    {this.LastPage()}
                </ul>
                <form id='searchBar' onSubmit={this.handleSubmit}>
                    <div>
                        <h4>Age</h4>
                        <div className='age'>
                            <p>From</p>
                            <div className='ageInput'>
                                <input
                                    type='number'
                                    className='ageInputChild'
                                    id='ageFromyy'
                                    placeholder='Year'
                                    onChange={this.handleChange}
                                />
                                <input
                                    type='number'
                                    className='ageInputChild'
                                    id='ageFrommm'
                                    placeholder='Month'
                                    onChange={this.handleChange}
                                />
                                <input
                                    type='number'
                                    className='ageInputChild'
                                    id='ageFromdd'
                                    placeholder='Day'
                                    onChange={this.handleChange}
                                />
                            </div>

                            <p>To</p>
                            <div className='ageInput'>
                                <input
                                    type='number'
                                    className='ageInputChild'
                                    id='ageToyy'
                                    placeholder='Year'
                                    onChange={this.handleChange}
                                />
                                <input
                                    type='number'
                                    className='ageInputChild'
                                    id='ageTomm'
                                    placeholder='Month'
                                    onChange={this.handleChange}
                                />
                                <input
                                    type='number'
                                    className='ageInputChild'
                                    id='ageTodd'
                                    placeholder='Day'
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4>Weight</h4>
                        <div className='weight'>
                            <label htmlFor='weightfrom'>From</label>
                            <input
                                type='number'
                                className='form-control m-auto'
                                id='weightFrom'
                                onChange={this.handleChange}
                                placeholder='Weights in kg'
                            />

                            <label htmlFor='weightTo'>To</label>
                            <input
                                type='number'
                                className='form-control m-auto'
                                id='weightTo'
                                onChange={this.handleChange}
                                placeholder='Weights in kg'
                            />
                        </div>
                    </div>
                    <div>
                        <h4>
                            <label htmlFor='location'>Location</label>
                        </h4>
                        <input
                            type='text'
                            className='form-control m-auto'
                            id='location'
                            onChange={this.handleChange}
                            placeholder='E.g Belgrade'
                        />
                    </div>
                    <div>
                        <h4>
                            <label htmlFor='breed'>Breed</label>
                        </h4>
                        <input
                            type='text'
                            className='form-control m-auto'
                            id='breed'
                            onChange={this.handleChange}
                            placeholder='E.g Angus'
                        />
                    </div>
                    <button className='btn searchButton' type='submit'>
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pagination: state.project.pagination,
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
)(SearchField);
