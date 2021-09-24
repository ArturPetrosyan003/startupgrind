import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {

    const [errorText, setErrorText] = useState('Subscribe');
    const form = useRef(null);

    const subscribe = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/mailchimp/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: formData.get('email'),
                status: 'subscribed',
                tags: [
                    'subscription_form'
                ]
            })
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setErrorText('Subscribed!');

            setTimeout(() => {
                form.current.reset();
                setErrorText('Subscribe');
            }, 2000);
        }
        else {
            setErrorText('Something went wrong');

            setTimeout(() => {
                form.current.reset();
                setErrorText('Subscribe');
            }, 2000);
        }
    }

    return (
        <div className='footer'>
            <div className='footer_content'>
                <div className='footer_left'>
                    <h3>ABOUT US</h3>
                    <p>We want to help bring tanalnted students and unique startups together</p>

                    <h3 className='footer_contact_h3'>CONTACT US</h3>

                    <div className='footer_contact_wrapper'>
                        <img src={require('../../assets/icons/telephone.png')} />
                        <p>+374 55 55 55 55</p>
                    </div>


                    <div className='footer_contact_wrapper'>
                        <img src={require('../../assets/icons/mail.png')} />
                        <p>yourmail.info.am</p>
                    </div>

                    <div className='footer_social_icons'>
                        <Link>
                            <img src={require('../../assets/icons/social/facebook.png')} />
                        </Link>

                        <Link>
                            <img src={require('../../assets/icons/social/twitter.png')} />
                        </Link>

                        <Link>
                            <img src={require('../../assets/icons/social/linkedin.png')} />
                        </Link>

                        <Link>
                            <img src={require('../../assets/icons/social/instagram.png')} />
                        </Link>
                    </div>
                </div>

                <div className='footer_center'>
                    <h3>INFORMATION</h3>
                    <Link to='/about'>
                        About
                    </Link>

                    <Link to='/startups'>
                        Startups
                    </Link>

                    <Link to='/blog'>
                        Blog
                    </Link>

                    <Link to='/contact'>
                        Contact Us
                    </Link>
                </div>

                <div className='footer_right'>
                    <h3>Subscribe for Updates</h3>

                    <form ref={form} onSubmit={subscribe}>
                        <input required type='email' name='email' placeholder='Enter your Email' />
                        <br></br>
                        <button>{errorText}</button>
                    </form>
                </div>
            </div>

            <button
                className='footer_goTop'
                onClick={() => window.scrollTo(0, 0)}
            >
                <img src={require('../../assets/icons/arrowTopWhite.png')} />
            </button>

            <hr></hr>
            <div className='footer_bottom_info'>
                <h3>All Right reserved</h3>
                <h3>Copyright {new Date().getFullYear()}</h3>
            </div>
        </div>
    );
};

export default Footer;