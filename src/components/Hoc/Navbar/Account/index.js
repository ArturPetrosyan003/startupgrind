import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

import { Link } from 'react-router-dom';

import { Drawer } from '@material-ui/core';

const Navbar = () => {

    const [show, setShow] = useState(false);

    const modalHandler = () => {
        setShow(!show);
    }

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('_id');

        window.location.reload();
    }

    return (
        <AppBar className='navbar_container account_navbar_container'>
            <ToolBar className='navbar account_navbar'>
                <Link to='/'>
                    <img className='account_navbar_logo' src={require('../../../../assets/images/homeCover.png')} />
                </Link>

                <button onClick={() => modalHandler()} className='account_navbar_profile'>
                    <img src={require('../../../../assets/icons/profile.png')} />
                </button>
            </ToolBar>

            <Drawer
                anchor='top'
                open={show}
                variant='persistent'
                transitionDuration={{
                    enter: 400,
                    exit: 200
                }}
                className='account_modal_container'
            >
                <div className='account_modal'>
                    <button onClick={() => signOut()} className='account_modal_btn'>Sign Out</button>
                </div>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;