import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import Loading from 'react-loading';

import { connect } from 'react-redux';
import { openLoginMenu, closeRegMenu } from '../../redux/actions';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

const Register = (props) => {

    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const closeRegisterCont = (event) => {
        if (event.target == event.currentTarget) {
            props.handler();
        }
    }

    const register = async (event) => {
        setLoading(true);
        setErrorText('');

        event.preventDefault();
        const formData = new FormData(event.target);

        if (formData.get('password') == formData.get('password_repeat')) {
            const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name').trim(),
                    surname: formData.get('surname').trim(),
                    password: formData.get('password').replace(/\s/g, ''),
                    email: formData.get('email').trim()
                })
            });

            const fetchedData = await request.json();

            if (!fetchedData.errors) {
                await localStorage.setItem('token', fetchedData.data.auth.token);
                await localStorage.setItem('_id', fetchedData.data.user._id);

                props.handler()
                setLoading(true);

                return (
                    history.push(`/account/${fetchedData.data.user._id}`)
                );
            }
            else {
                if (fetchedData.errors[0].field == 'email') {
                    if (fetchedData.errors[0].message == "duplicate key") {
                        setErrorText('Email already exists');
                        setLoading(false);
                    }
                    else {
                        setErrorText('Invalid email');
                        setLoading(false);
                    }
                }
                else {
                    setErrorText('Something went wrong');
                    setLoading(false);
                }
            }
        }
        else {
            setLoading(false);
            setErrorText('Please make sure the passwords match');
        }
    }

    const loginMenuOpen = () => {
        props.closeRegMenu();
        props.openLoginMenu();
    }

    return (
        <Fade duration={300}>
            <div className='loginReg_backdrop reg_backdrop' onClick={closeRegisterCont}>
                <Zoom duration={600}>
                    <div className='loginReg_container reg_container'>
                        <h2 className='loginReg_text'>Sign Up</h2>

                        <form className='loginReg_form' method='POST' onSubmit={register}>
                            <span className='loginReg_span'>First Name*</span><br></br>
                            <input required type='text' name='name' placeholder='Your name' minLength='3' /><br></br>

                            <span className='loginReg_span'>Surname*</span><br></br>
                            <input required type='text' name='surname' placeholder='Your surname' minLength='3' /><br></br>

                            <span className='loginReg_span'>Email*</span><br></br>
                            <input required type='email' name='email' placeholder='Your email' minLength='3' /><br></br>

                            <span className='loginReg_span'>Password*</span><br></br>
                            <input required type='password' name='password' placeholder='Create password' minLength='6' style={{ borderColor: errorText != '' ? 'red' : '#B1AFAF' }} /><br></br>

                            <span className='loginReg_span'>Repeat Password*</span><br></br>
                            <input required type='password' name='password_repeat' placeholder='Create password' minLength='6' style={{ borderColor: errorText != '' ? 'red' : '#B1AFAF' }} /><br></br>

                            <p className='loginReg_error_text'>{errorText}</p>

                            <div className='loginReg_button_container'>
                                <button className='submit'>
                                    {
                                        loading == true ?
                                            <Loading
                                                height={30}
                                                width={30}
                                                color={'white'}
                                                type={'bubbles'}
                                            />
                                            : "Sign Up"
                                    }
                                </button>
                            </div>
                        </form>

                        <p className='loginReg_mirror_link'>
                            Already have an account? {' '}
                            <button onClick={() => loginMenuOpen()}>
                                <span>sign in</span>
                            </button>
                        </p>
                    </div>
                </Zoom>
            </div>
        </Fade>
    );
}

const mapDispatchToProps = {
    closeRegMenu,
    openLoginMenu
}

export default connect(null, mapDispatchToProps)(Register);