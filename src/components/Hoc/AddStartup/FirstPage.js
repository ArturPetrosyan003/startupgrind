import React, { useEffect, useState } from 'react';

import Checkmark from '../../../assets/icons/checkmark.png';
import Close from '../../../assets/icons/closeBlack.png';

const FirstPage = (props) => {

    const [data, setData] = useState({})
    const [logo, setLogo] = useState();
    const [pitchDeck, setPitchDeck] = useState();

    useEffect(() => {
        setData(props.data);
        setLogo(props.data.logo);
        setPitchDeck(props.data.pitchDeck);
    }, []);

    const getData = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        props.setData({
            ...props.data,
            startupName: formData.get('startup_name'),
            founder: formData.get('founder_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            country: formData.get('country'),
            city: formData.get('city'),
            headline: formData.get('short_desc'),
            description: formData.get('long_desc'),
            logo: logo,
            pitchDeck: pitchDeck
        });

        props.next();
    }

    const getLogoFile = (value) => {
        if (value.type == 'image/png') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState == 2) {
                    setLogo(reader.result);
                }
            }
            reader.readAsDataURL(value);
        }
    }

    const getPDFFile = (value) => {
        if(value.type == 'application/pdf'){
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState == 2) {
                    setPitchDeck(reader.result);
                }
            }
            reader.readAsDataURL(value);
        }
    }

    return (
        <>
            <h2 className='add_startup_text'>Add Your Startup</h2>
            <div className='add_startup_content'>
                <form method='POST' onSubmit={getData}>
                    <div className='add_startup_left'>
                        <div className='add_startup_inputs'>
                            <span className='add_startup_span'>Startup Name*</span><br></br>
                            <input
                                required
                                type='text'
                                name='startup_name'
                                value={data.startupName}
                                onChange={(event) => setData({ ...data, startupName: event.target.value })}
                            />
                            <br></br>

                            <span className='add_startup_span'>Founder Full Name*</span><br></br>
                            <input
                                required
                                type='text'
                                name='founder_name'
                                value={data.founder}
                                onChange={(event) => setData({ ...data, founder: event.target.value })}
                            />
                            <br></br>

                            <span className='add_startup_span'>Startup Email*</span><br></br>
                            <span className='add_startup_span_sm'>Your email address will be visible on your public profile</span><br></br>
                            <input
                                required
                                type='email'
                                name='email'
                                value={data.email}
                                onChange={(event) => setData({ ...data, email: event.target.value })}
                            />
                            <br></br>

                            <span className='add_startup_span'>Phone</span><br></br>
                            <span className='add_startup_span_sm'>Your phone number will be visible on your public profile</span><br></br>
                            <input
                                type='tel'
                                name='phone'
                                pattern="[+]{1}[0-9]{1,15}"
                                placeholder='+374xxxxxxxx'
                                value={data.phone}
                                onChange={(event) => setData({ ...data, phone: event.target.value })}
                            />
                            <br></br>

                            <span className='add_startup_span'>Country*</span><br></br>
                            <input
                                required
                                type='text'
                                name='country'
                                value={data.country}
                                onChange={(event) => setData({ ...data, country: event.target.value })}
                            />
                            <br></br>

                            <span className='add_startup_span'>City*</span><br></br>
                            <input
                                required
                                type='text'
                                name='city'
                                value={data.city}
                                onChange={(event) => setData({ ...data, city: event.target.value })}
                            />
                            <br></br>
                        </div>
                    </div>

                    <div className='add_startup_right'>
                        <span className='add_startup_span'>Headline*</span><br></br>
                        <span className='add_startup_span_sm'>One-Liner about your Startup</span><br></br>
                        <textarea
                            required
                            name='short_desc'
                            maxLength='150'
                            placeholder='Maximum 150 characters'
                            value={data.headline}
                            onChange={(event) => setData({ ...data, headline: event.target.value })}
                        />
                        <br></br>

                        <span className='add_startup_span'>Description*</span><br></br>
                        <span className='add_startup_span_sm'>A few sentences about your startup you want others to know</span><br></br>
                        <textarea
                            required
                            name='long_desc'
                            maxLength='800'
                            placeholder='Maximum 800 characters'
                            value={data.description}
                            onChange={(event) => setData({ ...data, description: event.target.value })}
                            style={{
                                height: 192
                            }}
                        />
                        <br></br>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <div className='add_startup_upload_item'>
                                <span className='add_startup_span'>Logo*</span><br></br>
                                <span className='add_startup_span_sm'>The file should be a PNG with transparent background</span><br></br>
                                <input
                                    className='add_startup_file_input'
                                    required={logo != null ? false : true}
                                    name='logo'
                                    type='file'
                                    accept=".png"
                                    value={logo == null ? '' : ''}
                                    onChange={(event) => getLogoFile(event.target.files[0])}
                                    style={{
                                        display: logo != null ? 'none' : 'inline-block'
                                    }}
                                />
                                <div
                                    className='add_startup_file_preview'
                                    style={{
                                        display: logo != null ? 'flex' : 'none'
                                    }}
                                >
                                    <img
                                        className="preview_img"
                                        src={logo}
                                    />
                                    <img
                                        className='add_startup_file_close'
                                        src={Close}
                                        onClick={() => setLogo(null)}
                                    />
                                </div>
                            </div>

                            <div className='add_startup_upload_item'>
                                <span className='add_startup_span'>Pitch Deck*</span><br></br>
                                <span className='add_startup_span_sm'>The file should be a PDF</span><br></br>
                                <input
                                    className='add_startup_file_input'
                                    required={pitchDeck != null ? false : true}
                                    name='pdf'
                                    type='file'
                                    accept=".pdf"
                                    value={pitchDeck == null ? '' : ''}
                                    onChange={(event) => getPDFFile(event.target.files[0])}
                                    style={{
                                        marginTop: 12,
                                        display: pitchDeck != null ? 'none' : 'inline-block'
                                    }}
                                />
                                <div
                                    className='add_startup_file_preview'
                                    style={{
                                        marginTop: 17,
                                        display: pitchDeck != null ? 'flex' : 'none'
                                    }}
                                >
                                    <img 
                                        className="checkmark" 
                                        src={Checkmark} 
                                    />
                                    <img 
                                        className='add_startup_file_close' 
                                        src={Close}
                                        onClick={() => setPitchDeck(null)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className='add_startup_next_button'>Next</button>
                </form>
            </div>
        </>
    );
};

export default FirstPage;