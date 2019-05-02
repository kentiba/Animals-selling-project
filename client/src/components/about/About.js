import React from 'react';
import Cattle from '../../assets/cattle.jpg';
import './about.css';

const About = () => {
    return (
        <div className='container text-center py-5 mt-3'>
            <div className='about-container'>
                <h1 className='elegantshadow'>About us </h1>
                <div className='about'>
                    <img
                        src={Cattle}
                        alt='Cattle_image'
                        className='cattle_image'
                    />
                    <p>
                        KenSale is an online platform for selling livestock. It
                        has been developed to allow customers to have an easy
                        experience to search and buy cattle. We provide cattle
                        with accurate images,weights,location and prices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
