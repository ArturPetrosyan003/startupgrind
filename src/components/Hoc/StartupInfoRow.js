import React from 'react';

const StartupInfoRow = (props) => {
    return (
        <>
            <div className='startup_info_row'>
                <p style={{ fontWeight: 'bold' }}>{props.label}</p>
                <p>{props.value}</p>
            </div>
            <hr />
        </>
    );
};

export default StartupInfoRow;