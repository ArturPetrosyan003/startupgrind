import React, { useState, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/SearchOutlined';

import StartupCard from '../Hoc/StartupCard';

import Loading from 'react-loading';

const Startups = () => {

    const industries = [
        'Agriculture',
        'AR/VR',
        'AI',
        'Cybersecurity',
        'Cunsumer goods/services',
        'Cryptocurrency',
        'Design/graphics',
        'E-commerce',
        'Education',
        'Entertainment/gaming',
        'Fashion',
        'Fintech/finance',
        'Hardware/IoT',
        'Health',
        'Human Resources',
        'Logistics/supply chain',
        'Music',
        'Nonprofit',
        'Renewable/environment',
        'Tourism/travel/hospitality'
    ];

    const launchYears = [
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013'
    ];

    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchStartups();
    }, []);

    const fetchStartups = async () => {
        const request = await fetch('https://tranquil-thicket-27487.herokuapp.com/v1/startups');
        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            setLoading(false);
            setStartups(fetchedData.data);
        }
        else {
            setLoading(false);
            console.error(fetchedData.errors);
        }
    }

    return (
        <div
            className='startups_container'>
            {
                loading ?
                    <Loading
                        height={80}
                        width={80}
                        color='white'
                        type='bubbles'
                    />
                    :
                    <>
                        <div className="startups_top">
                            <div className='searchbox_container'>
                                <Input
                                    className='searchbox'
                                    endAdornment={
                                        <Search fontSize='large' style={{ color: 'white' }} />
                                    }
                                    placeholder='Search'
                                />
                            </div>

                            <div className="filters_container">
                                <div class="filter">
                                    <select onChange={(e) => console.log(e.target.value)}>
                                        <option selected disabled>Industry</option>
                                        {
                                            industries.map((i, index) => (
                                                <option key={index}>{i}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div class="filter">
                                    <select>
                                        <option selected disabled>Year of launch</option>
                                        {
                                            launchYears.map((i, index) => (
                                                <option key={index}>{i}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div class="filter">
                                    <select>
                                        <option selected disabled>Product type</option>
                                        <option>Service</option>
                                        <option>Product</option>
                                        <option>PAAS</option>
                                        <option>Software</option>
                                        <option>SAAS</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div class="filter">
                                    <select>
                                        <option selected disabled>Funding raised</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="startups_main">
                            {
                                startups.map((i, index) => (
                                    <StartupCard
                                        key={index}
                                        data={i}
                                    />
                                ))
                            }
                        </div>
                    </>
            }
        </div>
    );
}

export default Startups;