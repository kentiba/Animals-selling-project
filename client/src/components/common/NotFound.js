import React from 'react';
import {Link} from 'react-router-dom';
import notFound from '../../assets/sad.png';
const NotFound = () => (
    <div className='container py-3 mt-5'>
        <div className='row text-center'>
            <div className='col'>
                <img
                    src={notFound}
                    alt='Page not found'
                    className='img-responsive mb-2'
                    style={{height: 'auto', width: '27vw'}}
                />
                <h2>Page Not Found</h2>
                <p>
                    We can't find the page you're looking for.
                    <br />
                    You can return to our homepage by clicking on the button
                    below
                </p>
                <Link to={'/'} className='btn btn-outline-primary'>
                    Back to home page
                </Link>
            </div>
        </div>
    </div>
);
export default NotFound;
