import React from 'react';

import { Link } from 'react-router-dom';

const HomeContent = (props) => {

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    return (
        <div
            id={props.id}
            className='home_content_container'
            style={{
                background: props.background
            }}
        >
            <h1
                className='home_content_topText'
                style={props.textStyle}
            >
                {props.text}
            </h1>

            <div className='home_content_startup_container'>
                {props.children}
            </div>

            <Link to={token ? '/startups' : '/'}>
                <button
                    className='home_content_button'
                    onClick={() => token ? null : props.setOpen(true)}
                    style={{
                        fontSize: 20
                    }}
                >
                    {props.buttonText}
                </button>
            </Link>
        </div >
    );
};

export default HomeContent;