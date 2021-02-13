import React, { useEffect } from 'react';
import Loading from 'react-loading';

import queryString from 'query-string';
import { useHistory } from 'react-router';

const UserActivation = (props) => {

    const query = queryString.parse(props.location.search);
    const history = useHistory();

    useEffect(() => {
        activateUser(query.token);
    }, []);

    const activateUser = async (token) => {
        const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/users/activation?token=${token}`)
        const response = await request.json();

        if(response.data.isActivated){
            history.push(`/account/${localStorage.getItem('_id') || sessionStorage.getItem('_id')}`);
        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Loading
                height={80}
                width={80}
                color='#2998F6'
                type='bubbles'
            />
        </div>
    );
};

export default UserActivation;