import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getClientsList} from '../../store/actions/projectActions';
import daysjs from 'dayjs';
import './order.css';
class Clients extends Component {
    componentDidMount() {
        this.props.getClientsList();
    }

    render() {
        const {clientsList, errors} = this.props;
        let renderList;
        if (clientsList.length > 0) {
            renderList = clientsList.map(client => {
                return (
                    <tr key={client.id} className='order'>
                        <td>
                            {daysjs(client.createdAt).format('MMM DD YYYY')}
                        </td>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>{client.note}</td>
                        <td>
                            <Link to={'/ordersList/' + client.id}>Orders</Link>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className='py-5 m-3'>
                <div className='text-center'>
                    <h1>List of all the clients</h1>
                    <div className='table-responsive'>
                        <table className='table table-hover table-sm'>
                            <thead>
                                <tr>
                                    <th scope='col'>Order's date</th>
                                    <th scope='col'>Client's name</th>
                                    <th scope='col'>Phone number</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Note</th>
                                    <th scope='col'>Orders</th>
                                </tr>
                            </thead>
                            <tbody>{renderList}</tbody>
                        </table>
                    </div>
                    <div>
                        {clientsList.length === 0 && (
                            <p>No order has been made</p>
                        )}
                    </div>
                </div>
                {errors.length > 0 && (
                    <div className='alert alert-danger'>
                        <p>
                            we encountered an error while processing your
                            request, please refresh the page and try again!
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clientsList: state.project.clientsList,
        errors: state.errors,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getClientsList: () => dispatch(getClientsList()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Clients);
