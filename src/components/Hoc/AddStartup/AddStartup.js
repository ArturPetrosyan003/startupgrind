import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { openStartupMenu, closeStartupMenu, openStartupPopup, closeStartupPopup } from '../../redux/actions';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import Popup from './Popup/Popup.js';

const AddStartup = (props) => {

    const [pageNumber, setPageNumber] = useState(0);
    const [popupScreen, setPopupScreen] = useState(0);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        startupName: '',
        founderName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        shortDesc: '',
        longDesc: '',
        logo: null,
        pitchDeck: null,
        buildType: '',
        isLaunched: null,
        launchDate: '',
        isIncorporated: null,
        legalStatus: '',
        stage: '',
        funding: null,
        fundingStage: '',
        fundingSource: '',
        urls: {
            website: '',
            instagram: '',
            facebook: '',
            twitter: '',
            youtube: '',
            linkedin: ''
        },
        industry: [],
        employeeNumber: ''
    });

    useEffect(() => {
        if (props.data != undefined) {
            setData({
                ...data,
                id: props.data._id,
                isPublished: props.data.isPublished,
                startupName: props.data.startupName,
                founderName: props.data.founder,
                email: props.data.email,
                phone: props.data.phone,
                country: props.data.country,
                city: props.data.city,
                shortDesc: props.data.headline,
                longDesc: props.data.description,
                logo: `data:image/png;base64, ${props.data.logo}`,
                pitchDeck: `data:application/pdf;base64, ${props.data.pitchDeck}`,
                buildType: props.data.buildType,
                isLaunched: props.data.isLaunched,
                launchDate: props.data.launchDate,
                isIncorporated: props.data.isIncorporated,
                legalStatus: props.data.legalStatus,
                stage: props.data.stage,
                funding: props.data.fundingExists,
                fundingStage: props.data.fundingStage,
                fundingSource: props.data.fundingSource,
                urls: {
                    website: props.data.urls.website,
                    instagram: props.data.urls.instagram,
                    facebook: props.data.urls.facebook,
                    twitter: props.data.urls.twitter,
                    youtube: props.data.urls.youtube,
                    linkedin: props.data.urls.linkedin
                },
                industry: props.data.industry,
                employeeNumber: props.data.employeesNumber.min == 0 ? '0-4' :
                    props.data.employeesNumber.min == 5 ? '5-10' :
                        props.data.employeesNumber.min == 11 ? '11-30' :
                            props.data.employeesNumber.min == 31 ? '31-50' :
                                props.data.employeesNumber.min == 51 ? '51 and more' : null
            })

            setLoading(false);
        }
    }, [])

    const closeStartupMenu = (event) => {
        if (event.target == event.currentTarget) {
            props.openStartupPopup();
        }
    }

    const setPage = () => {
        if (pageNumber == 0) {
            return (
                <FirstPage next={changePageNext} data={data} setData={setData} />
            );
        }
        else if (pageNumber == 1) {
            return (
                <SecondPage next={changePageNext} prev={changePagePrev} data={data} setData={setData} />
            );
        }
        else if (pageNumber == 2) {
            return (
                <ThirdPage
                    prev={changePagePrev}
                    data={data}
                    setData={setData}
                    openStartupPopup={props.openStartupPopup}
                    setPopupScreen={setPopupScreen}
                />
            );
        }
    }

    const changePageNext = () => {
        setPageNumber(prev => prev += 1);
    }

    const changePagePrev = () => {
        setPageNumber(prev => prev -= 1);
    }

    return (
        <Fade duration={300}>
            <div className='startup_backdrop' onClick={closeStartupMenu}>
                <Zoom duration={600}>
                    {
                        props.startupDialogState == true ?
                            <Popup
                                data={data}
                                popupScreen={popupScreen}
                                fetchStartups={props.fetchStartups}
                            />
                            :
                            <div className='add_startup_container'>
                                {
                                    props.data != undefined ?
                                        loading == false ?
                                            setPage()
                                            : null
                                        : setPage()
                                }
                            </div>
                    }
                </Zoom>
            </div>
        </Fade>
    );
}

const mapStateToProps = state => {
    return {
        startupDialogState: state.startupDialog,
    }
}

const mapDispatchToProps = {
    openStartupMenu,
    closeStartupMenu,
    openStartupPopup,
    closeStartupPopup
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStartup);