import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Slider from "react-slick";

import HomeContent from '../Hoc/HomeContent';
import HomeStartup from '../Hoc/HomeStartup';

import { connect } from 'react-redux';
import { openLoginMenu } from '../redux/actions';

import startupImage from '../../assets/images/startupImage.png';
import highlightImage from '../../assets/images/highlightImage.png'
import opportunitiesImage from '../../assets/images/opportunitiesImage.png';

import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';

import CoverImage from '../../assets/images/homeCover.png';

class Home extends Component {

    state = {
        settings: {
            autoplay: false,
            infinite: false,
            dots: false,
            arrows: true,
            speed: 500,
            slidesToScroll: 1,
            adaptiveHeight: true,
            className: 'carousel',
            centerPadding: '0px',
            initialSlide: 0,
            swipeToSlide: false,
            swipe: false
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
            <>
                <div id='home' className='home_container'>
                    <div className='home_wrapper'>
                        <div className='home_center_container'>
                            <div className='home_buttons_container'>
                                <Slide left duration={500}>
                                    <h1 className='home_center_text'>FIRST OPEN SOURCE DATABASE FOR ARMENIAN STARTUPS</h1>
                                </Slide>

                                <Slide left duration={500} delay={100}>
                                    <Link
                                        to={
                                            this.state.token ? '/startups'
                                                : '/'
                                        }
                                    >
                                        <button onClick={() => this.state.token ? null : this.props.openLoginMenu()} className='home_button'>Explore Startups</button>
                                    </Link>
                                </Slide>
                                <br></br>
                                <Slide left duration={500} delay={200}>
                                    <Link
                                        to={
                                            this.state.token ? '/profile/add-startup'
                                                : '/'
                                        }
                                    >
                                        <button onClick={() => this.state.token ? null : this.props.openLoginMenu()} className='home_button'>Add My Startup</button>
                                    </Link>
                                </Slide>
                            </div>
                            <Fade duration={1500}>
                                <img className='home_cover_image' src={CoverImage} />
                            </Fade>
                        </div>
                    </div>

                    <div className='home_content'>
                        <HomeContent
                            text='Explore Startups'
                            textStyle={{
                                fontWeight: 600,
                                fontSize: 30,
                                color: '#FFFFFF',
                                textTransform: 'uppercase'
                            }}
                            background='linear-gradient(0deg, #D1CCCC, #2998F6)'
                            buttonText='More Startups'
                            id='home_startups_first'
                            setOpen={this.props.openLoginMenu}
                        >
                            <Slider {...this.state.settings}>
                                <HomeStartup
                                    haveLink={true}
                                    fontSize={32}
                                    text='Startup Name'
                                    desc='Lorem ipsum'
                                    image={startupImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#FFFFFF',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    fontSize={32}
                                    text='Startup Name'
                                    desc='Lorem ipsum'
                                    image={startupImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#FFFFFF',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    fontSize={32}
                                    text='Startup Name'
                                    desc='Lorem ipsum'
                                    image={startupImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#FFFFFF',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    fontSize={32}
                                    text='Startup Name'
                                    desc='Lorem ipsum'
                                    image={startupImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#FFFFFF',
                                        textTransform: 'uppercase'
                                    }}
                                />
                            </Slider>
                        </HomeContent>

                        <HomeContent
                            text='Highlights from Armenian Startup Ecosystem'
                            textStyle={{
                                fontWeight: 600,
                                fontSize: 30,
                                color: '#364A89',
                                textTransform: 'uppercase'
                            }}
                            background='linear-gradient(0deg, #D1CCCC, #D1CCCC)'
                            buttonText='More Highlights'
                            id='home_startups_second'
                            setOpen={this.props.openLoginMenu}
                        >
                            <Slider {...this.state.settings}>
                                <HomeStartup
                                    haveLink={true}
                                    text='HIGHTLIGHTS NAME'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    text='HIGHTLIGHTS NAME'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    text='HIGHTLIGHTS NAME'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    text='HIGHTLIGHTS NAME'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                />
                            </Slider>
                        </HomeContent>

                        <HomeContent
                            text='Opportunities for startups'
                            textStyle={{
                                fontWeight: 600,
                                fontSize: 30,
                                color: '#364A89',
                                textTransform: 'uppercase'
                            }}
                            background='linear-gradient(0deg, #D1CCCC, #D1CCCC)'
                            id='home_startups_third'
                            setOpen={this.props.openLoginMenu}
                            buttonText='More Opportunities'
                        >
                            <Slider {...this.state.settings}>
                                <HomeStartup
                                    haveLink={true}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                    text='Startup Grind Pitch Battle'
                                    desc='Lorem ipsum'
                                    image={opportunitiesImage}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                    text='Startup Grind Pitch Battle'
                                    desc='Lorem ipsum'
                                    image={opportunitiesImage}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                    text='Startup Grind Pitch Battle'
                                    desc='Lorem ipsum'
                                    image={opportunitiesImage}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                        textTransform: 'uppercase'
                                    }}
                                    text='Startup Grind Pitch Battle'
                                    desc='Lorem ipsum'
                                    image={opportunitiesImage}
                                />
                            </Slider>
                        </HomeContent>
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = {
    openLoginMenu
}

export default connect(null, mapDispatchToProps)(Home);