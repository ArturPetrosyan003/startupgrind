import React from 'react';

import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

const HomeStartup = (props) => {
    return (
        <Zoom>
            <div className='home_startup_container'>
                <img className='home_startup_logo' src={require('../../assets/images/homeCover.png')} />
                <h3 className='home_startup_name' style={{fontSize: props.fontSize}}>{props.text}</h3>
                {
                    props.haveLink ?
                        <Link to='/single'>
                            <p className='home_startup_url'>Learn More</p>
                        </Link>
                        : null
                }
            </div>
        </Zoom>
    );
};

export default HomeStartup;