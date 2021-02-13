import React from 'react';

import { Link } from 'react-router-dom';

const HomeContent = (props) => {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    return (
        <div id={props.id} className='home_content_container' style={{ backgroundImage: props.background }}>
            <h1 className='home_content_topText' style={props.textStyle}>{props.text}</h1>
            <div className='home_content_startup_container'>
                {props.children}
            </div>

            <Link to={token ? '/startups' : '/'}>
                <button onClick={() => token ? null : props.setOpen(true)} style={{ fontSize: 17 }} className='home_content_button' >{props.buttonText}</button>
            </Link>
        </div >
    );
};

export default HomeContent;