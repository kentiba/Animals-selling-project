import {
    GET_PRODUCT_LIST,
    ADD_TO_CART,
    GET_CHECKOUT_LIST,
    REMOVE_PRODUCT,
    GET_ORDERS_LIST,
    GET_CLIENTS_LIST,
    POST_LOADING,
    SUBMIT_REQUEST,
} from '../actions/actionTypes';
const initState = {
    productsList: [],
    pagination: {
        count: '',
        currentPage: '',
        lastPage: '',
        hasNextPage: '',
        hasPreviousPage: '',
        nextPage: '',
        previousPage: '',
        firstPageBox: '',
        lastPageBox: '',
    },
    checkout: [],
    ordersList: [],
    clientsList: [],
    loading: false,
};

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case POST_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case SUBMIT_REQUEST: {
            return {
                ...state,
                loading: false,
            };
        }
        case GET_PRODUCT_LIST:
            return {
                ...state,
                productsList: action.payload.data,
                pagination: {
                    currentPage: action.payload.currentPage,
                    lastPage: action.payload.lastPage,
                    hasNextPage: action.payload.hasNextPage,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    nextPage: action.payload.nextPage,
                    previousPage: action.payload.previousPage,
                    firstPageBox: action.payload.firstPageBox,
                    lastPageBox: action.payload.lastPageBox,
                },
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
