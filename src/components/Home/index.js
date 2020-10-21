import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Slider from "react-slick";

import HomeContent from '../Hoc/HomeContent';
import HomeStartup from '../Hoc/HomeStartup';

class Home extends Component {

    state = {
        settings: {
            autoplay: false,
            infinite: false,
            dots: true,
            arrows: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            adaptiveHeight: true,
            className: 'carousel',
            centerMode: false,
        },
        token: null
    }

    componentDidMount() {
        this.setState({
            token: localStorage.getItem('token')
        })
        this.windowResizeHandler(window.innerWidth)
        window.addEventListener('resize', () => {
            this.windowResizeHandler(document.documentElement.clientWidth)
        })
    }

    windowResizeHandler = (value) => {
        const settings = this.state.settings

        if (value < 480) {
            settings.slidesToScroll = 1
            settings.slidesToShow = 1

            this.setState({
                ...settings,
            })
        }
        else {
            settings.slidesToScroll = 3
            settings.slidesToShow = 3

            this.setState({
                ...settings,
            })
        }
    }

    render() {
        return (
            <div className='home_container'>
                <div className='home_cover_image'>
                    <div className='home_center_container'>
                        <h1 className='home_center_text'>FIRST OPEN SOURCE DATABASE FOR ARMENIAN STARTUPS</h1>

                        <div className='home_buttons_container'>
                            <Link to={this.state.token ? '/startups' : '/'}>
                                <button className='home_button'>Explore Startups</button>
                            </Link>

                            <Link to={this.state.token ? '/profile/add-startup' : '/'}>
                                <button className='home_button'>Add My Startup</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='home_content'>
                    <HomeContent
                        text='Explore Startups'
                        fontSize={48}
                        background='#fff'
                        id='home_startups_first'
                    >
                        <HomeStartup
                            haveLink={true}
                            fontSize={32}
                            text='Startup Name'
                        />
                        <HomeStartup
                            haveLink={true}
                            fontSize={32}
                            text='Startup Name'
                        />
                        <HomeStartup
                            haveLink={true}
                            fontSize={32}
                            text='Startup Name'
                        />
                    </HomeContent>

                    <HomeContent
                        text='Highlights from Armenian Startup Ecosystem'
                        fontSize={36}
                        background='#dadada'
                        id='home_startups_second'
                    >
                        <Slider {...this.state.settings}>
                            <HomeStartup
                                haveLink={false}
                                fontSize={20}
                                text='Armenian Startup Krisp raises $Mln from Venture fund'
                            />
                            <HomeStartup
                                haveLink={false}
                                fontSize={20}
                                text='Armenian Startup Krisp raises $Mln from Venture fund'
                            />
                            <HomeStartup
                                haveLink={false}
                                fontSize={20}
                                text='Armenian Startup Krisp raises $Mln from Venture fund'
                            />
                            <HomeStartup
                                haveLink={false}
                                fontSize={20}
                                text='Armenian Startup Krisp raises $Mln from Venture fund'
                            />
                        </Slider>
                    </HomeContent>

                    <HomeContent
                        text='Opportunities for startups'
                        fontSize={36}
                        background='#fff'
                        id='home_startups_third'
                    >
                        <HomeStartup
                            haveLink={false}
                            fontSize={32}
                            text='Startup Grind Pitch Battle'
                        />
                        <HomeStartup
                            haveLink={false}
                            fontSize={32}
                            text='Startup Grind Pitch Battle'
                        />
                        <HomeStartup
                            haveLink={false}
                            fontSize={32}
                            text='Startup Grind Pitch Battle'
                        />
                    </HomeContent>
                </div>
            </div>
        );
    }
}

export default Home;