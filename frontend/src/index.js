import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import csrfFetch, { restoreCSRF } from './store/csrf'
import { Provider } from 'react-redux';
import { signupUser } from './store/usersReducer';
import configureStore from './store/index'
import { BrowserRouter } from 'react-router-dom';
import { restoreSession } from './store/csrf';
import * as sessionActions from './store/session'
import { ModalProvider } from './context/Modal';

// window.loginUser = loginUser;
// window.logoutUser = logoutUser;
const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  window.store = store; //why is window.store not defined here?
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

window.signupUser = signupUser;

// const initialState = {

// }

// const initializeApp = () => {
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
  let initialState = {};
  
  // if (currentUser) {
  //   initialState = {
  //     users: {
  //       [currentUser.id]: currentUser
  //     }
  //   }
  // }
  
  function Root(){
    return (
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    )
  }

  // ReactDOM.render(
  //   <React.StrictMode>
  //     <Provider store = {store}>
  //       <App />
  //     </Provider>
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // );

  const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
        <Root/>
    </React.StrictMode>,
    document.getElementById('root')
    );
  }

  if (
    sessionStorage.getItem("currentUser") === null ||
    sessionStorage.getItem("X-CSRF-Token") === null 
  ) {
    store.dispatch(sessionActions.restoreSession()).then(renderApplication);
  } else {
    renderApplication();
  }

// }


// restoreSession().then(initializeApp);