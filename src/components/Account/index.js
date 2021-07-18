import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';

import Navbar from '../Hoc/Navbar/Account';

import ProfileImage from '../../assets/icons/profile.png';
import Location from '../../assets/icons/location.png';
import NonActivated from '../../assets/icons/nonActivated.png';
import Add from '../../assets/icons/add.png';

import { connect } from 'react-redux';
import { openStartupMenu, closeStartupMenu } from '../redux/actions';

import AddStartup from '../Hoc/AddStartup/AddStartup';
import AccountStartupItem from './AccountStartupItem';

import Slide from 'react-reveal/Slide';
import PopupBlank from '../Hoc/PopupBlank';

const Account = (props) => {

    const [userInfo, setUserInfo] = useState({});
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startupsLoading, setStartupsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState('');

    useEffect(() => {
        props.closeStartupMenu();
        fetchUser();
        fetchStartups();
        setShowPopup(localStorage.getItem('account-popup'));
    }, []);

    const fetchUser = async () => {
        const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/users/${props.match.params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setUserInfo(fetchedData.data);
            setLoading(false);
        }
        else {
            console.log(fetchedData.errors);
            setLoading(false);
        }
    }

    const fetchStartups = async () => {
        setStartupsLoading(true);

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/startups/mine', {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setStartups(fetchedData.data);
            setStartupsLoading(false);
        }
        else {
            console.log(fetchedData.errors);
            setStartupsLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            {
                showPopup == 'true' || localStorage.getItem('account-popup') == 'true' ?
                    <PopupBlank label='Welcome to StarTribe'>
                        <button
                            className='add_startup_close_popup_button'
                            style={{
                                backgroundColor: '#1976D5',
                                boxShadow: 'none'
                            }}
                            onClick={() => setShowPopup(localStorage.setItem('account-popup', false))}
                        >
                            Get started
                        </button>
                    </PopupBlank>
                    : null
            }
            {
                props.startupMenuState.open == true ?
                    <AddStartup
                        data={props.startupMenuState.data}
                        fetchData={fetchStartups}
                    />
                    : null
            }

            <div className='account_content'>
                {
                    loading ?
                        <Loading
                            height={80}
                            width={80}
                            color='#2998F6'
                            type='bubbles'
                        />
                        :
                        <>
                            <div className='account_content_left'>
                                <Slide left duration={1000}>
                                    <div className='account_info_container'>
                                        <div className='account_info_container_left'>
                                            <img
                                                className='account_profile_image'
                                                src={ProfileImage}
                                            />
                                            <div className='account_info_container_left_bottom'>
                                                <img src={Location} />
                                                <p>Gyumri, Armenia</p>
                                            </div>
                                        </div>

                                        <div className='account_info_container_right'>
                                            <div className='account_info_container_right_left'>
                                                <div className='account_info_container_right_info'>
                                                    <h2>
                                                        {userInfo.name + ' ' + userInfo.surname}
                                                    </h2>
                                                    {
                                                        !userInfo.isActivated ?
                                                            <div className='account_warning_container'>
                                                                <img src={NonActivated} />
                                                                <span className='account_tooltip'>Please activate your account via email</span>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                                <h4>Chapter Director at Startup Grind</h4>
                                            </div>
                                        </div>

                                        <button className='account_edit_button'>
                                            Edit Profile
                                        </button>
                                    </div>
                                </Slide>

                                <Slide left delay={100} duration={1000}>
                                    <div className='account_startups_container'>
                                        <div className='account_startups_container_top'>
                                            <h2>My startups</h2>
                                            {
                                                startups.length != 0 ?
                                                    <button
                                                        className='account_add_startup_button'
                                                        onClick={() => props.openStartupMenu()}
                                                    >
                                                        <img src={Add} />
                                                    </button>
                                                    : null
                                            }
                                        </div>

                                        <div
                                            className='account_startups_container_bottom'
                                            style={{
                                                justifyContent: startups.length == 0 ? 'center' : 'flex-start',
                                            }}
                                        >
                                            {
                                                startupsLoading == true ?
                                                    <Loading
                                                        height={60}
                                                        width={60}
                                                        color='#2998F6'
                                                        type='bubbles'
                                                    />
                                                    :
                                                    startups.length == 0 ?
                                                        <>
                                                            <p className='account_startups_container_empty_text'>
                                                                You don’t have any startup yet
                                                            </p>
                                                            <button
                                                                className='account_startup_btn'
                                                                disabled={userInfo.isActivated ? false : true}
                                                                onClick={() => props.openStartupMenu()}
                                                                style={{
                                                                    backgroundColor: userInfo.isActivated ? '#1976D5' : '#7BA4CF',
                                                                    cursor: userInfo.isActivated ? 'pointer' : 'default'
                                                                }}
                                                            >
                                                                Add Startup
                                                            </button>
                                                            <p className='account_startups_container_empty_text'>
                                                                Please activate your account via email to add your startup
                                                            </p>
                                                        </>
                                                        :
                                                        startups.map((i, index) => (
                                                            <AccountStartupItem
                                                                key={index}
                                                                data={i}
                                                                openStartupMenu={props.openStartupMenu}
                                                            />
                                                        ))
                                            }
                                        </div>
                                    </div>
                                </Slide>
                            </div>

                            <Slide right duration={1000} delay={100}>
                                <div className='account_right_container'>
                                    <h3>Here can be something :)</h3>
                                </div>
                            </Slide>
                        </>
                }
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        startupMenuState: state.startup,
    }
}

const mapDispatchToProps = {
    openStartupMenu,
    closeStartupMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);