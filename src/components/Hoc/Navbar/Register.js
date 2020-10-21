import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Register = (props) => {

    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const closeRegisterCont = (event) => {
        if (event.target == event.currentTarget) {
            props.handler()
        }
    }

    const register = async (event) => {
        setLoading(true);
        setErrorText('');

        event.preventDefault();
        const formData = new FormData(event.target)

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                surname: formData.get('surname'),
                password: formData.get('password'),
                email: formData.get('email')
            })
        })

        const fetchedData = await request.json();
        console.log(fetchedData)

        if (fetchedData.errors) {
            if (fetchedData.errors[0].field == 'email') {
                setErrorText('Email already exists');
                setLoading(false);
            }
            else {
                setErrorText('Something went wrong');
                setLoading(false);
            }
        }
        else {
            await localStorage.setItem('token', fetchedData.data.auth.token)
            await localStorage.setItem('_id', fetchedData.data.user._id);

            props.handler()
            setLoading(true);
            
            return (
                history.push(`/account/${fetchedData.data.user._id}`)
            )
        }
    }

    return (
        <>
            <div className='loginReg_backdrop reg_backdrop' onClick={closeRegisterCont}>
                <div className='loginReg_container reg_container'>
                    <h2 className='loginReg_text'>Sign Up</h2>

                    <form className='loginReg_form' method='POST' onSubmit={register}>
                        <span className='loginReg_span'>First Name*</span><br></br>
                        <input type='text' required name='name' placeholder='Your name' /><br></br>

                        <span className='loginReg_span'>Surname*</span><br></br>
                        <input type='text' required name='surname' placeholder='Your surname' /><br></br>

                        <span className='loginReg_span'>Email*</span><br></br>
                        <input type='email' required name='email' placeholder='Your email' /><br></br>

                        <span className='loginReg_span'>Password*</span><br></br>
                        <input type='password' required name='password' placeholder='Create password' minLength='8' /><br></br>

                        <p className='loginReg_error_text'>{errorText}</p>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginLeft: '-8%' }}>
                            <button className='submit'>
                                {
                                    loading == true ?
                                        <ReactLoading type={'spin'} color={'white'} height={30} width={30} />
                                    : "Sign Up"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;