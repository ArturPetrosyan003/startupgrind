import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Login = (props) => {

    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const closeLoginCont = (event) => {
        if (event.target == event.currentTarget) {
            props.handler()
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
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        const fetchedData = await request.json();
        console.log(fetchedData);

        if (fetchedData.errors) {
            if (fetchedData.errors[0].field == 'login_or_password') {
                setErrorText('Invalid email or password');
                setLoading(false);
            }
            else {
                setErrorText('Something went wrong');
                setLoading(false);
            }
        }
        else {
            await localStorage.setItem('token', fetchedData.data.auth.token);
            await localStorage.setItem('_id', fetchedData.data.user._id);

            props.handler();
            setLoading(true);
            
            return(
                history.push(`/account/${fetchedData.data.user._id}`)
            )
        }
    }

    return (
        <>
            <div className='loginReg_backdrop' onClick={closeLoginCont}>
                <div className='loginReg_container'>
                    <h2 className='loginReg_text'>Sign In</h2>

                    <form className='loginReg_form' method='POST' onSubmit={login}>
                        <span className='loginReg_span'>Email</span><br></br>
                        <input type='email' required name='email' placeholder='Email' /><br></br>

                        <span className='loginReg_span'>Password</span><br></br>
                        <input type='password' required name='password' placeholder='Password' /><br></br>

                        <p className='loginReg_error_text'>{errorText}</p>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '-8%' }}>
                            <button disabled={loading == true ? true : false} className='submit'>
                                {
                                    loading == true ?
                                        <ReactLoading type={'spin'} color={'white'} height={30} width={30} />
                                    : "Sign In"
                                }
                            </button>
                        </div>
                    </form>

                    <Link to='/' className='loginReg_reset_password'>
                        Forgot password?
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;