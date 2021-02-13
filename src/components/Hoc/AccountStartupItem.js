import React from 'react';

import Location from '../../assets/icons/location.png';

const AccountStartupItem = (props) => {

    return (
        <div className='account_startup_container'>
            <div className='account_startup_left'>
                <img src={`data:image/png;base64, ${props.data.logo}`} />
            </div>

            <div className='account_startup_right'>
                <h3>
                    {props.data.startupName}
                    <span
                        style={{
                            marginLeft: 5,
                            color: '#706E6E',
                            fontSize: 15,
                            fontStyle: 'italic'
                        }}
                    >
                        {props.data.isPublished == false ? '(Draft)' : ''}
                    </span>
                </h3>

                <p>{props.data.headline}</p>
                <p>
                    {
                        new Date(props.data.launchDate).getFullYear() < 2013 ?
                        '-'
                        : new Date(props.data.launchDate).getFullYear()
                    }
                </p>

                <span
                    style={{
                        color: '#706E6E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 5
                    }}
                >
                    <img style={{ width: 15, height: 15 }} src={Location} />
                    <p
                        style={{
                            marginBottom: 0,
                            marginLeft: 2
                        }}
                    >
                        {props.data.city}, {props.data.country}
                    </p>
                </span>

                <p>{props.data.description}</p>

                <div className='account_startup_button_container'>
                    <button
                        onClick={() => props.openStartupMenu(props.data)}
                    >
                        Edit Startup
                    </button>

                    <button
                        style={{
                            width: 185,
                            background: '#1976D5',
                            marginLeft: 20
                        }}
                    >
                        View Startup Page
                    </button>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default AccountStartupItem;