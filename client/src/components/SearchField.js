import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProductList} from '../store/actions/projectActions';

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
    };

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
        // console.log(e);
    };
    handleSubmit = e => {
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

        e.preventDefault();
        this.props.getProductList(
            ageFrom,
            ageTo,
            weightFrom ? weightFrom * gramPerKilo : '',
            weightTo ? weightTo * gramPerKilo : '',
            location,
            breed,
        );
        console.log(e);
    };
    render() {
        return (
            <div id='searchBar'>
                <div className='searchBar-child' id='searchAge'>
                    <p>Age</p>
                    <p>From</p>
                    <div className='ageInput'>
                        <input
                            type='number'
                            className='ageInputYear ageInputChild'
                            id='ageFromyy'
                            placeholder='Year'
                            onChange={this.handleChange}
                        />
                        <input
                            type='number'
                            className='ageInputMonth ageInputChild'
                            id='ageFrommm'
                            placeholder='Month'
                            onChange={this.handleChange}
                        />
                        <input
                            type='number'
                            className='ageInputDay ageInputChild'
                            id='ageFromdd'
                            placeholder='Day'
                            onChange={this.handleChange}
                        />
                    </div>

                    <p>To</p>
                    <div className='ageInput'>
                        <input
                            type='number'
                            className='ageInputYear ageInputChild'
                            id='ageToyy'
                            placeholder='Year'
                            onChange={this.handleChange}
                        />
                        <input
                            type='number'
                            className='ageInputMonth ageInputChild'
                            id='ageTomm'
                            placeholder='Month'
                            onChange={this.handleChange}
                        />
                        <input
                            type='number'
                            className='ageInputDay ageInputChild'
                            id='ageTodd'
                            placeholder='Day'
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className='searchBar-child' id='searchWeight'>
                    <p>Weight</p>

                    <label htmlFor='weightfrom'>From</label>
                    <input
                        type='number'
                        className='form-control m-auto'
                        id='weightFrom'
                        onChange={this.handleChange}
                    />

                    <label htmlFor='weightTo'>To</label>
                    <input
                        type='number'
                        className='form-control m-auto'
                        id='weightTo'
                        onChange={this.handleChange}
                    />
                </div>
                <div className='searchBar-child' id='searchLocation'>
                    <label htmlFor='location'>Location</label>
                    <input
                        type='text'
                        className='form-control m-auto'
                        id='location'
                        onChange={this.handleChange}
                    />
                </div>
                <div className='searchBar-child' id='searchBreed'>
                    <label htmlFor='breed'>Breed</label>
                    <input
                        type='text'
                        className='form-control m-auto'
                        id='breed'
                        onChange={this.handleChange}
                    />
                </div>
                <button className='btn' onClick={this.handleSubmit}>
                    Search
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductList: (
            ageFrom,
            ageTo,
            weightFrom,
            weightTo,
            location,
            breed,
        ) => {
            console.log(
                '' +
                    ageFrom +
                    '\n' +
                    ageTo +
                    '\n' +
                    weightFrom +
                    weightTo +
                    location +
                    breed,
            );
            dispatch(
                getProductList(
                    ageFrom,
                    ageTo,
                    weightFrom,
                    weightTo,
                    location,
                    breed,
                ),
            );
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(SearchField);
