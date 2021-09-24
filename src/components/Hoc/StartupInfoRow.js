import React from 'react';

const StartupInfoRow = (props) => {
    return (
        <>
            <div className='startup_info_row'>
                <p style={{ fontWeight: 'bold', marginRight: 20 }}>{props.label}</p>
                <p style={{maxWidth: 150}} >{props.value}</p>
            </div>
            <hr />
        </>
    );
};

export default StartupInfoRow;