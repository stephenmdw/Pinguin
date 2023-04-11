import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';
import { useState } from 'react';
import { useEffect } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  let sessionLinks;

//   let navbar = document.querySelector('.navbar');

// // Add a scroll event listener to the window object
// window.addEventListener('scroll', function() {
//   // Check if the user has scrolled past the top of the navbar
//   if (window.scrollY > navbar.offsetTop) {
//     // Add the 'scrolled' class to the navbar
//     navbar.classList.add('scrolled');
//   } else {
//     // Remove the 'scrolled' class from the navbar
//     navbar.classList.remove('scrolled');
//   }
// });



  if (sessionUser) {
    let username = sessionUser.username
    let initial = username.slice(0,1)
    sessionLinks = (
      <div style={{display:'flex', flexDirection:'row'}}>
      <a href="https://www.linkedin.com/in/stephen-wong-6655a716b/" target="_blank" style={{color:'black'}}><LinkedInIcon style={{fontSize:'30', height:'80px', paddingRight:'10px'}}/></a>
      <a href="https://github.com/stephenmdw" target="_blank" style={{color:'black'}}><GitHubIcon style={{fontSize:'30', height:'80px', paddingRight:'10px'}}/></a>
      <div className='profile-and-session'>
        

        <NavLink className='user-link' to={`/users/${sessionUser.id}`}>
          <div className='user-link-initial'>{initial.toUpperCase()}</div>
        </NavLink>
        <ProfileButton user={sessionUser} />
      </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="session-links">
        <a href="https://www.linkedin.com/in/stephen-wong-6655a716b/" target="_blank"
          style={{paddingRight:'10px',
            fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,"ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro",メイリオ,Meiryo,"ＭＳ Ｐゴシック",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            fontWeight:'700',
            textDecoration:'none',
            color:'black'
          }}
        >LinkedIn</a>
        <a href="https://github.com/stephenmdw" target="_blank"
          style={{paddingRight:'10px',
            fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,"ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro",メイリオ,Meiryo,"ＭＳ Ｐゴシック",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            fontWeight:'700',
            textDecoration:'none',
            color:'black'
          }}
        >GitHub</a>
        <LoginFormModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          setShowSignUpModal={setShowSignUpModal} />
        <SignUpFormModal
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
          setShowLoginModal={setShowLoginModal} />
      </div>
    );
  }

  return (
    <div className='navbar'>
      <div className='left-side'>
        <NavLink className="home-link" exact to="/">
          <div className={sessionUser ? "small-home-button" : "home-button"}></div>
        </NavLink>
        {sessionUser ? <NavLink className="home-text-button" to="/">Home</NavLink> : ""}

        {sessionUser ? <NavLink className="post-form-button" to="/pin-builder">Create</NavLink> : ""}
      </div>
      { sessionUser ? 
      <input style={{width:'70%', 
        backgroundColor:'#E9E9E9', 
        height:'45px', 
        borderRadius:'30px',
        fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, "ＭＳ Ｐゴシック", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        display:'flex',
        marginRight:'20px',
        marginLeft:'20px',
        alignItems:'center',
        paddingLeft:'10px',
        borderStyle:'none'}}
        placeholder='Search feature coming soon'>
      </input> : <></>}
      <div>
        {sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;



