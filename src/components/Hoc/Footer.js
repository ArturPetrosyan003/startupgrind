import React from 'react';

import { Link } from 'react-router-dom';

const Footer = () => {

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
                    <Link>
                        About
                    </Link>

                    <Link>
                        Startups
                    </Link>

                    <Link>
                        Blog
                    </Link>

                    <Link>
                        Contact Us
                    </Link>

                    <Link>
                        Support
                    </Link>
                </div>

                <div className='footer_right'>
                    <h3>Subscribe for Updates</h3>

                    <form onSubmit={subscribe}>
                        <input required type='email' name='email' placeholder='Enter your Email' />
                        <br></br>
                        <button>Subscribe</button>
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