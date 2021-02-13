import React, { Component } from 'react';

import { Link } from 'react-router-dom';

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

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class Home extends Component {

    state = {
        token: null,
        sliderIterations: [1, 1, 1],
        settings: {
            slidesPerPage: 4,
            slidesPerScroll: 1,
            draggable: true,
            dots: false,
            arrows: true,
            centered: true
        }
    }

    componentDidMount() {
        this.setState({
            token: localStorage.getItem('token') || sessionStorage.getItem('token')
        })
        this.windowResizeHandler(window.innerWidth)
        window.addEventListener('resize', () => {
            this.windowResizeHandler(document.documentElement.clientWidth)
        })
    }

    windowResizeHandler = (value) => {
        const settings = this.state.settings

        if (value < 480) {
            settings.slidesPerPage = 1;
            settings.draggable = false;
            settings.dots = true;

            this.setState({
                ...settings,
            })
        }
        else {
            settings.slidesPerPage = 4;
            settings.draggable = true;
            settings.dots = false;

            this.setState({
                ...settings,
            })
        }
    }

    changeSlider = (value, min, max, id) => {
        if (this.state.settings.slidesPerPage == 4) {
            if (value >= min && value <= max) {
                let iterations = this.state.sliderIterations;
                iterations[id] = value;
                this.setState({ ...iterations })
            }
        }
        else {
            let iterations = this.state.sliderIterations;
            iterations[id] = value;
            this.setState({ ...iterations })
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
                                    <h1 className='home_center_text'>First Open Source Database For Armenian Startups</h1>
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
                                            this.state.token ? `/account/${localStorage.getItem('_id') || sessionStorage.getItem('_id')}`
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
                            }}
                            background='linear-gradient(0deg, #D1CCCC, #2998F6)'
                            buttonText='More Startups'
                            id='home_startups_first'
                            setOpen={this.props.openLoginMenu}
                        >
                            <Carousel
                                {...this.state.settings}
                                onChange={(value) => this.changeSlider(value, 1, 3, 0)}
                                value={this.state.sliderIterations[0]}
                            >
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
                                    }}
                                />
                            </Carousel>
                        </HomeContent>

                        <HomeContent
                            text='Highlights from Armenian Startup Ecosystem'
                            textStyle={{
                                fontWeight: 600,
                                fontSize: 30,
                                color: '#364A89',
                            }}
                            background='linear-gradient(0deg, #D1CCCC, #D1CCCC)'
                            buttonText='More Highlights'
                            id='home_startups_second'
                            setOpen={this.props.openLoginMenu}
                        >
                            <Carousel
                                {...this.state.settings}
                                value={this.state.sliderIterations[1]}
                                onChange={(value) => this.changeSlider(value, 1, 2, 1)}
                                slidesPerPage={this.state.settings.slidesPerPage == 4 ? 3 : 1}
                            >
                                <HomeStartup
                                    haveLink={true}
                                    text='Highlights Name'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    text='Highlights Name'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    text='Highlights Name'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                    }}
                                />
                                <HomeStartup
                                    haveLink={true}
                                    text='Highlights Name'
                                    desc='Lorem ipsum'
                                    image={highlightImage}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
                                    }}
                                />
                            </Carousel>
                        </HomeContent>

                        <HomeContent
                            text='Opportunities for startups'
                            textStyle={{
                                fontWeight: 600,
                                fontSize: 30,
                                color: '#364A89',
                            }}
                            background='linear-gradient(0deg, #D1CCCC, #D1CCCC)'
                            id='home_startups_third'
                            setOpen={this.props.openLoginMenu}
                            buttonText='More Opportunities'
                        >
                            <Carousel
                                {...this.state.settings}
                                value={this.state.sliderIterations[2]}
                                onChange={(value) => this.changeSlider(value, 1, 2, 2)}
                                slidesPerPage={this.state.settings.slidesPerPage == 4 ? 3 : 1}
                            >
                                <HomeStartup
                                    haveLink={true}
                                    textStyle={{
                                        fontWeight: 600,
                                        fontSize: 22,
                                        color: '#364A89',
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
                                    }}
                                    text='Startup Grind Pitch Battle'
                                    desc='Lorem ipsum'
                                    image={opportunitiesImage}
                                />
                            </Carousel>
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