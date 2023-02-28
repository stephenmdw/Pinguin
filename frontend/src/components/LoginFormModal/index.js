import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'


function LoginFormModal(props) {
    const showLoginModal = props.showLoginModal
    const setShowLoginModal = props.setShowLoginModal
    const setShowSignUpModal = props.setShowSignUpModal
    return (
        <>
        <button className="modal-login" onClick={() => setShowLoginModal(true)}>Log in</button>
        {showLoginModal && (
            <Modal onClose={() => setShowLoginModal(false)}>
            <LoginForm 
                setShowLoginModal={setShowLoginModal}
                setShowSignUpModal={setShowSignUpModal}
            />
            </Modal>
        )}
        </>
    );
}

export default LoginFormModal;
