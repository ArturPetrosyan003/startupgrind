import React from 'react';

import StartupInfoRow from '../Hoc/StartupInfoRow';

import { Link } from 'react-router-dom';

const StartupCard = (props) => {
    return (
        <div className='card_container'>
            <div className='card_front'>
                <img src={'data:image/png;base64,' + props.data.logo} />
                <h2>{props.data.startupName}</h2>
                <p>{props.data.description}</p>
            </div>

            <div className='card_back'>
                <StartupInfoRow
                    label='Industry'
                    value={
                        props.data.industry.map((i, index) => {
                            if (index < props.data.industry.length - 1) {
                                return i + ', ';
                            }
                            else {
                                return i + '';
                            }
                        })
                    }
                />
                <StartupInfoRow label='Year of launch' value={new Date(props.data.launchDate).getFullYear()} />
                <StartupInfoRow label='Product type' value={props.data.buildType} />
                <StartupInfoRow label='Funding raised' value={props.data.fundingExists ? 'Yes' : 'No'} />
                <StartupInfoRow label='Number of followers' value={props.data.followersCount} />

                <Link to={`/single/${props.data.lowercaseName}`} className='card_button'>
                    Show more
                </Link>
            </div>
        </div >
    );
};

export default StartupCard;