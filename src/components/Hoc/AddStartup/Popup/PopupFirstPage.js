import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { closeStartupMenu, closeStartupPopup, openStartupMenu } from '../../../redux/actions';

const PopupFirstPage = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {
        if (props.data.logo != null) {
            setData({
                ...props.data,
                logo: props.data.logo.split(',')[1],
                pitchDeck: props.data.pitchDeck.split(',')[1]
            });
        }
    }, []);

    return (
        <>
            <h3>Are you sure you want to quit? All your changes made will be discarded</h3>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25
                }}
            >
                <button
                    className='add_startup_close_popup_button'
                    onClick={() => {
                        props.closeStartupPopup();
                        props.closeStartupMenu();
                    }}
                >
                    Close
                </button>

                <button
                    className='add_startup_close_popup_button'
                    style={{
                        background: '#1976D5',
                        marginLeft: 50
                    }}
                    onClick={() => {
                        props.openStartupMenu(data);
                        props.closeStartupPopup();
                    }}
                >
                    Back to editing
                </button>
            </div>
        </>
    );
};

const mapDispatchToProps = {
    closeStartupMenu,
    closeStartupPopup,
    openStartupMenu
}

export default connect(null, mapDispatchToProps)(PopupFirstPage);