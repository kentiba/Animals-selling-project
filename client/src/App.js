import React, {Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import ProductList from './components/products/ProductList';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import About from './components/About';
import Checkout from './components/checkout/Checkout';
import Contact from './components/Contact';
import EditProduct from './components/products/EditProduct';
import CreateProduct from './components/products/CreateProduct';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';
import OrderSubmitted from './components/checkout/OrderSubmitted ';
import Clients from './components/ordersLog/Clients';
import Orders from './components/ordersLog/Orders';
import NotFound from './components/common/NotFound';
import Footer from './components/layout/Footer';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={ProductList} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/checkout' component={Checkout} />
                        <Route exact path='/contact' component={Contact} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/sent' component={OrderSubmitted} />
                        <PrivateRoute
                            exact
                            path='/register'
                            component={Register}
                        />
                        <PrivateRoute
                            exact
                            path='/orders'
                            component={Clients}
                        />
                        <PrivateRoute
                            exact
                            path='/ordersList/:clientId'
                            component={Orders}
                        />
                        <PrivateRoute
                            exact
                            path='/createProduct'
                            component={CreateProduct}
                        />
                        <PrivateRoute
                            exact
                            path='/editProduct/:id'
                            component={EditProduct}
                        />
                        {/* for all unmatched routes */}
                        <Route path='*' exact component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
