import React from 'react';

import ContactImage from '../../assets/images/contact.png';

const Contact = () => {
    return (
        <div className='contact_container'>
            <div className='contact_left'>
                <h1>Contact us</h1>
                <p>Contact us and we will get back to you in 24 hours</p>

                <form>
                    <input required className='input' type='text' name='name' placeholder='Name' /><br />
                    <input required className='input' type='email' name='email' placeholder='Email adress' /><br />
                    <textarea required className='input' name="message" placeholder='Your message' /><br />
                    <input className='contact_send_button' type='submit' value='Send' />
                </form>
            </div>
            <img src={ContactImage} />
        </div>
    );
};

export default Contact;