import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';

function RemoveContent(props) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const setTitle = props.setTitle
  const setDescription = props.setDescription
  const setAltText = props.setAltText
  const setDestinationLink = props.setDestinationLink
  const setPhotoFile = props.setPhotoFile
  const setPhotoUrl = props.setPhotoUrl

  //remove the content that has been inputted
  function deleteContent() {
    setTitle("")
    setDescription("")
    setAltText("")
    setDestinationLink("")
    setPhotoFile(null)
    setPhotoUrl(null)
  }



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


  return (
    <div className='remove-content-wrapper' >
      <div className="dotdotdot" onClick={openMenu} />
      {showMenu && (
        <div className="remove-content-dropdown-wrapper">
          <ul className="profile-dropdown">
            <li onClick={(deleteContent)} className='remove-content-button'>
              Reset Form
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RemoveContent;