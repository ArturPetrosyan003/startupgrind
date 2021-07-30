import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { closeStartupMenu, closeStartupPopup, openStartupMenu, closeEditPopup } from '../../../redux/actions';

const PopupFirstPage = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {
        if (props.data && props.data.logo != null) {
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
                        props.closeEditPopup();
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
                        props.functions.open(data);
                        props.functions.close();
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
    openStartupMenu,
    closeEditPopup
}

export default connect(null, mapDispatchToProps)(PopupFirstPage);