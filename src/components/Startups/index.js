import React, { useState, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/SearchOutlined';

import StartupCard from '../Hoc/StartupCard';

import Loading from 'react-loading';

let startupsCopy = [];

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
            startupsCopy = fetchedData.data;
        }
        else {
            setLoading(false);
            console.error(fetchedData.errors);
        }
    }

    const applyFilter = (field, value) => {
        setStartups(startupsCopy);

        if (field == 'startupName') {
            setStartups((prev) => prev.filter((i) => i[field].toLowerCase().includes(value)));
        }
        else if (field == 'industry') {
            setStartups((prev) => prev.filter((i) => i[field].includes(value)));
        }
        else if (field == 'launchDate') {
            setStartups((prev) => prev.filter((i) => new Date(i[field]).getFullYear() == value));
        }
        else if (field == 'buildType') {
            setStartups((prev) => prev.filter((i) => i[field] == value));
        }
        else if (field == 'fundingExists') {
            setStartups((prev) => prev.filter((i) => i[field].toString() == value));
        }
    }

    return (
        <div
            className='startups_container'
        // style={{
        //     height: loading ? '100vh' : 'auto'
        // }}
        >
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
                                    onChange={(e) => applyFilter('startupName', e.target.value)}
                                />
                            </div>

                            <div className="filters_container">
                                <div className="filter">
                                    <select onChange={(e) => applyFilter('industry', e.target.value)}>
                                        <option selected disabled>Industry</option>
                                        {
                                            industries.map((i, index) => (
                                                <option key={index}>{i}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="filter">
                                    <select onChange={(e) => applyFilter('launchDate', e.target.value)}>
                                        <option selected disabled>Year of launch</option>
                                        {
                                            launchYears.map((i, index) => (
                                                <option key={index}>{i}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="filter">
                                    <select onChange={(e) => applyFilter('buildType', e.target.value)}>
                                        <option selected disabled>Product type</option>
                                        <option>Service</option>
                                        <option>Product</option>
                                        <option>PAAS</option>
                                        <option>Software</option>
                                        <option>SAAS</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="filter">
                                    <select onChange={(e) => applyFilter('fundingExists', e.target.value)}>
                                        <option selected disabled>Funding raised</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
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