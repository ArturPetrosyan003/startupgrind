import React, { useState } from 'react';

import Zoom from 'react-reveal/Zoom';

import { connect } from 'react-redux';
import { closeEditPopup } from '../redux/actions';

import Close from '../../assets/icons/closeBlack.png';

const EditProfile = (props) => {

    const [logo, setLogo] = useState();

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
            props.closeEditPopup();
        }
    }

    return (
        <div className='startup_backdrop' onClick={closeEditPopup}>
            <Zoom duration={600}>
                <div className='add_startup_container edit_profile_container'>
                    <h2 className='add_startup_text'>Edit Profile</h2>
                    <div className='add_startup_content edit_profile_content'>
                        <form method='POST'>
                            <div className='add_startup_left edit_profile_left'>
                                <div className='add_startup_inputs edit_profile_inputs'>
                                    <span className='add_startup_span'>Name</span><br></br>
                                    <input
                                        required
                                        type='text'
                                        name='name'
                                    // value={data.startupName}
                                    // onChange={(event) => setData({ ...data, startupName: event.target.value })}
                                    />
                                    <br></br>

                                    <span className='add_startup_span'>Surname</span><br></br>
                                    <input
                                        required
                                        type='text'
                                        name='surname'
                                    // value={data.startupName}
                                    // onChange={(event) => setData({ ...data, startupName: event.target.value })}
                                    />
                                    <br></br>

                                    <span className='add_startup_span'>Country</span><br></br>
                                    <input
                                        required
                                        type='text'
                                        name='country'
                                    // value={data.startupName}
                                    // onChange={(event) => setData({ ...data, startupName: event.target.value })}
                                    />
                                    <br></br>

                                    <span className='add_startup_span'>City</span><br></br>
                                    <input
                                        required
                                        type='text'
                                        name='city'
                                    // value={data.startupName}
                                    // onChange={(event) => setData({ ...data, startupName: event.target.value })}
                                    />
                                    <br></br>

                                    <span className='add_startup_span'>Age</span><br></br>
                                    <input
                                        required
                                        type='number'
                                        name='age'
                                    // value={data.startupName}
                                    // onChange={(event) => setData({ ...data, startupName: event.target.value })}
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
                                // value={data.headline}
                                // onChange={(event) => setData({ ...data, headline: event.target.value })}
                                />
                                <br></br>

                                <span className='add_startup_span'>Short summary</span><br></br>
                                <span className='add_startup_span_sm'>Maximum 500 characters</span><br></br>
                                <textarea
                                    required
                                    name='summary'
                                    maxLength='500'
                                    // value={data.description}
                                    // onChange={(event) => setData({ ...data, description: event.target.value })}
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
                            </div>

                            <button className='edit_profile_save_button'>Save</button>
                        </form>
                    </div>
                </div>
            </Zoom>
        </div>
    );
};

const mapDispatchToProps = {
    closeEditPopup
}

export default connect(null, mapDispatchToProps)(EditProfile);