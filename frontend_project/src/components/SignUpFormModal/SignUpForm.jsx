  import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from '../LoginFormModal';



function SignupForm(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const setShowSignUpModal = props.setShowSignUpModal
  const setShowLoginModal = props.setShowLoginModal

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const changeForm = () => {
    setShowSignUpModal(false)
    setShowLoginModal(true)
  }


  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="login-pinguin-logo"></div>
      <h1 className="login-header">Sign Up to Pinguin</h1>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <div className="login-form-wrapper">

      <label className="login-label">
        Username
        <input
          className="login-input"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="login-label">
        Password
        <input
          className="login-input"
          placeholder="Create a password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="login-label">
        Confirm Password
        <input
          className="login-input"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      </div>

      <button className="login-button" type="submit">Sign Up</button>

      <button className="change-form" onClick={changeForm}> Already a member? Log in</button>
    </form>
  );
}

export default SignupForm;

//merge the login and signup form for the 'already a member' bullshit
//pass in the state virables at a higher level