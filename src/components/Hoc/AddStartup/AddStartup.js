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
        founder: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        headline: '',
        description: '',
        logo: null,
        pitchDeck: null,
        buildType: '',
        isLaunched: null,
        launchDate: '',
        isIncorporated: null,
        legalStatus: '',
        stage: '',
        fundingExists: null,
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
                ...props.data,
                id: props.data._id || props.data.id,
                isPublished: props.data.isPublished,
                logo: props.data.logo ? `data:image/png;base64, ${props.data.logo}` : null,
                pitchDeck: props.data.pitchDeck ? `data:application/pdf;base64, ${props.data.pitchDeck}` : null,
                employeeNumber: props.data.employeesNumber ?
                    props.data.employeesNumber.min == 0 ? '0-4' :
                        props.data.employeesNumber.min == 5 ? '5-10' :
                            props.data.employeesNumber.min == 11 ? '11-30' :
                                props.data.employeesNumber.min == 31 ? '31-50' :
                                    props.data.employeesNumber.min == 51 ? '51 and more' :
                                        props.data.employeeNumber
                    : props.data.employeeNumber
            });

            setLoading(false);
        }
    }, [props.data]);

    const closeStartupMenu = (event) => {
        if (event.target == event.currentTarget) {
            props.openStartupPopup();
        }
    }

    const setPage = () => {
        if (pageNumber == 0) {
            return (
                <FirstPage
                    next={changePageNext}
                    data={data}
                    setData={setData}
                />
            );
        }
        else if (pageNumber == 1) {
            return (
                <SecondPage
                    next={changePageNext}
                    prev={changePagePrev}
                    data={data}
                    setData={setData}
                />
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
                                fetchData={props.fetchData}
                                label='Your startup is successfully saved and published'
                                redirect={props.data ? `/account/startups/${props.data.lowercaseName}` : null}
                                functions={{
                                    open: props.openStartupMenu,
                                    close: props.closeStartupPopup
                                }}
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