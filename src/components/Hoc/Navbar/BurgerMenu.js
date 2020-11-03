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
        })
    }

    menuHandler = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
        this.state.menuHandler()
    }

    loginContOpen = () => {
        this.props.openLoginMenu()
        this.menuHandler()
    }
    loginContClose = () => {
        this.props.closeLoginMenu()
    }
    regContOpen = () => {
        this.props.openRegMenu()
        this.menuHandler()
    }
    regContClose = () => {
        this.props.closeRegMenu()
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
                    this.props.loginMenuState == true ?
                        <Login handler={this.loginContClose} />
                        : this.props.regMenuState == true ?
                            <Register handler={this.regContClose} />
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
                                        <button onClick={() => this.loginContOpen()} className='burger_menu_link'>
                                            Login
                                        </button>
                                    </ListItem>

                                    <ListItem className='burger_menu_link_cont'>
                                        <button onClick={() => this.regContOpen()} className='burger_menu_link'>
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