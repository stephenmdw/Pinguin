import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    .then(history.push('/'))
  };

  return (
    <div className="profile-menu-wrapper">
      <button className="profile-menu" onClick={openMenu}>
      </button>
      {showMenu && (
        <div className="profile-dropdown-wrapper">
          <ul className="profile-dropdown">
            <li>User: {user.username}</li>
            <li onClick={logout}>
              <button className='logout-button' onClick={logout}>Log out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;