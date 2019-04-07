import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateProduct, deleteProduct} from '../../store/actions/projectActions';
import classnames from 'classnames';
import defaultImage from '../../assets/default.png';

class EditProject extends Component {
    state = {
        dateOfBirth: '',
        weight: '',
        sex: '',
        location: '',
        breed: '',
        image: '',
        description: '',
        id: '',
        updatedImage: null,
        errors: {},
    };

    componentDidMount() {
        if (this.props.project) {
            this.setState({
                dateOfBirth: this.props.project.dateOfBirth,
                weight: this.props.project.weight / 1000,
                sex: this.props.project.sex,
                location: this.props.project.location,
                breed: this.props.project.breed,
                description: this.props.project.description,
                image: this.props.project.image,
                id: this.props.project.id,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };
    handleImageChange = e => {
        this.setState({
            updatedImage: e.target.files[0],
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData();
        const {
            dateOfBirth,
            sex,
            location,
            breed,
            weight,
            description,
            id,
            updatedImage,
        } = this.state;
        dateOfBirth.length !== 0 && fd.append('dateOfBirth', dateOfBirth);
        weight.length !== 0 &&
            fd.append('weight', (weight * 1000).toString().trim());
        sex.length !== 0 && fd.append('sex', sex);
        location.length !== 0 && fd.append('location', location.trim());
        breed.length !== 0 && fd.append('breed', breed.trim());
        fd.append('description', description.trim());
        fd.append('id', id);
        if (updatedImage !== null) {
            const image = updatedImage;
            fd.append('image', image);
        }
        this.props.updateProduct(fd, this.props.history);
    };
    handleDelete = e => {
        e.preventDefault();
        this.props.deleteProduct(this.state.id, this.props.history);
    };
    render() {
        const {
            dateOfBirth,
            weight,
            sex,
            location,
            breed,
            image,
            description,
            errors,
        } = this.state;

        const DOB = dateOfBirth.substr(0, 10);

        return (
            <div className='container editProject text-center'>
                <form
                    onSubmit={this.handleSubmit}
                    className='py-5'
                    encType='multipart/form-data'
                >
                    <div className='form-group mt-3 m-auto pt-4'>
                        <img
                            className='card-img-top'
                            src={image ? image : defaultImage}
                            alt='ProductImage'
                        />
                        <br />
                        <label htmlFor='image'>Upload a new picture</label>
                        <input
                            type='file'
                            className={classnames(
                                'form-control-file  w-50 m-auto',
                                {
                                    'is-invalid': errors.image,
                                },
                            )}
                            id='image'
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
                            value={sex}
                        >
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                        {errors.sex && (
                            <div className='invalid-feedback'>{errors.sex}</div>
                        )}
                    </div>
                    <div className='form-group w-50 m-auto'>
                        <label htmlFor='dateOfBirth'>Date of birth</label>
                        <input
                            type='date'
                            className={classnames(
                                'form-control form-control-lg',
                                {
                                    'is-invalid': errors.dateOfBirth,
                                },
                            )}
                            id='dateOfBirth'
                            defaultValue={DOB}
                            onChange={this.handleChange}
                        />
                        <small className='text-info'>*Month/Day/Year</small>
                        {errors.dateOfBirth && (
                            <div className='invalid-feedback'>
                                {errors.dateOfBirth}
                            </div>
                        )}
                    </div>
                    <div className='form-group w-50 m-auto'>
                        <label htmlFor='weight'>Weight</label>
                        <input
                            type='text'
                            className={classnames(
                                'form-control form-control-lg',
                                {
                                    'is-invalid': errors.weight,
                                },
                            )}
                            id='weight'
                            defaultValue={weight}
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
                    <div className='form-group w-50 m-auto'>
                        <label htmlFor='location'>Location</label>
                        <input
                            type='text'
                            className={classnames(
                                'form-control form-control-lg',
                                {
                                    'is-invalid': errors.location,
                                },
                            )}
                            id='location'
                            defaultValue={location}
                            onChange={this.handleChange}
                        />
                        {errors.location && (
                            <div className='invalid-feedback'>
                                {errors.location}
                            </div>
                        )}
                    </div>
                    <div className='form-group w-50 m-auto py-2'>
                        <label htmlFor='breed'>Breed</label>
                        <input
                            type='text'
                            className={classnames(
                                'form-control form-control-lg',
                                {
                                    'is-invalid': errors.breed,
                                },
                            )}
                            id='breed'
                            defaultValue={breed}
                            onChange={this.handleChange}
                        />
                        {errors.breed && (
                            <div className='invalid-feedback'>
                                {errors.breed}
                            </div>
                        )}
                    </div>
                    <div className='form-group py-1'>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            className='form-control form-control-lg w-50 m-auto'
                            id='description'
                            onChange={this.handleChange}
                            value={description}
                        />
                    </div>
                    <div className='py-3'>
                        <button
                            type='submit'
                            className='btn btn-primary mx-5 my-2'
                        >
                            Submit
                        </button>
                        <button
                            className='btn btn-danger mx-5 my-2'
                            onClick={this.handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const project = state.project.cowsList.find(cow => {
        return cow.id.toString() === id;
    });

    return {
        project: project,
        errors: state.errors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProduct: (product, history) =>
            dispatch(updateProduct(product, history)),
        deleteProduct: (id, history) => dispatch(deleteProduct(id, history)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(EditProject));
