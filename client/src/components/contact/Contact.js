import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitMessage} from '../../store/actions/projectActions';
import Spinner from '../../assets/loading.gif';
import './contact.css';

class Contact extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        verified: false,
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.submitMessage(this.state);
    };
    //for the spinner
    toggleSpinner = () => {
        const {loading, errors} = this.props;
        if (loading === true && Object.keys(errors).length === 0) {
            return (
                <div>
                    <img
                        src={Spinner}
                        alt='spinner'
                        style={{
                            position: 'absolute',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            left: 0,
                            right: 0,
                            width: '25vw',
                            height: 'auto',
                        }}
                    />
                </div>
            );
        }
        return null;
    };

    render() {
        const {email, name, message} = this.state;
        const {messageSubmitted, errors} = this.props;
        return (
            <div className='container text-center mt-3 contact-container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form onSubmit={this.handleSubmit}>
                            <h1 className='mb-3'>Contact Us</h1>
                            {/* show only if errors exist */}
                            {Object.keys(errors).length > 0 && (
                                <div className='alert alert-danger'>
                                    <p>
                                        we encountered an error while processing
                                        your request, please refresh the page
                                        and try again
                                    </p>
                                </div>
                            )}
                            {/* Spinner */}
                            {this.toggleSpinner()}
                            {/* if the message got submitted */}
                            {messageSubmitted ? (
                                <h2 className='text-success messageSubmitted'>
                                    Your message has been sent
                                </h2>
                            ) : (
                                <React.Fragment>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg'
                                            name='name'
                                            onChange={this.handleChange}
                                            value={name}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input
                                            type='email'
                                            className='form-control form-control-lg'
                                            name='email'
                                            onChange={this.handleChange}
                                            value={email}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='message'>Message</label>
                                        <textarea
                                            className='form-control form-control-lg m-auto'
                                            name='message'
                                            onChange={this.handleChange}
                                            value={message}
                                            rows='5'
                                            required
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        className='btn btn-primary mb-3'
                                    >
                                        Submit
                                    </button>
                                </React.Fragment>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.project.loading,
    messageSubmitted: state.project.messageSubmitted,
    errors: state.errors,
});

const mapDispatchToProps = {
    submitMessage: info => submitMessage(info),
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Contact);
