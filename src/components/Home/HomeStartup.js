import React from 'react';

import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

const HomeStartup = (props) => {
    return (
        <Zoom>
            <div className='home_startup_container'>
                <img className='home_startup_logo' src={props.image} />
                <h3 className='home_startup_name'>{props.text}</h3>
                <p className='home_startup_description'>
                    {
                        props.desc.length >= 50 ?
                            props.desc.slice(0, 50).split(' ').slice(0, -1).join(' ') + '...'
                            : props.desc
                    }
                </p>
                {
                    props.hasLink ?
                        <Link to={`/single/${props.text.split(' ').join('-')}`}>
                            <button className='home_startup_button'>More</button>
                        </Link>
                        : null
                }
            </div>
        </Zoom>
    );
};

export default HomeStartup;