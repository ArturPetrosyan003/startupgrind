import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';

import Navbar from '../Hoc/Navbar/Account';

import ProfileImage from '../../assets/icons/profile.png';
import Location from '../../assets/icons/location.png';
import NonActivated from '../../assets/icons/nonActivated.png';
import Add from '../../assets/icons/add.png';
import PopupImage from '../../assets/images/popup.png';

import { connect } from 'react-redux';
import { openStartupMenu, closeStartupMenu, openEditPopup } from '../redux/actions';

import AddStartup from '../Hoc/AddStartup/AddStartup';
import AccountStartupItem from './AccountStartupItem';

import Slide from 'react-reveal/Slide';
import PopupBlank from '../Hoc/PopupBlank';
import EditProfile from '../Hoc/EditProfile';
import { Link } from 'react-router-dom';

const Account = (props) => {

    const [userData, setUserData] = useState({});
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startupsLoading, setStartupsLoading] = useState([true, true]);
    const [showPopup, setShowPopup] = useState(['', ''])
    const [randomStartups, setRandomStartups] = useState([]);

    useEffect(() => {
        props.closeStartupMenu();
        fetchUser();
        fetchStartups();
        fetchRandomStartups();
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
            setUserData(fetchedData.data);
            setLoading(false);
        }
        else {
            console.log(fetchedData.errors);
            setLoading(false);
        }
    }

    const fetchStartups = async () => {
        setStartupsLoading([true,]);

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/startups/mine', {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setStartups(fetchedData.data);
            setStartupsLoading([false,]);
        }
        else {
            console.log(fetchedData.errors);
            setStartupsLoading([false,]);
        }
    }

    const resendLink = async () => {
        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/passwords', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const fetchedData = await request.json();

        console.log(fetchedData);
    }

    const fetchRandomStartups = async () => {
        setStartupsLoading([, true]);

        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/startups?limit=4');
        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setRandomStartups(fetchedData.data);
            setStartupsLoading([, false]);
            console.log(fetchedData);
        }
        else {
            console.error(fetchedData.errors);
            setStartupsLoading([, false]);
        }
    }

    return (
        <>
            <Navbar />
            {
                props.editProfileState ?
                    <EditProfile
                        data={userData}
                        fetchData={fetchUser}
                    />
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
            {
                showPopup == 'true' ?
                    <PopupBlank img={PopupImage} label='Welcome to StarTribe'>
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
                    :

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
                                                        src={userData.avatar ? `data:image/png;base64, ${userData.avatar}` : ProfileImage}
                                                    />
                                                    <div className='account_info_container_left_bottom'>
                                                        <img src={Location} />
                                                        <p>{userData.city ? userData.city + ', ' + userData.country : 'Your location'}</p>
                                                    </div>
                                                </div>

                                                <div className='account_info_container_right'>
                                                    <div className='account_info_container_right_left'>
                                                        <div className='account_info_container_right_info'>
                                                            <h2>
                                                                {userData.name + ' ' + userData.surname}
                                                            </h2>
                                                            {
                                                                !userData.isActivated ?
                                                                    <div className='account_warning_container'>
                                                                        <img src={NonActivated} />
                                                                        <span className='account_tooltip'>Please activate your account via email</span>
                                                                    </div>
                                                                    : null
                                                            }
                                                        </div>
                                                        <h4>{userData.headline || 'Your headline'}</h4>
                                                    </div>
                                                </div>

                                                <button
                                                    className='account_edit_button'
                                                    onClick={() => props.openEditPopup()}
                                                >
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
                                                        startupsLoading[0] == true ?
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
                                                                        disabled={userData.isActivated ? false : true}
                                                                        onClick={() => props.openStartupMenu()}
                                                                        style={{
                                                                            backgroundColor: userData.isActivated ? '#1976D5' : '#7BA4CF',
                                                                            cursor: userData.isActivated ? 'pointer' : 'default'
                                                                        }}
                                                                    >
                                                                        Add Startup
                                                                    </button>
                                                                    <p
                                                                        className='account_startups_container_empty_text'
                                                                        style={{
                                                                            display: userData.isActivated ? 'none' : 'block'
                                                                        }}
                                                                    >
                                                                        Please activate your account via email to add your startup
                                                                    </p>
                                                                    <button
                                                                        className='resend_link'
                                                                        onClick={() => resendLink()}
                                                                        style={{
                                                                            display: userData.isActivated ? 'none' : 'inline-block'
                                                                        }}
                                                                    >
                                                                        Request a new activation link
                                                                    </button>
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
                                            <h3>Startups</h3>
                                            {
                                                startupsLoading[1] == true ?
                                                    <Loading
                                                        height={60}
                                                        width={60}
                                                        color='#2998F6'
                                                        type='bubbles'
                                                    />
                                                    :
                                                    randomStartups.map((i, index) => (
                                                        <div key={index} className='random_startup_card'>
                                                            <div className='random_startup_content'>
                                                                <img src={`data:image/png;base64, ${i.logo}`} />
                                                                <div>
                                                                    <h3>{i.startupName}</h3>
                                                                    <p>{i.description}</p>
                                                                </div>
                                                            </div>
                                                            <Link to={`/single/${i.lowercaseName}`}>
                                                                <button>Show more</button>
                                                            </Link>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </Slide>
                                </>
                        }
                    </div>
            }
        </>
    );
};

const mapStateToProps = state => {
    return {
        startupMenuState: state.startup,
        editProfileState: state.profileEdit
    }
}

const mapDispatchToProps = {
    openStartupMenu,
    closeStartupMenu,
    openEditPopup
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);