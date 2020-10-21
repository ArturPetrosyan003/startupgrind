import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Drawer, List, ListItem } from '@material-ui/core';

import Login from './Login';
import Register from './Register';

class BurgerMenu extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        menuHandler: null,
        menuOpen: null,
        loginOpened: false,
        regOpened: false
    }

    componentWillReceiveProps(props) {
        this.setState({
            menuHandler: props.menuHandler,
            menuOpen: props.opened
        })
    }

    menuHandler = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
        this.state.menuHandler()
    }

    loginContOpen = () => {
        this.setState({
            loginOpened: !this.state.loginOpened
        })
    }

    regContOpen = () => {
        this.setState({
            regOpened: !this.state.regOpened
        })
    }

    loginClickEvent = () => {
        this.loginContOpen()
        this.menuHandler()
    }

    regClickEvent = () => {
        this.regContOpen()
        this.menuHandler()
    }

    SignOut = async () => {
        await localStorage.removeItem('token');
        await localStorage.removeItem('_id');
        window.location.reload();
    }

    render() {
        return (
            <>
                {
                    this.state.loginOpened == true && this.state.regOpened == false ?
                        <Login handler={this.loginContOpen} />
                        : this.state.loginOpened == false && this.state.regOpened == true ?
                            <Register handler={this.regContOpen} />
                            : null
                }
                <Drawer
                    open={this.state.menuOpen}
                    anchor='right'
                    onClose={() => this.menuHandler()}
                >
                    <List className='burger_menu'>
                        {
                            localStorage.getItem('token') ?
                                <div className='navbar_profile_cont'>
                                    <ListItem className='burger_menu_link_cont'>
                                        <Link className='navbar_profile_icon_cont' to={`/account/${localStorage.getItem('_id')}`}>
                                            <img className='navbar_profile_icon' src={require('../../../assets/icons/profile.png')} />
                                            <p>My Profile</p>
                                        </Link>
                                    </ListItem>

                                    <ListItem className='burger_menu_link_cont'>
                                        <button onClick={this.SignOut}>Sign Out</button>
                                    </ListItem>
                                </div>
                                :
                                <div className='burger_menu_login_container'>
                                    <ListItem className='burger_menu_link_cont'>
                                        <button onClick={() => this.loginClickEvent()} className='burger_menu_link'>
                                            Login
                                        </button>
                                    </ListItem>

                                    <ListItem className='burger_menu_link_cont'>
                                        <button onClick={() => this.regClickEvent()} className='burger_menu_link'>
                                            Register
                                        </button>
                                    </ListItem>
                                </div>
                        }



                        <ListItem className='burger_menu_link_cont'>
                            <Link onClick={() => this.menuHandler()} to='/' className='burger_menu_link'>
                                Home
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link onClick={() => this.menuHandler()} to='/about' className='burger_menu_link'>
                                About
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link onClick={() => this.menuHandler()} to='/startups' className='burger_menu_link'>
                                Startups
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link onClick={() => this.menuHandler()} to='/blog' className='burger_menu_link'>
                                Blog
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link onClick={() => this.menuHandler()} to='/contact' className='burger_menu_link'>
                                Contact Us
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }
};

export default BurgerMenu;