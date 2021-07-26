import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Cover from '../../../assets/images/startupCover.png';
import PitchDeck from '../../../assets/images/pitchDeck.png';

import InstagramBlue from '../../../assets/icons/social/startups/instagram-blue.png';
import InstagramDisabled from '../../../assets/icons/social/startups/instagram-disabled.png';
import FacebookBlue from '../../../assets/icons/social/startups/facebook-blue.png';
import FacebookDisabled from '../../../assets/icons/social/startups/facebook-disabled.png';
import TwitterBlue from '../../../assets/icons/social/startups/twitter-blue.png';
import TwitterDisabled from '../../../assets/icons/social/startups/twitter-disabled.png';
import LinkedinBlue from '../../../assets/icons/social/startups/linkedin-blue.png';
import LinkedinDisabled from '../../../assets/icons/social/startups/linkedin-disabled.png';
import WebBlue from '../../../assets/icons/social/startups/web-blue.png';
import WebDisabled from '../../../assets/icons/social/startups/web-disabled.png';

import StartupInfoRow from '../../Hoc/StartupInfoRow';

import { connect } from 'react-redux';
import { openStartupMenu, closeStartupMenu } from '../../redux/actions';

import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Loading from 'react-loading';
import AddStartup from '../../Hoc/AddStartup/AddStartup';

const SingleStartup = (props) => {

    const [data, setData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false);

    const userId = localStorage.getItem('_id') || sessionStorage.getItem('_id');

    useEffect(() => {
        props.closeStartupMenu();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);

        const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setUserData(fetchedData.data);
            fetchStartup();
        }
        else {
            console.log(fetchedData.errors);
            setLoading(false);
        }
    }

    const fetchStartup = async () => {
        const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/startups/${props.match.params.name}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            }
        });

        const fetchedData = await request.json();
        console.log(fetchedData.data);

        if (!fetchedData.errors) {
            setLoading(false);
            setData(fetchedData.data);
        }
        else {
            setLoading(false);
            console.log(fetchedData.errors);
        }
    }

    const followStartup = async () => {
        if(!following){
            const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/startups/${data._id}/follows`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            const fetchedData = await request.json();

            if(!fetchedData.errors){
                setFollowing(!following);
            }
            else {
                console.error(fetchedData.errors);
            }
        }
        // else {
        //     const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/startups/${data._id}/follows`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'token': localStorage.getItem('token')
        //         }
        //     });
        //     const fetchedData = await request.json();

        //     if(!fetchedData.errors){
        //         setFollowing(!following);
        //     }
        //     else {
        //         console.error(fetchedData.errors);
        //     }
        // }
    }

    return (
        <>
            {
                props.startupMenuState.open == true ?
                    <AddStartup
                        data={data}
                        fetchData={fetchUser}
                    />
                    : null
            }

            <div className='startup_container'>
                {
                    loading || data == null ?
                        <Loading
                            className='loading'
                            height={80}
                            width={80}
                            color='#2998F6'
                            type='bubbles'
                        />
                        :
                        <>
                            <Fade duration={1000} >
                                <div className='startup_cover_container'>
                                    <img src={Cover} />
                                </div>
                            </Fade >

                            <div className='startup_info_container'>
                                <Slide bottom duration={1000}>
                                    <div className='startup_info_container_left'>
                                        <div className='startup_info_container_left_top'>
                                            {
                                                data.userId == userData._id ?
                                                    <button onClick={() => props.openStartupMenu()}>Edit</button>
                                                    : null
                                            }
                                            <img src={`data:image/png;base64, ${data.logo}`} />
                                            <h2>{data.startupName}</h2>
                                            <p>{data.headline}</p>
                                        </div>

                                        <div className='startup_info_container_left_bottom'>
                                            <StartupInfoRow label='Published by' value={data.founder} />
                                            <StartupInfoRow label='Followers' value={data.followersCount} />

                                            <div className='startup_info_buttons_container'>
                                                <button
                                                    onClick={() => followStartup()}
                                                >
                                                    {
                                                        following == true ?
                                                            'Unfollow'
                                                            : 'Follow'
                                                    }
                                                </button>

                                                <button
                                                    style={{
                                                        background: 'transparent',
                                                        border: '1px solid #1976D5',
                                                        color: '#1976D5'
                                                    }}
                                                >
                                                    Contact
                                                </button>
                                            </div>

                                            <StartupInfoRow label='Stage' value={data.stage} />
                                            <StartupInfoRow label='Founder' value={data.founder} />
                                            <StartupInfoRow
                                                label='Industry'
                                                value={
                                                    data.industry.map((i, index) => {
                                                        if (index < data.industry.length - 1) {
                                                            return i + ', ';
                                                        }
                                                        else {
                                                            return i + '';
                                                        }
                                                    })
                                                }
                                            />
                                            <StartupInfoRow label='Country' value={data.country} />
                                            <StartupInfoRow label='City' value={data.city} />
                                            <StartupInfoRow label='Product type' value={data.buildType} />
                                            <StartupInfoRow label='Launched' value={new Date(data.launchDate).getFullYear()} />
                                            <StartupInfoRow label='Incorporation type' value={data.legalStatus} />
                                            <StartupInfoRow label='fundingExists raised' value={data.fundingStage} />
                                            <StartupInfoRow label='fundingExists source' value={data.fundingSource} />
                                            <StartupInfoRow label='Employees' value={data.employeesNumber.min + '-' + data.employeesNumber.max} />

                                            <div className='startup_info_icon_container'>
                                                <a href={data.urls.instagram != '' ? `https://www.instagram.com/${data.urls.instagram.split('@')[1]}` : null} target='_blank'>
                                                    <img src={data.urls.instagram == '' ? InstagramDisabled : InstagramBlue} />
                                                </a>

                                                <a href={data.urls.facebook != '' ? data.urls.facebook : null} target='_blank'>
                                                    <img src={data.urls.facebook == '' ? FacebookDisabled : FacebookBlue} />
                                                </a>

                                                <a href='/' target='_blank'>
                                                    <img src={data.urls.twitter == '' ? TwitterDisabled : TwitterBlue} />
                                                </a>

                                                <a href={data.urls.linkedin != '' ? data.urls.linkedin : null} target='_blank'>
                                                    <img src={data.urls.linkedin == '' ? LinkedinDisabled : LinkedinBlue} />
                                                </a>

                                                <a href={data.urls.website != '' ? data.urls.website : null} target='_blank'>
                                                    <img src={data.urls.website == '' ? WebDisabled : WebBlue} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Slide>

                                <Slide right duration={1000}>
                                    <div className='startup_info_container_right'>
                                        <div className='startup_info_container_right_top'>
                                            <h3>About startup</h3>
                                            <hr />
                                            <p>{data.description}</p>
                                        </div>

                                        <div className='startup_info_container_right_bottom'>
                                            <h3>Pitch Deck</h3>
                                            <hr />
                                            <img src={PitchDeck} />
                                        </div>
                                    </div>
                                </Slide>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleStartup);