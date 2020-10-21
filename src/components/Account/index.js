import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';

import Navbar from '../Hoc/Navbar/Account';
import SideMenu from './SideMenu';

const Account = (props) => {

    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [openMenu, setOpenMenu] = useState(false);
    const [padding, setPadding] = useState(0);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const data = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/users/${props.match.params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        const fetchedData = await data.json();

        if (fetchedData) {
            setUserInfo(fetchedData);
            setLoading(false);
        }
    }

    const menuHandler = () => {
        setOpenMenu(!openMenu);
        if(openMenu == false){
            setPadding(250)
        }
        else {
            setPadding(0)
        }
    }

    return (
        <>
            <Navbar/>

            <div 
                className='account_content' 
                
            >
                <div className='account_burger_menu' onClick={() => menuHandler()}
                    style={{
                        marginLeft: padding,
                        transition: 'margin-left 0.35s linear'
                    }}
                >
                    <img className='burger_menu_icon' src={require('../../assets/icons/menu.png')} />
                </div>

                <SideMenu open={openMenu} transition={500}/>

                <div className='account_info_container'>
                    {
                        loading ?
                            <Loading
                                height={80}
                                width={80}
                                color='#212596'
                                type='spin'
                                className='account_loading'
                            />
                            :
                            <>
                                <img className='account_profile_image' src={require('../../assets/icons/profile.png')} />
                                <div className='account_info_main'>
                                    <h2 className='account_name'>{userInfo.data.name + ' ' + userInfo.data.surname}</h2>
                                    <textarea
                                        className='account_summary'
                                        placeholder='Profile Summary'
                                    />
                                    <button className='account_startup_btn'>Add My Startup</button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default Account;