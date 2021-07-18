import React from 'react';

const PopupBlank = (props) => {
    return (
        <div className='popup_container'>
            <img src={props.img} />
            <h2>{props.label}</h2>
            {props.children}
        </div>
    );
};

export default PopupBlank;