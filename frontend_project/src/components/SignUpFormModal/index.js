import './SignupForm.css';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';


function SignUpFormModal(props) {
    const showSignUpModal = props.showSignUpModal
    const setShowSignUpModal = props.setShowSignUpModal
    const setShowLoginModal = props.setShowLoginModal

    return (
        <>
        <button className="modal-signup" onClick={() => setShowSignUpModal(true)}>Sign up</button>
        {showSignUpModal && (
            <Modal onClose={() => setShowSignUpModal(false)}>
                <SignUpForm 
                    setShowSignUpModal={setShowSignUpModal}
                    setShowLoginModal={setShowLoginModal}/>
            </Modal>
        )}
        </>
    );
}

export default SignUpFormModal;
