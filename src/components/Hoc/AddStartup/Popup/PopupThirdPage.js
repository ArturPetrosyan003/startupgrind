import React from 'react';

import { connect } from 'react-redux';
import { closeStartupMenu, closeStartupPopup } from '../../../redux/actions';

import Rocket from '../../../../assets/icons/rocket.png';

const PopupThirdPage = (props) => {
    return (
        <>
            <h3><span>Congratulations!</span></h3>
            <img src={Rocket} />
            <h3 style={{ maxWidth: 500 }}>Your startup is successfully saved and published</h3>
            <button
                className='add_startup_close_popup_button'
                onClick={() => {
                    props.fetchData();
                    props.closeStartupPopup();
                    props.closeStartupMenu();
                }}
                style={{
                    width: 130,
                    height: 40
                }}
            >
                View Page
            </button>
        </>
    );
};

const mapDispatchToProps = {
    closeStartupMenu,
    closeStartupPopup
}

export default connect(null, mapDispatchToProps)(PopupThirdPage);