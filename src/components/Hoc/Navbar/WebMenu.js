import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

const WebMenu = (props) => {

    const [loginCont, setLoginCont] = useState(false);
    const [regCont, setRegCont] = useState(false);

    const history = useHistory();

    const loginContOpen = () => {
        setLoginCont(!loginCont)
    }

    const regContOpen = () => {
        setRegCont(!regCont)
    }

    const SignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('_id');
        history.go(0);
    }

    return (
        <>
            {
                loginCont == true && regCont == false ?
                    <Login handler={loginContOpen} />
                    : loginCont == false && regCont == true ?
                        <Register handler={regContOpen} />
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
                {
                    localStorage.getItem('token') ?
                        <div className='navbar_profile_cont'>
                            <Link className='navbar_profile_icon_cont' to={`/account/${localStorage.getItem('_id')}`}>
                                <img className='navbar_profile_icon' src={require('../../../assets/icons/profile.png')} />
                                <p>My Profile</p>
                            </Link>

                            <button onClick={SignOut}>Sign Out</button>
                        </div>
                        :
                        <div className='navbar_login_container'>
                            <button onClick={() => loginContOpen()} className='navbar_link navbar_button'>
                                Log In
                            </button>

                            <button onClick={() => regContOpen()} className='navbar_link navbar_button'>
                                Sign Up
                            </button>
                        </div>
                }
            </div>
        </>
    );
};

export default WebMenu;