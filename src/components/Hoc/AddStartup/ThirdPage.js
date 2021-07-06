import React, { useEffect, useState } from 'react';

import Loading from 'react-loading';

const ThirdPage = (props) => {

    const industryCheckboxes = [
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
    ]

    const employeeNumber = [
        '0-4',
        '5-10',
        '11-30',
        '31-50',
        '51 and more'
    ]

    const socialPlatforms = [
        'Website',
        'Instagram',
        'Facebook',
        'Twitter',
        'Youtube',
        'LinkedIn'
    ]

    const [data, setData] = useState({});
    const [pressedButton, setPressedButton] = useState('');
    const [isUrlsEmpty, setIsUrlsEmpty] = useState(true);
    const [fetchUrl, setFetchUrl] = useState('');
    const [loadings, setLoadings] = useState([false, false]);

    useEffect(() => {
        setData(props.data);
        setFetchUrl(
            props.data.id != undefined ?
                `https://tranquil-thicket-27487.herokuapp.com/v1/startups/${props.data.id}`
                : 'https://tranquil-thicket-27487.herokuapp.com/v1/startups'
        );

        if (
            props.data.urls.website != '' ||
            props.data.urls.instagram != '' ||
            props.data.urls.facebook != '' ||
            props.data.urls.twitter != '' ||
            props.data.urls.youtube != '' ||
            props.data.urls.linkedin != ''
        ) {
            setIsUrlsEmpty(false);
        }
        else {
            setIsUrlsEmpty(true);
        }
    }, []);

    const getData = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        props.setData({
            ...props.data,
            industry: data.industry,
            employeeNumber: formData.get('employee_number'),
            urls: data.urls
        });

        if (pressedButton == 'back') {
            props.prev();
            return;
        }

        addStartup(pressedButton == 'publish' ? true : false);
    }

    const addStartup = async (isPublished) => {
        setLoadings([
            pressedButton == 'draft' ? true : false,
            pressedButton == 'publish' ? true : false
        ]);

        const request = await fetch(fetchUrl, {
            method: props.data.id != undefined ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                isPublished: isPublished,
                startupName: data.startupName,
                buildType: data.buildType,
                city: data.city,
                country: data.country,
                description: data.description,
                email: data.email,
                founder: data.founder,
                fundingExists: data.fundingExists,
                fundingSource: data.fundingSource,
                fundingStage: data.fundingStage,
                headline: data.headline,
                industry: data.industry,
                isIncorporated: data.isIncorporated,
                isLaunched: data.isLaunched,
                launchDate: data.launchDate,
                legalStatus: data.legalStatus,
                phone: data.phone,
                logo: data.logo.split(',')[1],
                pitchDeck: data.pitchDeck.split(',')[1],
                stage: data.stage,
                employeesNumber: {
                    min: parseInt(data.employeeNumber.split('-')[0]),
                    max: parseInt(data.employeeNumber.split('-')[1])
                },
                urls: data.urls
            })
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            if (isPublished == true) {
                setLoadings([false, false]);
                props.setPopupScreen(2);
                props.openStartupPopup();
            }
            else {
                setLoadings([false, false]);
                props.setPopupScreen(1);
                props.openStartupPopup();
            }
        }
        else {
            console.log(fetchedData.errors);
            setLoadings([false, false]);
        }
    }

    const addIndustry = (event) => {
        if (event.checked == true) {
            event.setCustomValidity('');

            const list = [...data.industry, event.value];

            setData({ ...data, industry: list });
        }
        else {
            const list = data.industry.filter(i => i != event.value);

            setData({ ...data, industry: list });
        }
    }

    const validateFields = (event, text) => {
        if (event.target.required == true) {
            event.target.setCustomValidity(text);
        }
        else {
            event.target.setCustomValidity('');
        }
    }

    return (
        <div
            className='add_startup_content'
            style={{
                marginTop: -100,
                opacity: loadings[0] == true || loadings[1] == true ? 0.5 : 1
            }}
        >
            <form
                method='POST'
                onSubmit={getData}
                noValidate={pressedButton == 'back' ? true : false}
            >
                <fieldset disabled={loadings[0] == true || loadings[1] == true}>
                    <div className='add_startup_left'>
                        <div className='add_startup_radio_section'>
                            <span className='add_startup_span'>Industry*</span><br></br>
                            {
                                industryCheckboxes.map((i, index) => (
                                    data.industry != undefined ?
                                        <div key={index} className='add_startup_radio_container'>
                                            <input
                                                required={data.industry.length == 0 ? true : false}
                                                type='checkbox'
                                                name='industry'
                                                value={i}
                                                checked={data.industry.filter(j => j == i).length != 0}
                                                onChange={(event) => addIndustry(event.target)}
                                                onInvalid={(event) => validateFields(event, 'Please select one of these options.')}
                                            />
                                            <br></br>
                                            <span>{i}</span>
                                        </div>
                                        : null
                                ))
                            }
                        </div>
                    </div>

                    <div className='add_startup_right'>
                        <div className='add_startup_radio_section'>
                            <span className='add_startup_span'>Number of full time or part time employees*</span><br></br>

                            {
                                employeeNumber.map((i, index) => (
                                    <div key={index} className='add_startup_radio_container'>
                                        <input
                                            required
                                            type='radio'
                                            name='employee_number'
                                            value={i}
                                            checked={data.employeeNumber == i}
                                            onChange={(event) => setData({ ...data, employeeNumber: event.target.value })}
                                        />
                                        <br></br>
                                        <span>{i}</span>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='add_startup_radio_section'>
                            <span className='add_startup_span'>URLs*</span><br></br>

                            {
                                data.urls != undefined ?
                                    socialPlatforms.map((i, index) => (
                                        <div key={index} className='add_startup_url_container'>
                                            <span>{i}</span><br></br>
                                            <input
                                                required={isUrlsEmpty}
                                                type='text'
                                                name='urls'
                                                placeholder={index == 1 || index == 3 ? '@username' : 'URL'}
                                                value={data.urls ? data.urls[i.toLowerCase()] : ''}
                                                onChange={(event) => {
                                                    setData({
                                                        ...data,
                                                        urls: { ...data.urls, [i.toLowerCase()]: event.target.value }
                                                    })
                                                    event.target.setCustomValidity('');
                                                    setIsUrlsEmpty(event.target.value != '' ? false : true);
                                                }}
                                                onInvalid={(event) => validateFields(event, 'Please fill one of these fields.')}
                                            />
                                        </div>
                                    ))
                                    : null
                            }
                        </div>
                    </div>
                </fieldset>

                <button
                    className='add_startup_back_button'
                    disabled={loadings[0] == true || loadings[1] == true}
                    onClick={() => setPressedButton('back')}
                    style={{
                        left: '30%',
                        cursor: loadings[0] == true || loadings[1] == true ? 'default' : 'pointer'
                    }}
                >
                    Back
                </button>
                <button
                    className='add_startup_save_button'
                    disabled={loadings[0] == true || loadings[1] == true}
                    onClick={() => setPressedButton('draft')}
                    style={{
                        left: '40%',
                        cursor: loadings[0] == true || loadings[1] == true ? 'default' : 'pointer'
                    }}
                >
                    {
                        loadings[0] == true ?
                            <Loading
                                height={60}
                                width={60}
                                color='white'
                                type='bubbles'
                            />
                            : 'Save As Draft'
                    }
                </button>
                <button
                    className='add_startup_save_button'
                    disabled={loadings[0] == true || loadings[1] == true}
                    onClick={() => setPressedButton('publish')}
                    style={{
                        left: '57%',
                        cursor: loadings[0] == true || loadings[1] == true ? 'default' : 'pointer'
                    }}
                >
                    {
                        loadings[1] == true ?
                            <Loading
                                height={60}
                                width={60}
                                color='white'
                                type='bubbles'
                            />
                            : 'Save and Publish'
                    }
                </button>
            </form>
        </div >
    );
};

export default ThirdPage;