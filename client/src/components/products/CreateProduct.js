import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {createProduct} from '../../store/actions/projectActions';

class CreateProduct extends Component {
    state = {
        age: '',
        weight: '',
        sex: '',
        location: '',
        breed: '',
        description: '',
        image: '',
        errors: {},
    };
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    handleImageChange = e => {
        this.setState({image: e.target.files[0]});
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData();
        const {
            age,
            sex,
            location,
            weight,
            breed,
            description,
            image,
        } = this.state;

        age.length !== 0 && fd.append('age', age);
        weight.length !== 0 &&
            fd.append('weight', (weight * 1000).toString().trim());
        sex.length !== 0 && fd.append('sex', sex);
        location.length !== 0 && fd.append('location', location);
        breed.length !== 0 && fd.append('breed', breed);
        fd.append('description', description);
        fd.append('image', image);

        this.props.createProduct(fd, this.props.history);
    };
    render() {
        const {errors} = this.props;
        return (
            <div className='container text-center py-5 mt-3'>
                <h1>Create a new profile for your product</h1>

                <form
                    onSubmit={this.handleSubmit}
                    encType='multipart/form-data'
                >
                    <div className='form-group'>
                        <label htmlFor='image'>Image</label>
                        <br />
                        <input
                            type='file'
                            name='picture'
                            id='image'
                            className={classnames(
                                'form-control-file  w-50 m-auto',
                                {
                                    'is-invalid': errors.image,
                                },
                            )}
                            onChange={this.handleImageChange}
                        />
                        <small className='text-info'>
                            *Picture's size should not be larger than 7
                            megabytes
                            <br />
                            *Pictures should be in jpg , jpeg or png
                        </small>
                        {errors.image && (
                            <div className='invalid-feedback'>
                                <h5>{errors.image}</h5>
                            </div>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='sex'>Sex</label>
                        <select
                            className={classnames('form-control  w-50 m-auto', {
                                'is-invalid': errors.sex,
                            })}
                            id='sex'
                            onChange={this.handleChange}
                        >
                            <option />
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        {errors.sex && (
                            <div className='invalid-feedback'>{errors.sex}</div>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='age'>Date of birth</label>
                        <input
                            type='date'
                            className={classnames(
                                'form-control form-control-lg w-50 m-auto',
                                {
                                    'is-invalid': errors.age,
                                },
                            )}
                            id='age'
                            onChange={this.handleChange}
                        />
                        {errors.age && (
                            <div className='invalid-feedback'>{errors.age}</div>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='weight'>Weight</label>
                        <input
                            type='text'
                            className={classnames(
                                'form-control form-control-lg w-50 m-auto',
                                {
                                    'is-invalid': errors.weight,
                                },
                            )}
                            id='weight'
                            onChange={this.handleChange}
                        />
                        <small className='text-info'>
                            *Weights should be in kg
                        </small>
                        {errors.weight && (
                            <div className='invalid-feedback'>
                                {errors.weight}
                            </div>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='location'>Location</label>
                        <input
                            type='text'
                            className={classnames(
                                'form-control form-control-lg w-50 m-auto',
                                {
                                    'is-invalid': errors.location,
                                },
                            )}
                            id='location'
                            onChange={this.handleChange}
                        />
                        {errors.location && (
                            <div className='invalid-feedback'>
                                {errors.location}
                            </div>
                        )}
                    </div>

                    <div className='form-group'>
                        <label htmlFor='breed'>Breed</label>
                        <input
                            type='text'
                            className={classnames(
                                'form-control form-control-lg w-50 m-auto',
                                {
                                    'is-invalid': errors.breed,
                                },
                            )}
                            id='breed'
                            onChange={this.handleChange}
                        />
                        {errors.breed && (
                            <div className='invalid-feedback'>
                                {errors.breed}
                            </div>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            className='form-control form-control-lg w-50 m-auto'
                            id='description'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createProduct: (product, history) =>
            dispatch(createProduct(product, history)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(CreateProduct));
