import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Drawer, List, ListItem } from '@material-ui/core';

import Login from './Login';
import Register from './Register';

import { connect } from 'react-redux';
import { closeLoginMenu, openLoginMenu, openRegMenu, closeRegMenu } from '../../redux/actions';
class BurgerMenu extends Component {

    state = {
        menuHandler: null,
        menuOpen: null,
    }

    componentWillReceiveProps(props) {
        this.setState({
            menuHandler: props.menuHandler,
            menuOpen: props.opened,
        });
    }

    menuHandler = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });

        this.state.menuHandler();
    }

    loginContOpen = () => {
        this.props.openLoginMenu();
        this.menuHandler();
    }

    loginContClose = () => {
        this.props.closeLoginMenu();
    }

    regContOpen = () => {
        this.props.openRegMenu();
        this.menuHandler();
    }

    regContClose = () => {
        this.props.closeRegMenu();
    }

    signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('_id');

        window.location.reload();
    }

    render() {
        return (
            <>
                {
                    this.props.loginMenuState == true ?
                        <Login handler={this.loginContClose} />
                        : this.props.regMenuState == true ?
                            <Register handler={this.regContClose} />
                            : null
                }
                <Drawer
                    anchor='right'
                    open={this.state.menuOpen}
                    onClose={() => this.menuHandler()}
                >
                    <List className='burger_menu'>
                        {
                            localStorage.getItem('token') || sessionStorage.getItem('token') ?
                                <div className='navbar_profile_cont'>
                                    <ListItem className='burger_menu_link_cont'>
                                        <Link
                                            className='navbar_profile_icon_cont'
                                            to={`/account/${localStorage.getItem('_id') || sessionStorage.getItem('_id')}`}
                                        >
                                            <img
                                                className='navbar_profile_icon'
                                                src={require('../../../assets/icons/profile.png')}
                                            />
                                            <p>My Profile</p>
                                        </Link>
                                    </ListItem>

                                    <ListItem className='burger_menu_link_cont'>
                                        <button onClick={this.signOut}>Sign Out</button>
                                    </ListItem>
                                </div>
                                :
                                <div className='burger_menu_login_container'>
                                    <ListItem className='burger_menu_link_cont'>
                                        <button
                                            className='burger_menu_link'
                                            onClick={() => this.loginContOpen()}
                                        >
                                            Login
                                        </button>
                                    </ListItem>

                                    <ListItem className='burger_menu_link_cont'>
                                        <button
                                            className='burger_menu_link'
                                            onClick={() => this.regContOpen()}
                                        >
                                            Register
                                        </button>
                                    </ListItem>
                                </div>
                        }

                        <ListItem className='burger_menu_link_cont'>
                            <Link
                                to='/'
                                className='burger_menu_link'
                                onClick={() => this.menuHandler()}
                            >
                                Home
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link
                                to='/about'
                                className='burger_menu_link'
                                onClick={() => this.menuHandler()}
                            >
                                About
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link
                                to='/startups'
                                className='burger_menu_link'
                                onClick={() => this.menuHandler()}
                            >
                                Startups
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link
                                to='/blog'
                                onClick={() => this.menuHandler()}
                                className='burger_menu_link'
                            >
                                Blog
                            </Link>
                        </ListItem>

                        <ListItem className='burger_menu_link_cont'>
                            <Link
                                to='/contact'
                                className='burger_menu_link'
                                onClick={() => this.menuHandler()}
                            >
                                Contact Us
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        loginMenuState: state.login,
        regMenuState: state.reg
    }
}

const mapDispatchToProps = {
    closeLoginMenu,
    openLoginMenu,
    openRegMenu,
    closeRegMenu
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);