import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className='home_container'>
                <div className='home_button_container'>
                    <Link to='startups'>
                        <button>Explore</button>
                    </Link>

                    <Link to='about'>
                        <button>About Us</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;