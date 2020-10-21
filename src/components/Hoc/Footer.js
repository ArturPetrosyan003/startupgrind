import React from 'react';

import { Link } from 'react-router-dom';

const Footer = (props) => {
    return (
        <div className='footer'>
            <div className='footer_left'>
                <img src={require('../../assets/images/homeCover.png')} />
                <h2>Lorem ipsum</h2>
                <h2>Lorem ipsum</h2>
                <h2>Lorem ipsum</h2>
                <h2>Lorem ipsum</h2>
                <h2>Lorem ipsum</h2>
            </div>

            <div className='footer_center'>
                <p className='footer_copyright'>Copyright 2020 &copy;</p>
            </div>

            <div className='footer_right'>
                <img src={require('../../assets/images/homeCover.png')} />
                <img src={require('../../assets/images/homeCover.png')} />
            </div>

        </div>
    );
};

export default Footer;