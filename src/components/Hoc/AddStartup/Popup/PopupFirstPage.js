import React, { useEffect, useState } from 'react';
import Loading from 'react-loading';

import { connect } from 'react-redux';
import { closeStartupMenu, closeStartupPopup } from '../../../redux/actions';

const PopupFirstPage = (props) => {

    const [fetchUrl, setFetchUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFetchUrl(
            props.data.id != undefined ?
                `https://tranquil-thicket-27487.herokuapp.com/v1/startups/${props.data.id}`
                : 'https://tranquil-thicket-27487.herokuapp.com/v1/startups'
        );
    }, [])

    const addStartup = async (data) => {
        try {
            const request = await fetch(fetchUrl, {
                method: props.data.id != undefined ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token') || sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    isPublished: false,
                    startupName: data.startupName,
                    buildType: data.buildType,
                    city: data.city,
                    country: data.country,
                    description: data.longDesc,
                    email: data.email,
                    founder: data.founderName,
                    fundingExists: data.funding,
                    fundingSource: data.fundingSource,
                    fundingStage: data.fundingStage,
                    headline: data.shortDesc,
                    industry: data.industry,
                    isIncorporated: data.isIncorporated,
                    isLaunched: data.isLaunched,
                    launchDate: data.launchDate,
                    legalStatus: data.legalStatus,
                    phone: data.phone,
                    logo: data.logo ? data.logo.split(',')[1] : null,
                    pitchDeck: data.pitchDeck ? data.pitchDeck.split(',')[1] : null,
                    stage: data.stage,
                    employeesNumber: {
                        min: data.employeeNumber ? parseInt(data.employeeNumber.split('-')[0]) : null,
                        max: data.employeeNumber ? parseInt(data.employeeNumber.split('-')[1]) : null
                    },
                    urls: data.urls
                })
            });

            const fetchedData = await request.json();

            if (!fetchedData.errors) {
                setLoading(false);
                props.setPopupScreen(1);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h3>
                Are you sure you want to quit? All your changes made will be discarded.
                <br /><br />
                <span>You can save as draft and edit later</span>
            </h3>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25
                }}
            >
                <button
                    className='add_startup_close_popup_button'
                    onClick={() => {
                        setLoading(true);
                        addStartup(props.data);
                    }}
                >
                    {
                        loading == true ?
                            <Loading
                                height={60}
                                width={60}
                                color='white'
                                type='bubbles'
                                className='account_loading'
                            />
                            : 'Save as Draft'
                    }
                </button>

                <button
                    className='add_startup_close_popup_button'
                    style={{
                        background: '#1976D5',
                        marginLeft: 50
                    }}
                    onClick={() => {
                        props.closeStartupPopup();
                        props.closeStartupMenu();
                    }}
                >
                    Discard
                </button>
            </div>
        </>
    );
};

const mapDispatchToProps = {
    closeStartupMenu,
    closeStartupPopup
}

export default connect(null, mapDispatchToProps)(PopupFirstPage);