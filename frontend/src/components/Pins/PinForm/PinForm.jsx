import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { createPin } from "../../../store/pinsReducer";
import RemoveContent from './RemoveContent'
import { useHistory } from "react-router-dom";

import './PinForm.css'
export default function PinForm() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    // if (!sessionUser) {
    //     console.log(sessionUser)
    //     history.push('/')
    // }

    // let userId = sessionUser.id
    //setting states
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [altText, setAltText] = useState('')
    const [destinationLink, setDestinationLink] = useState('')
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null)


    //handle uploading files
    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        }
        else setPhotoUrl(null);
    }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     let newPin = { ...pin, title, description, altText, destinationLink, photoFile}
    //     dispatch(createPin(newPin))
    // }

    function deleteContent() {
        setTitle("")
        setDescription("")
        setAltText("")
        setDestinationLink("")
        setPhotoFile(null)
        setPhotoUrl(null)
    }

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('pin[title]', title);
    //     formData.append('pin[description]', description);
    //     formData.append('pin[altText]', altText);
    //     formData.append('pin[destinationLink]', destinationLink);
    //     formData.append('pin[photo]', photoFile);
    //     dispatch(createPin(formData)).then(history.push('/'))
    //     deleteContent()
    // }

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('pin[title]', title);
        formData.append('pin[description]', description);
        formData.append('pin[altText]', altText);
        formData.append('pin[destinationLink]', destinationLink);
        formData.append('pin[photo]', photoFile);
        return dispatch(createPin(formData))
            .catch(async (res) => {
                console.log('res:', res )
                let data = await res.clone().json();
            
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
            .then(history.push('/'))
    }


    let preview = null;
    if (photoUrl) preview = <img src={photoUrl} alt="" />;

    //get preview photo to show over the image input area, while not displacing anything
    if (!sessionUser) {
        return null
    } else {
        let username = sessionUser.username
        let initial = username.slice(0, 1)
        return (
            <div className='pin-form-page'>

                <form onSubmit={handleSubmit} className="pin-form">
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <div className='pin-form-wrapper'>

                        <div className='submit-bar'>
                            <div className="dotdotdot">
                                <RemoveContent
                                    setTitle={setTitle}
                                    setDescription={setDescription}
                                    setAltText={setAltText}
                                    setDestinationLink={setDestinationLink}
                                    setPhotoFile={setPhotoFile}
                                    setPhotoUrl={setPhotoUrl}
                                />
                            </div>

                            <div className='save-and-board'>
                                <div className="board-dropdown">

                                </div>
                                <input className="save-input" type="submit" value="Save" />
                            </div>
                        </div>


                        <div className='input-area-wrapper'>
                            <div className="image-upload-area">
                                <div className='image-upload'>
                                    {preview ? <div className="preview-photo"> {preview} </div> :
                                        <div className='image-upload-button-wrapper'>
                                            <div className="image-upload-background" />
                                            <div className="image-upload-dashed">
                                                <div className='image-upload-icon-text'><div className='image-upload-icon' />Drag and drop or click to  <br />upload</div>
                                            </div>
                                            <input
                                                title=' '
                                                type="file"
                                                className="image-upload-button"
                                                onChange={handleFile}></input>
                                        </div>
                                    }
                                </div>
                                <div className='save-from-site-div'><input className='save-from-site-button' type="text" placeholder="Save from site"></input></div>
                            </div>
                            <div className="pin-input-area">

                                <div className='top-input'>
                                    <input
                                        type="text"
                                        placeholder="Add your title"
                                        value={title}
                                        className="title-input"
                                        onChange={(e) => setTitle(e.target.value)}
                                        require='true'>
                                    </input>
                                    <div>
                                        <div></div>
                                        <div className='current-user-graphic'>
                                            <div className='initial-graphic-pinform'>{initial}</div><p className="pin-form-current-user">{sessionUser.username}</p>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Tell everyone what your pin is about"
                                        value={description}
                                        className='description-input'
                                        onChange={(e) => setDescription(e.target.value)}></input>
                                    <input
                                        type="text"
                                        placeholder="Explain what people see in the Pin"
                                        className="alt-text-input"
                                        value={altText}
                                        onChange={(e) => setAltText(e.target.value)}></input>
                                </div>
                                <div className='bottom-input'>
                                    <input
                                        type="text"
                                        className='destination-input'
                                        placeholder="Add a destination link"
                                        value={destinationLink}
                                        onChange={(e) => setDestinationLink(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >

        )
    }
}