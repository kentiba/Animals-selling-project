import {SET_CURRENT_USER} from '../actions/actionTypes';
import isEmpty from '../../validations/is_empty';
const initState = {
    isAuthenticated: false,
    user: {},
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
