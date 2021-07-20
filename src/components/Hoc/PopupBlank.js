import React from 'react';

import Zoom from 'react-reveal/Zoom';

const PopupBlank = (props) => {
    return (
        <div className='popup_wrapper'>
            <Zoom duration={1000}>
                <div className='popup_container'>
                    <img src={props.img} />
                    <h2>{props.label}</h2>
                    {props.children}
                </div>
            </Zoom>
        </div>
    );
};

export default PopupBlank;