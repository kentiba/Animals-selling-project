import {
    GET_PRODUCT_LIST,
    ADD_TO_CART,
    GET_CHECKOUT_LIST,
    REMOVE_PRODUCT,
    GET_ERRORS,
    GET_ORDERS_LIST,
    GET_CLIENTS_LIST,
} from './actionTypes';
import axios from 'axios';

// to get the list of products

export const getProductList = (
    ageFrom,
    ageTo,
    weightFrom,
    weightTo,
    location,
    breed,
) => dispatch => {
    axios
        .get('/products/get', {
            params: {
                ageFrom,
                ageTo,
                weightFrom,
                weightTo,
                location,
                breed,
            },
        })
        .then(res =>
            dispatch({
                type: GET_PRODUCT_LIST,
                payload: res.data.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

//to get the list of checkout products
export const getCheckoutList = () => dispatch => {
    dispatch({
        type: GET_CHECKOUT_LIST,
    });
};

// to update a certain product
export const updateProduct = (product, history) => dispatch => {
    axios
        .put('/products/update', product)
        .then(() => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to delete a certain product
export const deleteProduct = (id, history) => dispatch => {
    axios
        .delete('/products/delete', {
            data: {id},
        })
        .then(() => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to create a new product
export const createProduct = (product, history) => dispatch => {
    axios
        .post('/products/add', product)
        .then(() => {
            history.push('/');
            window.location.reload(true);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to add product to the cart
export const addToCart = product => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: product,
    });
};
// to remove a product from the cart
export const removeProduct = id => dispatch => {
    dispatch({
        type: REMOVE_PRODUCT,
        payload: id,
    });
};

//to submit an order request
//&&
//to remove all the products from the checkoutlist after submitting the order

export const submitRequest = (info, history) => dispatch => {
    axios
        .post('/orders', info)
        .then(() => {
            window.location.reload(true);
            history.push('/sent');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// export const resetCheckList = () => dispatch => {
//     dispatch({
//         type: RESET_CHECKOUT_LIST,
//     });
// };

// to get the list of orders

export const getOrdersList = () => dispatch => {
    axios
        .get('/orders')
        .then(res =>
            dispatch({
                type: GET_ORDERS_LIST,
                payload: res.data.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

// to get the list of clients

export const getClientsList = () => dispatch => {
    axios
        .get('/clients')
        .then(res =>
            dispatch({
                type: GET_CLIENTS_LIST,
                payload: res.data.data,
            }),
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};
