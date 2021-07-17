import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Loading from 'react-loading';

import { connect } from 'react-redux';
import { openRegMenu, closeLoginMenu } from '../../redux/actions';

import { Checkbox } from '@material-ui/core';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

const Login = (props) => {

    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);
    const [forgotClick, setForgotClick] = useState(false);
    const [showALert, setShowAlert] = useState(false);
    const [checkboxState, setCheckboxState] = useState(false);

    const history = useHistory();

    const closeLoginCont = (event) => {
        if (event.target == event.currentTarget) {
            props.handler();
        }
    }

    const login = async (event) => {
        setLoading(true);
        setErrorText('');

        event.preventDefault();
        const formData = new FormData(event.target);

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/users/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.get('email').trim(),
                password: formData.get('password')
            })
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            if (!checkboxState) {
                sessionStorage.setItem('token', fetchedData.data.auth.token);
                sessionStorage.setItem('_id', fetchedData.data.user._id);
            }
            else {
                localStorage.setItem('token', fetchedData.data.auth.token);
                localStorage.setItem('_id', fetchedData.data.user._id);
            }

            props.handler();
            history.push(`/account/${fetchedData.data.user._id}`);
        }
        else {
            if (fetchedData.errors[0].field == 'login_or_password') {
                setErrorText('Invalid email or password');
                setLoading(false);
            }
            else {
                setErrorText('Something went wrong');
                setLoading(false);
            }
        }
    }

    const sendResetLink = async (event) => {
        setLoading(true);
        setErrorText('');

        event.preventDefault();
        const formData = new FormData(event.target);

        const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/passwords?email=${formData.get('email')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const fetchedData = await request.json();

        if (!fetchedData.data.isSent) {
            setErrorText('Something went wrong');
            setLoading(false);
        }
        else {
            setLoading(false);
            setShowAlert(true);
        }
    }

    const regMenuOpen = () => {
        props.closeLoginMenu();
        props.openRegMenu();
    }

    return (
        <Fade duration={300}>
            <div className='loginReg_backdrop' onClick={closeLoginCont}>
                <Zoom duration={600}>
                    <div className='loginReg_container'>
                        {
                            !forgotClick ?
                                <>
                                    <h2 className='loginReg_text'>Log In</h2>

                                    <form className='loginReg_form' method='POST' onSubmit={login}>
                                        <span className='loginReg_span'>Email</span><br></br>
                                        <input type='email' required name='email' placeholder='Email' /><br></br>

                                        <span className='loginReg_span'>Password</span><br></br>
                                        <input type='password' required name='password' placeholder='Password' /><br></br>

                                        <p className='loginReg_error_text'>{errorText}</p>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: '-20%',
                                                marginTop: 20,
                                                color: 'black'
                                            }}
                                        >
                                            <Checkbox
                                                checked={checkboxState}
                                                onClick={() => setCheckboxState(!checkboxState)}
                                                style={{
                                                    color: "#1976D5"
                                                }}
                                            />
                                            <p>Remember Password</p>
                                        </div>

                                        <div className='loginReg_button_container'>
                                            <button
                                                className='submit'
                                                disabled={loading == true ? true : false}
                                            >
                                                {
                                                    loading == true ?
                                                        <Loading
                                                            height={40}
                                                            width={40}
                                                            color={'white'}
                                                            type={'bubbles'}
                                                        />
                                                        : "Log In"
                                                }
                                            </button>
                                        </div>
                                    </form>

                                    <button onClick={() => setForgotClick(true)} className='loginReg_reset_password'>
                                        Forgot password?
                                    </button>

                                    <p className='loginReg_mirror_link'>
                                        If you don’t have an account please {' '}
                                        <button onClick={() => regMenuOpen()}>
                                            <span>sign up</span>
                                        </button>
                                    </p>
                                </>
                                :
                                <>
                                    {
                                        !showALert ?
                                            <>
                                                <h2 className='loginReg_text' style={{ marginBottom: 70 }}>Forgot Password</h2>

                                                <form className='loginReg_form' method='GET' onSubmit={sendResetLink}>
                                                    <span className='loginReg_span'>Please type your email</span><br></br>
                                                    <input type='email' required name='email' placeholder='Email' /><br></br>

                                                    <p className='loginReg_error_text'>{errorText}</p>

                                                    <div className='loginReg_button_container'>
                                                        <button
                                                            className='submit'
                                                            disabled={loading == true ? true : false}
                                                            style={{
                                                                marginBottom: 80
                                                            }}
                                                        >
                                                            {
                                                                loading == true ?
                                                                    <Loading
                                                                        height={40}
                                                                        width={40}
                                                                        color={'white'}
                                                                        type={'bubbles'}
                                                                    />
                                                                    : "Reset Password"
                                                            }
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                            :
                                            <>
                                                <h2 className='loginReg_text' style={{ marginBottom: 20, marginTop: 100 }}>Thank you!</h2>
                                                <h3
                                                    style={{
                                                        color: 'black',
                                                        width: 300,
                                                        textAlign: 'center',
                                                        fontWeight: 300,
                                                        marginBottom: 120
                                                    }}
                                                >
                                                    Please check your inbox for further instructions
                                                </h3>
                                            </>
                                    }
                                </>
                        }
                    </div>
                </Zoom>
            </div>
        </Fade>
    );
}

const mapDispatchToProps = {
    openRegMenu,
    closeLoginMenu
}

export default connect(null, mapDispatchToProps)(Login);