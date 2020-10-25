import React, { useState } from 'react';

import Navbar from './components/Hoc/Navbar/Navbar';
import Footer from './components/Hoc/Footer';

import { useLocation } from 'react-router';

const Layout = (props) => {
    
    const location = useLocation();    

    return (
        <>
            {
                location.pathname.slice(0, location.pathname.lastIndexOf('/')) == '/account' ?
                null
                : <Navbar open={props.open} setOpen={props.setOpen} />
            }
                {props.children}
            {
                location.pathname.slice(0, location.pathname.lastIndexOf('/')) == '/account' ?
                null
                : <Footer/>
            }
        </>
    );
};

export default Layout;