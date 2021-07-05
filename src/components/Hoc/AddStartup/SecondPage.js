import React, { useState, useEffect } from 'react';

const SecondPage = (props) => {

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

    const fundingStages = [
        'Seed fundingExists',
        'Series A',
        'Series B',
        'Series C'
    ];

    const [otherCheckboxFirst, setOtherCheckboxFirst] = useState(false);
    const [otherCheckboxSecond, setOtherCheckboxSecond] = useState(false);
    const [otherValues, setOtherValues] = useState(['', '']);

    const [secondaryFields, setSecondaryFields] = useState({
        launched: false,
        incorporated: false,
        fundingExists: false
    });

    const [pressedButton, setPressedButton] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        setData(props.data);
        setOtherCheckboxState();
        setOtherValues([props.data.buildType, props.data.fundingStage]);

        setSecondaryFields({
            launched: props.data.isLaunched == true,
            incorporated: props.data.isIncorporated == true,
            fundingExists: props.data.fundingExists == true
        });
    }, []);

    const setOtherCheckboxState = async () => {
        if (props.data.buildType != '' &&
            props.data.buildType != 'Service' &&
            props.data.buildType != 'Product' &&
            props.data.buildType != 'PAAS' &&
            props.data.buildType != 'Software' &&
            props.data.buildType != 'SAAS'
        ) {
            setOtherCheckboxFirst(true);
        }

        if (props.data.fundingStage != null &&
            props.data.fundingStage != '' &&
            props.data.fundingStage != 'Seed fundingExists' &&
            props.data.fundingStage != 'Series A' &&
            props.data.fundingStage != 'Series B' &&
            props.data.fundingStage != 'Series C'
        ) {
            setOtherCheckboxSecond(true);
        }
    }

    const getData = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        props.setData({
            ...props.data,
            buildType: formData.get('build_type'),
            isLaunched: data.isLaunched,
            launchDate: formData.get('launch_date') ? new Date(formData.get('launch_date')) : '',
            isIncorporated: data.isIncorporated,
            legalStatus: formData.get('legal_status'),
            stage: formData.get('stage'),
            fundingExists: data.fundingExists,
            fundingStage: formData.get('stage_of_funding'),
            fundingSource: formData.get('funding_source')
        });

        if (pressedButton == 'back') {
            props.prev();
        }
        else {
            props.next();
        }
    }

    const checkboxState = (val1, val2, obj1, obj2) => {
        setOtherCheckboxFirst(val1);
        setOtherCheckboxSecond(val2);
        setData({ ...data, buildType: obj1, fundingStage: obj2 });
    }

    const otherInputsVal = (val1, val2) => {
        setOtherValues([val1, val2]);
        setData({ ...data, buildType: val1, fundingStage: val2 });
    }

    return (
        <div className='add_startup_content' style={{ padding: '0px 75px 0px 150px' }}>
            <form method='POST' onSubmit={getData} noValidate={pressedButton == 'back' ? true : false}>
                <div className='add_startup_left'>
                    <div className='add_startup_radio_section'>
                        <span className='add_startup_span'>What do you build?*</span><br></br>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='build_type'
                                value='Service'
                                checked={data.buildType == 'Service'}
                                onChange={(event) => checkboxState(false, otherCheckboxSecond, event.target.value, data.fundingStage)}
                            />
                            <br></br>
                            <span>Service</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='build_type'
                                value='Product'
                                checked={data.buildType == 'Product'}
                                onChange={(event) => checkboxState(false, otherCheckboxSecond, event.target.value, data.fundingStage)}
                            />
                            <br></br>
                            <span>Product</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='build_type'
                                value='PAAS'
                                checked={data.buildType == 'PAAS'}
                                onChange={(event) => checkboxState(false, otherCheckboxSecond, event.target.value, data.fundingStage)}
                            />
                            <br></br>
                            <span>PAAS</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='build_type'
                                value='SAAS'
                                checked={data.buildType == 'SAAS'}
                                onChange={(event) => checkboxState(false, otherCheckboxSecond, event.target.value, data.fundingStage)}
                            />
                            <br></br>
                            <span>SAAS</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='build_type'
                                value={otherValues[0]}
                                checked={otherCheckboxFirst == true}
                                onChange={(event) => checkboxState(true, otherCheckboxSecond, event.target.value, data.fundingStage)}
                            />
                            <br></br>
                            <span>Other</span><br></br>
                        </div>

                        <input
                            className='add_startup_other_input'
                            placeholder='Please specify'
                            required={otherCheckboxFirst == true}
                            type='text'
                            name='build_type'
                            value={
                                data.buildType != '' &&
                                    data.buildType != 'Service' &&
                                    data.buildType != 'Product' &&
                                    data.buildType != 'PAAS' &&
                                    data.buildType != 'Software' &&
                                    data.buildType != 'SAAS' ? data.buildType : ''
                            }
                            onClick={() => setOtherCheckboxFirst(true)}
                            onChange={(val) => otherInputsVal(val.target.value, data.fundingStage)}
                        />
                    </div>

                    <div className='add_startup_radio_section'>
                        <span className='add_startup_span'>Is your product/service launched?*</span><br></br>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='is_launched'
                                checked={data.isLaunched == true}
                                onChange={() => {
                                    setData({ ...data, isLaunched: true })
                                    setSecondaryFields({ ...secondaryFields, launched: true })
                                }}
                            />
                            <br></br>
                            <span>Yes</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='is_launched'
                                checked={data.isLaunched == false}
                                onChange={() => {
                                    setData({ ...data, isLaunched: false })
                                    setSecondaryFields({ ...secondaryFields, launched: false })
                                }}
                            />
                            <br></br>
                            <span>No</span>
                        </div>
                    </div>

                    <div
                        className='add_startup_radio_section'
                        style={{
                            opacity: secondaryFields.launched == true ? 1 : 0.5
                        }}
                    >
                        <span className='add_startup_span'>If yes, when?</span><br></br>

                        <select name='launch_date' required disabled={!secondaryFields.launched} >
                            <option value='' disabled selected={!secondaryFields.launched}>Please choose a year</option>

                            {
                                data.launchDate != undefined ?
                                    launchYears.map((i, index) => (
                                        <option
                                            key={index}
                                            value={i}
                                            selected={new Date(data.launchDate).getFullYear() == i}
                                            onChange={(event) => setData({ ...data, launchDate: event.target.value })}
                                        >
                                            {i}
                                        </option>
                                    ))
                                    : null
                            }
                        </select>
                    </div>

                    <div className='add_startup_radio_section'>
                        <span className='add_startup_span'>Is your startup incorporated?*</span><br></br>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                name='is_incorporated'
                                type='radio'
                                checked={data.isIncorporated == true}
                                onChange={() => {
                                    setData({ ...data, isIncorporated: true })
                                    setSecondaryFields({ ...secondaryFields, incorporated: true })
                                }}
                            />
                            <br></br>
                            <span>Yes</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                name='is_incorporated'
                                type='radio'
                                checked={data.isIncorporated == false}
                                onChange={() => {
                                    setData({ ...data, isIncorporated: false })
                                    setSecondaryFields({ ...secondaryFields, incorporated: false })
                                }}
                            />
                            <br></br>
                            <span>No</span>
                        </div>
                    </div>

                    <div
                        className='add_startup_radio_section'
                        style={{
                            opacity: secondaryFields.incorporated == true ? 1 : 0.5
                        }}
                    >
                        <div className='add_startup_inputs'>
                            <span className='add_startup_span'>If yes, what is its legal status?</span><br></br>

                            <input
                                required
                                disabled={!secondaryFields.incorporated}
                                type='text'
                                name='legal_status'
                                style={{ marginLeft: -30 }}
                                value={secondaryFields.incorporated == true ? data.legalStatus : ''}
                                onChange={(event) => setData({ ...data, legalStatus: event.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className='add_startup_right'>
                    <div className='add_startup_radio_section'>
                        <span className='add_startup_span'>What stage are You at?*</span><br></br>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='stage'
                                value='Idea/concept'
                                checked={data.stage == 'Idea/concept'}
                                onChange={(event) => setData({ ...data, stage: event.target.value })}
                            />
                            <br></br>
                            <span>Idea/concept</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='stage'
                                value='From idea to MVP'
                                checked={data.stage == 'From idea to MVP'}
                                onChange={(event) => setData({ ...data, stage: event.target.value })}
                            />
                            <br></br>
                            <span>From idea to MVP</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='stage'
                                value='Getting traction'
                                checked={data.stage == 'Getting traction'}
                                onChange={(event) => setData({ ...data, stage: event.target.value })}
                            />
                            <br></br>
                            <span>Getting traction</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='stage'
                                value='Testing and improving the product'
                                checked={data.stage == 'Testing and improving the product'}
                                onChange={(event) => setData({ ...data, stage: event.target.value })}
                            />
                            <br></br>
                            <span>Testing and improving the product</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='stage'
                                value='Scaling/expapansion'
                                checked={data.stage == 'Scaling/expapansion'}
                                onChange={(event) => setData({ ...data, stage: event.target.value })}
                            />
                            <br></br>
                            <span>Scaling/expansion</span>
                        </div>
                    </div>

                    <div className='add_startup_radio_section'>
                        <span className='add_startup_span'>Have you raised any funding so far?*</span><br></br>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='fundingExists'
                                checked={data.fundingExists == true}
                                onChange={() => {
                                    setData({ ...data, fundingExists: true })
                                    setSecondaryFields({ ...secondaryFields, fundingExists: true })
                                }}
                            />
                            <br></br>
                            <span>Yes</span>
                        </div>

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                type='radio'
                                name='fundingExists'
                                checked={data.fundingExists == false}
                                onChange={() => {
                                    setData({ ...data, fundingExists: false })
                                    setSecondaryFields({ ...secondaryFields, fundingExists: false })
                                }}
                            />
                            <br></br>
                            <span>No</span>
                        </div>
                    </div>

                    <div
                        className='add_startup_radio_section'
                        style={{
                            opacity: secondaryFields.fundingExists == true ? 1 : 0.5
                        }}
                    >
                        <span className='add_startup_span'>If yes, what stage of funding have you received</span><br></br>

                        {
                            fundingStages.map((i, index) => (
                                <div key={index} className='add_startup_radio_container'>
                                    <input
                                        required
                                        disabled={!secondaryFields.fundingExists}
                                        type='radio'
                                        name='stage_of_funding'
                                        value={i}
                                        checked={data.fundingStage == i && secondaryFields.fundingExists == true}
                                        onChange={(event) => checkboxState(otherCheckboxFirst, false, data.buildType, event.target.value)}
                                    />
                                    <br></br>
                                    <span>{i}</span>
                                </div>

                            ))
                        }

                        <div className='add_startup_radio_container'>
                            <input
                                required
                                disabled={!secondaryFields.fundingExists}
                                type='radio'
                                name='stage_of_funding'
                                value={otherValues[1]}
                                checked={otherCheckboxSecond == true && secondaryFields.fundingExists == true}
                                onChange={(event) => checkboxState(otherCheckboxFirst, true, data.buildType, event.target.value)}
                            />
                            <br></br>
                            <span>Other</span><br></br>
                        </div>

                        <input
                            className='add_startup_other_input'
                            placeholder='Please specify'
                            required={otherCheckboxSecond == true ? true : false}
                            disabled={!secondaryFields.fundingExists}
                            type='text'
                            name='stage_of_funding'
                            value={
                                secondaryFields.fundingExists == true &&
                                    data.fundingStage != '' &&
                                    data.fundingStage != 'Seed fundingExists' &&
                                    data.fundingStage != 'Series A' &&
                                    data.fundingStage != 'Series B' &&
                                    data.fundingStage != 'Series C' ? data.fundingStage : ''
                            }
                            onClick={() => setOtherCheckboxSecond(true)}
                            onChange={(val) => otherInputsVal(data.buildType, val.target.value)}
                        />
                    </div>

                    <div
                        className='add_startup_radio_section'
                        style={{
                            opacity: secondaryFields.fundingExists == true ? 1 : 0.5
                        }}
                    >
                        <div className='add_startup_inputs'>
                            <span className='add_startup_span'>Please specify the source</span><br></br>

                            <input
                                required
                                disabled={!secondaryFields.fundingExists}
                                type='text'
                                name='funding_source'
                                style={{ marginLeft: -30 }}
                                value={data.fundingSource}
                                onChange={(event) => setData({ ...data, fundingSource: event.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <button
                    className='add_startup_back_button'
                    onClick={() => setPressedButton('back')}
                >
                    Back
                </button>

                <button
                    className='add_startup_next_button'
                    onClick={() => setPressedButton('next')}
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default SecondPage;