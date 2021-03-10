import React from 'react';
import { Link } from 'react-router-dom';

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
                    <span>
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

                <span className='account_startup_right_location_span'>
                    <img style={{ width: 15, height: 15 }} src={Location} />
                    <p>
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

                    <Link
                        to={{
                            pathname: `/account/startups/${props.data.startupName.split(' ').join('-')}`,
                            id: props.data._id
                        }}
                    >
                        <button
                            style={{
                                width: 185,
                                background: '#1976D5',
                                marginLeft: 20
                            }}
                        >
                            View Startup Page
                        </button>
                    </Link>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default AccountStartupItem;