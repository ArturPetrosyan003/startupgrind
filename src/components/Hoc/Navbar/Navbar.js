import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

import BurgerMenu from './BurgerMenu';
import WebMenu from './WebMenu';

import { Link } from 'react-router-dom';
class Navbar extends Component {

    constructor(props) {
        super(props);
        this.burgerMenu = React.createRef();
    }

    state = {
        menuOpened: null,
        device: null
    }

    componentDidMount() {
        this.windowResizeHandler(window.innerWidth);

        window.addEventListener('resize', () => {
            this.windowResizeHandler(document.documentElement.clientWidth)
        });

        window.addEventListener('scroll', () => {
            if (document.location.pathname == '/' && document.getElementsByClassName('navbar') != undefined) {
                if (window.scrollY > 0) {
                    document.getElementsByClassName('navbar')[0].style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }
                else if (window.scrollY <= 0) {
                    document.getElementsByClassName('navbar')[0].style.backgroundColor = 'transparent';
                }
            }
        });
    }

    menuHandler = () => {
        this.setState({
            menuOpened: !this.state.menuOpened
        });
    }

    windowResizeHandler = (value) => {
        if (value <= 661) {
            this.setState({
                menuOpened: false,
                device: 'mobile'
            });
        }
        else {
            this.setState({
                menuOpened: true,
                device: 'web'
            });
        }
    }

    render() {
        return (
            <AppBar className='navbar_container'>
                <ToolBar className='navbar'>
                    <Link to='/'>
                        <img
                            className='navbar_logo'
                            src={require('../../../assets/images/homeCover.png')}
                        />
                    </Link>

                    {
                        this.state.device == 'mobile' ?
                            <BurgerMenu
                                ref={this.burgerMenu}
                                opened={this.state.menuOpened}
                                menuHandler={this.menuHandler}
                                loginOpen={this.props.open}
                                setLoginOpen={this.props.setOpen}
                            />
                            : <WebMenu
                                loginOpen={this.props.open}
                                setLoginOpen={this.props.setOpen}
                            />
                    }

                    <div
                        className='burger_menu_container'
                        onClick={() => this.menuHandler()}
                        style={{
                            display: this.state.device == 'mobile' ? 'block' : 'none',
                            visibility: this.state.menuOpened ? 'hidden' : 'visible'
                        }}
                    >
                        <img
                            className='burger_menu_icon'
                            src={require('./../../../assets/icons/menu.png')}
                        />
                    </div>
                </ToolBar>
            </AppBar>
        );
    }
};

export default Navbar;