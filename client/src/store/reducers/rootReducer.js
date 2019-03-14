import {combineReducers} from 'redux';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer,
    errors: errorReducer,
});

export default rootReducer;
