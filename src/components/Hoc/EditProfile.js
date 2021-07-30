import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { openEditPopup, closeEditPopup, openStartupPopup, closeStartupPopup } from '../redux/actions';

import Close from '../../assets/icons/closeBlack.png';

import Popup from '../Hoc/AddStartup/Popup/Popup';

import Zoom from 'react-reveal/Zoom';

const EditProfile = (props) => {

    const [logo, setLogo] = useState();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [popupScreen, setPopupScreen] = useState(0);

    const userId = localStorage.getItem('_id') || sessionStorage.getItem('_id');

    useEffect(() => {
        setData(props.data);
        setLogo(`data:image/png;base64, ${props.data.avatar}`);
        setLoading(false);
    }, []);

    const updateProfile = async (event) => {
        event.preventDefault();

        const request = await fetch(`https://tranquil-thicket-27487.herokuapp.com/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token') || sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                name: data.name,
                surname: data.surname,
                country: data.country,
                city: data.city,
                age: data.age,
                gender: null,
                headline: data.headline,
                summary: data.summary,
                avatar: logo.split(',')[1]
            })
        });

        const fetchedData = await request.json();

        if (!fetchedData.errors) {
            console.log(fetchedData);
            setPopupScreen(2);
            props.openStartupPopup();
        }
        else {
            console.error(fetchedData.errors);
        }
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

    const closeEditPopup = (event) => {
        if (event.target == event.currentTarget) {
            props.openStartupPopup();
        }
    }

    return (
        <div className='startup_backdrop' onClick={closeEditPopup}>
            <Zoom duration={600}>
                {
                    props.editDialogState == true ?
                        <Popup
                            data={data}
                            popupScreen={popupScreen}
                            fetchData={props.fetchData}
                            functions={{
                                open: props.openEditPopup,
                                close: props.closeStartupPopup
                            }}
                        />
                        :
                        <div className='add_startup_container edit_profile_container'>
                            {
                                loading == false ?
                                    <>
                                        <h2 className='add_startup_text'>Edit Profile</h2>
                                        <div className='add_startup_content edit_profile_content'>
                                            <form method='POST' onSubmit={updateProfile} noValidate>
                                                <div className='add_startup_left edit_profile_left'>
                                                    <div className='add_startup_inputs edit_profile_inputs'>
                                                        <span className='add_startup_span'>Name</span><br></br>
                                                        <input
                                                            required
                                                            type='text'
                                                            name='name'
                                                            value={data.name}
                                                            onChange={(event) => setData({ ...data, name: event.target.value })}
                                                        />
                                                        <br></br>

                                                        <span className='add_startup_span'>Surname</span><br></br>
                                                        <input
                                                            required
                                                            type='text'
                                                            name='surname'
                                                            value={data.surname}
                                                            onChange={(event) => setData({ ...data, surname: event.target.value })}
                                                        />
                                                        <br></br>

                                                        <span className='add_startup_span'>Country</span><br></br>
                                                        <input
                                                            required
                                                            type='text'
                                                            name='country'
                                                            value={data.country}
                                                            onChange={(event) => setData({ ...data, country: event.target.value })}
                                                        />
                                                        <br></br>

                                                        <span className='add_startup_span'>City</span><br></br>
                                                        <input
                                                            required
                                                            type='text'
                                                            name='city'
                                                            value={data.city}
                                                            onChange={(event) => setData({ ...data, city: event.target.value })}
                                                        />
                                                        <br></br>

                                                        <span className='add_startup_span'>Age</span><br></br>
                                                        <input
                                                            required
                                                            type='number'
                                                            name='age'
                                                            value={data.age}
                                                            onChange={(event) => setData({ ...data, age: event.target.value })}
                                                        />
                                                        <br></br>

                                                        <span className='add_startup_span'>Gender</span><br></br>
                                                        <select>
                                                            <option defaultValue value="male">Male</option>
                                                            <option value="femal">Female</option>
                                                        </select>
                                                        <br></br>
                                                    </div>
                                                </div>

                                                <div className='add_startup_right edit_profile_left'>
                                                    <span className='add_startup_span'>Headline</span><br></br>
                                                    <span className='add_startup_span_sm'>Maximum 150 characters</span><br></br>
                                                    <textarea
                                                        required
                                                        name='headline'
                                                        maxLength='150'
                                                        value={data.headline}
                                                        onChange={(event) => setData({ ...data, headline: event.target.value })}
                                                    />
                                                    <br></br>

                                                    <span className='add_startup_span'>Short summary</span><br></br>
                                                    <span className='add_startup_span_sm'>Maximum 500 characters</span><br></br>
                                                    <textarea
                                                        required
                                                        name='summary'
                                                        maxLength='500'
                                                        value={data.summary}
                                                        onChange={(event) => setData({ ...data, summary: event.target.value })}
                                                        style={{
                                                            height: 192
                                                        }}
                                                    />
                                                    <br></br>

                                                    <div className='add_startup_upload_item'>
                                                        <span className='add_startup_span'>Upload a profile photo</span><br></br>
                                                        <input
                                                            className='add_startup_file_input'
                                                            required={logo != null ? false : true}
                                                            name='logo'
                                                            type='file'
                                                            accept='.png'
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
                                                </div>

                                                <button className='edit_profile_save_button'>Save</button>
                                            </form>
                                        </div>
                                    </>
                                    : null
                            }
                        </div>
                }
            </Zoom>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        editDialogState: state.startupDialog
    }
}

const mapDispatchToProps = {
    openStartupPopup,
    closeStartupPopup,
    openEditPopup,
    closeEditPopup
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);