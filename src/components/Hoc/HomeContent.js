import React from 'react';

import { Link } from 'react-router-dom';

const HomeContent = (props) => {

    const token = localStorage.getItem('token');

    return (
        <div id={props.id} className='home_content_container' style={{ backgroundColor: props.background }}>
            <h1 className='home_content_topText' style={{ fontSize: props.fontSize }}>{props.text}</h1>
            <div className='home_content_startup_container'>
                {props.children}
            </div>
            
            <Link to={token ? '/startups' : '/'}>
                <button onClick={() => token ? null : props.setOpen(true)} className='home_content_button'>More</button>
            </Link>
        </div>
    );
};

export default HomeContent;