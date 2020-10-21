import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

import { Link } from 'react-router-dom';

import { Animate } from 'react-move';
import { Drawer } from '@material-ui/core';

class Navbar extends Component {

    state = {
        show: false
    }

    modalHandler = () => {
        this.setState({
            show: !this.state.show
        })
    }

    SignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('_id');
        window.location.reload();
    }

    render() {
        return (
            <AppBar className='navbar_container account_navbar_container'>
                <ToolBar className='navbar account_navbar'>
                    <Link to='/'>
                        <img className='account_navbar_logo' src={require('../../../../assets/images/homeCover.png')} />
                    </Link>

                    <button onClick={() => this.modalHandler()} className='account_navbar_profile'>
                        <img src={require('../../../../assets/icons/profile.png')} />
                    </button>


                </ToolBar>

                <Drawer
                    anchor='top'
                    open={this.state.show}
                    variant='persistent'
                    transitionDuration={{
                        enter: 400,
                        exit: 200
                    }}
                    className='account_modal_container'
                >
                    <div className='account_modal'>
                        <Link to='/profile-edit' className='account_modal_btn'>
                            Edit My Profile
                        </Link>

                        <button onClick={() => this.SignOut()} className='account_modal_btn'>Sign Out</button>
                    </div>
                </Drawer>
            </AppBar>
        )
    }
};

export default Navbar;