import React, { Component } from 'react';

import { Drawer, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

class SideMenu extends Component {
    render() {
        return (
            <Drawer
                open={this.props.open}
                anchor='left'
                variant='persistent'
                transitionDuration={{
                    enter: this.props.transition,
                    exit: this.props.transition
                }}
                className='account_side_menu'
            >
                <List>
                    <ListItem>
                        <Link className='navbar_link'>
                            My Startups
                        </Link>
                    </ListItem>
                    <hr></hr>
                    <ListItem>
                        <Link className='navbar_link'>
                            My Communities
                        </Link>
                    </ListItem>
                    <hr></hr>
                    <ListItem>
                        <Link className='navbar_link'>
                            My Blogs
                        </Link>
                    </ListItem>
                    <hr></hr>
                </List>
            </Drawer>
        );
    }
}

export default SideMenu;