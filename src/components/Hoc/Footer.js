import React from 'react';

import { Link } from 'react-router-dom';

const Footer = (props) => {
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
                            <img src={require('../../assets/icons/facebook.png')} />
                        </Link>

                        <Link>
                            <img src={require('../../assets/icons/twitter.png')} />
                        </Link>

                        <Link>
                            <img src={require('../../assets/icons/linkedin.png')} />
                        </Link>

                        <Link>
                            <img src={require('../../assets/icons/instagram.png')} />
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

                    <form>
                        <input type='email' placeholder='Enter your Email' /><br></br>
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
            
            <button className='footer_goTop' onClick={() => window.scrollTo(0, 0)}>
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