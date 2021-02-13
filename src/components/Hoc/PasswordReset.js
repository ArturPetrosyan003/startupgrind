import React, { useState } from 'react';
import ReactLoading from 'react-loading';

import queryString from 'query-string';
import { useHistory } from 'react-router';

const PasswordReset = (props) => {

    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);

    const query = queryString.parse(props.location.search);
    const history = useHistory();

    const resetPassword = async (event) => {
        setLoading(true);
        setErrorText('');

        event.preventDefault();
        const formData = new FormData(event.target);

        if (formData.get('confirm_password') == formData.get('password')) {
            const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/passwords?token=${query.token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: formData.get('password')
                })
            });

            const fetchedData = await request.json();

            console.log(fetchedData);

            if (fetchedData.errors) {
                setLoading(false);
                setErrorText('Invalid Link');
            }
            else {
                history.push('/');
            }
        }
        else {
            setLoading(false);
            setErrorText('Please make sure the passwords match');
        }
    }

    return (
        <div className='loginReg_backdrop' style={{ backgroundColor: '#D1CCCC', padding: 0, paddingTop: '20vh', height: 'calc(100% - 20vh)' }}>
            <div className='loginReg_container' style={{ paddingBottom: 50 }}>
                <h2 className='loginReg_text'>Reset Password</h2>

                <form className='loginReg_form' method='POST' onSubmit={resetPassword}>
                    <span className='loginReg_span'>New Password*</span><br></br>
                    <input style={{ height: 50, borderColor: errorText != '' ? 'red' : '#B1AFAF' }} type='password' required name='password' placeholder='New Password' minLength='6' /><br></br>

                    <span className='loginReg_span'>Repeat Password*</span><br></br>
                    <input style={{ height: 50, borderColor: errorText != '' ? 'red' : '#B1AFAF' }} type='password' required name='confirm_password' placeholder='Repeat Password' minLength='6' /><br></br>

                    <p className='loginReg_error_text'>{errorText}</p>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '-8%',
                            marginTop: 20
                        }}
                    >
                        <button disabled={loading == true ? true : false} className='submit' style={{ zoom: 0.8 }}>
                            {
                                loading == true ?
                                    <ReactLoading type={'bubbles'} color={'white'} height={40} width={40} />
                                    : "Save"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;