import React, { useState } from 'react';

import Navbar from './components/Hoc/Navbar/Navbar';
import Footer from './components/Hoc/Footer';

import { useLocation } from 'react-router';

const Layout = (props) => {
    
    const location = useLocation();
    const slicedLocation = location.pathname.slice(0, location.pathname.lastIndexOf('/'));

    return (
        <>
            {
                slicedLocation == '/account' || slicedLocation == '/user' ?
                null
                : <Navbar open={props.open} setOpen={props.setOpen} />
            }
                {props.children}
            {
                slicedLocation == '/account' || slicedLocation == '/user' ?
                null
                : <Footer/>
            }
        </>
    );
};

export default Layout;