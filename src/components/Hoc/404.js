import React from 'react';

const EmptyPage = (props) => {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className='text_404'>Page not found :(</h1>
        </div>
    );
};

export default EmptyPage;