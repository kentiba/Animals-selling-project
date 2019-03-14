import {
    GET_PRODUCT_LIST,
    ADD_TO_CART,
    GET_CHECKOUT_LIST,
    REMOVE_PRODUCT,
    GET_ORDERS_LIST,
    GET_CLIENTS_LIST,
    // RESET_CHECKOUT_LIST,
} from '../actions/actionTypes';
const initState = {
    cowsList: [],
    checkout: [],
    ordersList: [],
    clientsList: [],
};

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return {
                ...state,
                cowsList: action.payload,
            };

        case GET_CHECKOUT_LIST:
            return {
                ...state,
                checkout: [...state.checkout],
            };
        case ADD_TO_CART:
            return {
                ...state,
                checkout: [action.payload, ...state.checkout],
            };

        case REMOVE_PRODUCT:
            return {
                ...state,
                checkout: state.checkout.filter(product => {
                    return product.id !== action.payload;
                }),
            };
        // case RESET_CHECKOUT_LIST:
        //     return {
        //         ...state,
        //         checkout: [],
        //     };

        case GET_ORDERS_LIST:
            return {
                ...state,
                ordersList: action.payload,
            };

        case GET_CLIENTS_LIST:
            return {
                ...state,
                clientsList: action.payload,
            };

        default:
            return state;
    }
};

export default projectReducer;
