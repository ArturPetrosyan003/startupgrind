import React from 'react';

import { connect } from 'react-redux';
import { closeStartupMenu, closeStartupPopup, closeEditPopup } from '../../../redux/actions';

import { Link } from 'react-router-dom';

import Rocket from '../../../../assets/icons/rocket.png';

const PopupThirdPage = (props) => {
    return (
        <>
            <h3><span>Congratulations!</span></h3>
            <img src={Rocket} />
            <h3 style={{ maxWidth: 500 }}>{props.label}</h3>
            <Link to={props.redirect} style={{ textDecoration: 'none' }}>
                <button
                    className='add_startup_close_popup_button'
                    onClick={() => {
                        props.fetchData();
                        props.closeStartupPopup();
                        props.closeStartupMenu();
                        props.closeEditPopup();
                    }}
                    style={{
                        width: 130,
                        height: 40
                    }}
                >
                    View Page
                </button>
            </Link>
        </>
    );
};

const mapDispatchToProps = {
    closeStartupMenu,
    closeStartupPopup,
    closeEditPopup
}

export default connect(null, mapDispatchToProps)(PopupThirdPage);