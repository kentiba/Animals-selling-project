import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../src/store/reducers/rootReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './store/actions/userAction';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

//we do it so when page is reloaded the info is still there about user authentication
//check for token
if (localStorage.jwtToken) {
    //set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //decode token and get user info
    const decode = jwt_decode(localStorage.jwtToken);
    //set user and isAuthenticated
    store.dispatch(setCurrentUser(decode));

    //check for expired token
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
        //logout user
        store.dispatch(logoutUser());
        //TODO clear current Profile

        // Redirect to login
        window.location.href = '/';
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
