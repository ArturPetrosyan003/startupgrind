import React, { useState } from 'react';

import PopupFirstPage from './PopupFirstPage.js';
import PopupSecondPage from './PopupSecondPage.js';
import PopupThirdPage from './PopupThirdPage.js';

const ClosePopup = (props) => {

    const [popupScreen, setPopupScreen] = useState(props.popupScreen);

    const changePopupScreen = () => {
        if (popupScreen == 0) {
            return <PopupFirstPage data={props.data} setPopupScreen={setPopupScreen} functions={props.functions}/>
        }
        else if (popupScreen == 1) {
            return <PopupSecondPage fetchData={props.fetchData} />
        }
        else if (popupScreen == 2) {
            return <PopupThirdPage fetchData={props.fetchData} />
        }
    }

    return (
        <div className='add_startup_close_popup_container'>
            {changePopupScreen()}
        </div>
    );
};



export default ClosePopup;