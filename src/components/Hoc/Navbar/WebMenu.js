import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

import { connect } from 'react-redux';
import { closeLoginMenu, openLoginMenu, openRegMenu, closeRegMenu } from '../../redux/actions';

const WebMenu = (props) => {

    const history = useHistory();

    const SignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('_id');

        history.go(0);
    }

    return (
        <>
            {
                props.loginMenuState == true ?
                    <Login handler={props.closeLoginMenu} />
                    : props.regMenuState == true ?
                        <Register handler={props.closeRegMenu} />
                        : null
            }

            <div className='navbar_buttons_cont'>
                <Link to='/' className='navbar_link'>
                    Home
                </Link>

                <Link to='/about' className='navbar_link'>
                    About
                </Link>

                <Link to='/startups' className='navbar_link'>
                    Startups
                 </Link>

                <Link to='/blog' className='navbar_link'>
                    Blog
                </Link>

                <Link to='/contact' className='navbar_link'>
                    Contact Us
                </Link>

                <div className='navbar_login_container'>
                    {
                        localStorage.getItem('token') || sessionStorage.getItem('token') ?
                            <>
                                <Link to={`/account/${localStorage.getItem('_id') || sessionStorage.getItem('_id')}`}>
                                    <button className='navbar_link navbar_button'>
                                        My Profile
                                    </button>
                                </Link>

                                <button
                                    className='navbar_link navbar_button'
                                    onClick={SignOut}
                                >
                                    Sign Out
                                </button>
                            </>
                            :
                            <>
                                <button
                                    className='navbar_link navbar_button'
                                    onClick={() => props.openLoginMenu()}
                                >
                                    Log In
                                </button>

                                <button
                                    className='navbar_link navbar_button'
                                    onClick={() => props.openRegMenu()}
                                >
                                    Sign Up
                                </button>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        loginMenuState: state.login,
        regMenuState: state.reg
    }
}

const mapDispatchToProps = {
    closeLoginMenu,
    openLoginMenu,
    openRegMenu,
    closeRegMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(WebMenu);