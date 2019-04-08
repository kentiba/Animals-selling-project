import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getOrdersList} from '../../store/actions/projectActions';
import dayjs from 'dayjs';
import './order.css';
class Orders extends Component {
    componentDidMount() {
        this.props.getOrdersList();
    }

    render() {
        const {ordersList, errors} = this.props;
        const renderList = ordersList.map(order => {
            return (
                <tr key={order.id} className='order'>
                    <td>{order.productId}</td>
                    <td>{dayjs(order.dateOfBirth).format('DD/MM/YYYY')}</td>
                    <td>{order.weight / 1000}</td>
                    <td>{order.sex}</td>
                    <td>{order.breed}</td>
                    <td>{order.location}</td>
                    <td>{order.description}</td>
                </tr>
            );
        });

        return (
            <div className='py-5 m-3'>
                <div className='text-center'>
                    <div className='text-left'>
                        <Link to={'/orders'} className='btn btn-info m-2'>
                            Back to clients
                        </Link>
                    </div>
                    <h1>List of all the orders </h1>
                    <div className='table-responsive'>
                        <table className='table table-hover table-sm'>
                            <thead>
                                <tr>
                                    <th scope='col'>ProductId</th>
                                    <th scope='col'>Date of Birth</th>
                                    <th scope='col'>Weight</th>
                                    <th scope='col'>Sex</th>
                                    <th scope='col'>Breed</th>
                                    <th scope='col'>location</th>
                                    <th scope='col'>Description</th>
                                </tr>
                            </thead>
                            <tbody>{renderList}</tbody>
                        </table>
                    </div>
                </div>
                {errors.length > 0 && (
                    <div className='alert alert-danger'>
                        <p>
                            we encountered an error while processing your
                            request, please refresh the page and try again
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.clientId;
    return {
        ordersList: state.project.ordersList.filter(
            ord => ord.clientId.toString() === id,
        ),
        errors: state.errors,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getOrdersList: () => dispatch(getOrdersList()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Orders);
