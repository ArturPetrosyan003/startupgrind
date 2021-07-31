import React, { useState, useRef } from 'react';
import Loading from 'react-loading';

import ContactImage from '../../assets/images/contact.png';

const Contact = () => {

    const form = useRef(null);

    const [loading, setLoading] = useState(false);

    const sendEmail = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            })
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setLoading(false);
            form.current.reset();
            console.log(fetchedData);
        }
        else {
            setLoading(false);
            console.error(fetchedData.errors);
        }
    }

    return (
        <div className='contact_container'>
            <div className='contact_left'>
                <h1>Contact us</h1>
                <p>Contact us and we will get back to you in 24 hours</p>

                <form method='POST' onSubmit={sendEmail} ref={form}>
                    <fieldset disabled={loading}>
                        <input required className='input' type='text' name='name' placeholder='Name' /><br />
                        <input required className='input' type='email' name='email' placeholder='Email adress' /><br />
                        <textarea required className='input' name="message" placeholder='Your message' /><br />
                        <button
                            className='contact_send_button'
                            style={{
                                cursor: loading ? 'default' : 'pointer'
                            }}
                        >
                            {
                                loading ?
                                    <Loading
                                        height={60}
                                        width={60}
                                        color='#2998F6'
                                        type='bubbles'
                                    />
                                    : 'Send'
                            }
                        </button>
                    </fieldset>
                </form>
            </div>
            <img src={ContactImage} />
        </div>
    );
};

export default Contact;