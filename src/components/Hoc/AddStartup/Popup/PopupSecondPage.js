import React from 'react';

import { connect } from 'react-redux';
import { closeStartupMenu, closeStartupPopup } from '../../../redux/actions';

import Checkmark from '../../../../assets/icons/checkmark.png';

const PopupSecondPage = (props) => {
    return (
        <>
            <h3>Saved as Draft</h3>
            <img src={Checkmark} />
            <h3>You can edit anytime later from your profile</h3>
            <button
                className='add_startup_close_popup_button'
                onClick={() => {
                    props.fetchData();
                    props.closeStartupPopup();
                    props.closeStartupMenu();
                }}
                style={{
                    width: 80,
                    height: 40,
                    background: '#1976D5',
                    marginTop: 25
                }}
            >
                OK
            </button>
        </>
    );
};

const mapDispatchToProps = {
    closeStartupMenu,
    closeStartupPopup
}

export default connect(null, mapDispatchToProps)(PopupSecondPage);