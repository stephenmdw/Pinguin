import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import { deletePin, updatePin } from "../../../store/pinsReducer";
import RemoveContent from "../PinForm/RemoveContent";


export default function PinEditForm({ setShowPinEditModal, pin }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    let userId = sessionUser.id
    const history = useHistory()

    //setting states
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(pin.title)
    const [description, setDescription] = useState(pin.description)
    const [altText, setAltText] = useState(pin.altText)
    const [destinationLink, setDestinationLink] = useState(pin.destinationLink)


    function handleSubmit(e) {
        e.preventDefault()
        let newPin = { ...pin, title, description, altText, destinationLink }
        if (dispatch(updatePin(newPin))) {
            setShowPinEditModal(false)
        }
    }

    function deleteCurrentPin() {
        dispatch(deletePin(pin.id)).then(setShowPinEditModal(false))

    }

    function deleteContent() {
        setTitle("")
        setDescription("")
        setAltText("")
        setDestinationLink("")
    }

    //get preview photo to show over the image input area, while not displacing anything

    return (
        <div className='background-shade'>
            <form className="pin-edit-form">
                <div className='pin-edit-form-wrapper'>
                    <header className='edit-header'>Edit this Pin</header>
                    {/* <div className='submit-bar'>
                    <div className="dotdotdot">
                        <RemoveContent
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setAltText={setAltText}
                            setDestinationLink={setDestinationLink}
                        />
                    </div>

                </div> */}
                    <div className="pin-edit-area">
                        <div className='left-edit-input'>
                            <div className='edit-input-wrapper'>
                                <div className='label-edit-wrapper'>
                                    <label>Title</label>
                                </div>
                                <div className='single-line-edit-input-wrapper'>
                                    <input
                                        type="text"
                                        placeholder="Add your title"
                                        value={title}
                                        className="single-line-edit-input"
                                        onChange={(e) => setTitle(e.target.value)}
                                        require='true'>
                                    </input>
                                </div>
                            </div>
                            <div className='edit-input-wrapper'>
                                <div className='label-edit-wrapper'>
                                    <label>Description</label>
                                </div>
                                <div className='description-edit-input-wrapper'>
                                    <input
                                        type="text"
                                        placeholder="Tell everyone what your pin is about"
                                        value={description}
                                        className='description-edit-input'
                                        onChange={(e) => setDescription(e.target.value)}></input>
                                </div>

                            </div>
                            <div className='edit-input-wrapper'>
                                <div className='label-edit-wrapper'>
                                    <label>Alt text</label>
                                </div>
                                <div className='single-line-edit-input-wrapper'>

                                    <input
                                        type="text"
                                        placeholder="Explain what people see in the Pin"
                                        className="single-line-edit-input"
                                        value={altText}
                                        onChange={(e) => setAltText(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='edit-input-wrapper'>
                                <div className='label-edit-wrapper'>
                                    <label>Website</label>
                                </div>
                                <div className='single-line-edit-input-wrapper'>
                                    <input
                                        type="text"
                                        className='single-line-edit-input'
                                        placeholder="Add a destination link"
                                        value={destinationLink}
                                        onChange={(e) => setDestinationLink(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img className='image-edit-preview' src={pin.photoUrl} />
                        </div>
                    </div>
                    <div className='save-and-delete-wrapper'>
                        <div>
                            <button className="delete-button" onClick={deleteCurrentPin}>
                                Delete</button>
                        </div>
                        <div className='cancel-and-save'>
                            <button className='cancel-button' onClick={() => setShowPinEditModal(false)}>Cancel</button>
                            {/* <input className="save-input" type="submit" value="Save" /> */}
                            <button className='save-edit-button' onClick={(e) => handleSubmit(e)}>Save</button>
                        </div>
                    </div>

                </div>
            </form>
            </div>
    )
}