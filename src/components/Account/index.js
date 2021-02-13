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
import AccountStartupItem from '../Hoc/AccountStartupItem';

import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';

const Account = (props) => {

    const [userInfo, setUserInfo] = useState({});
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startupsLoading, setStartupsLoading] = useState(true);

    useEffect(() => {
        fetchUser();
        fetchStartups();
    }, []);

    const fetchUser = async () => {
        try {
            const data = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/users/${props.match.params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token') || sessionStorage.getItem('token')
                }
            });
            const fetchedData = await data.json();

            if (!fetchedData.errors) {
                setUserInfo(fetchedData.data);
                setLoading(false);
            }
        }
        catch (error) {
            setLoading(true);
        }
    }

    const fetchStartups = async () => {
        try {
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
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar />

            {
                props.startupMenuState.open == true ?
                    <AddStartup
                        data={props.startupMenuState.data}
                        fetchStartups={fetchStartups}
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
                            className='account_loading'
                        />
                        :
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '60%',
                                    alignSelf: 'flex-start',
                                    marginTop: '55px'
                                }}
                            >
                                <Slide left duration={1000}>
                                    <div className='account_info_container'>
                                        <div className='account_info_container_left'>
                                            <img
                                                className='account_profile_image'
                                                src={ProfileImage}
                                            />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <img
                                                    src={Location}
                                                    style={{
                                                        width: 15,
                                                        height: 15
                                                    }}
                                                />
                                                <p>Gyumri, Armenia</p>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                height: '100%',
                                                display: 'flex'
                                            }}
                                        >
                                            <div className='account_info_container_right'>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        width: '100%'
                                                    }}
                                                >
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
                                            <div className='account_info_button_container'>
                                                <button className='account_edit_button'>
                                                    Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Slide>

                                <Slide left delay={100} duration={1000}>
                                    <div className='account_startups_container'>
                                        <div
                                            style={{
                                                width: '100%',
                                                paddingLeft: 40,
                                                paddingRight: 40,
                                                boxSizing: 'border-box',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
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
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: startups.length == 0 ? 'center' : 'flex-start',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {
                                                startupsLoading == true ?
                                                    <Loading
                                                        height={60}
                                                        width={60}
                                                        color='#2998F6'
                                                        type='bubbles'
                                                        className='account_loading'
                                                    />
                                                    :
                                                    startups.length == 0 ?
                                                        <>
                                                            <p
                                                                style={{
                                                                    color: '#AEAEAE',
                                                                    fontWeight: 500,
                                                                    marginBottom: 30
                                                                }}
                                                            >
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