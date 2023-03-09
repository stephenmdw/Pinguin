import React from "react";
import { Route, Switch } from 'react-router-dom'
import Navigation from "./components/Navigation/Navigation.jsx";
import PinForm from "./components/Pins/PinForm/PinForm";
import { useSelector } from "react-redux"
import PinIndex from "./components/Pins/PinIndex";
import LoggedOutHome from "./components/LoggedOutHome/LoggedOutHome";
import PinShow from "./components/Pins/PinShow";
import UserShow from "./components/User/UserShow";
import { useHistory } from "react-router-dom";
import BoardShow from "./components/Boards/BoardShow";
// import BoardIndex from "./components/Boards/BoardIndex";
// import LoginFormPage from "./components/LoginFormModal/LoginForm";
// import SignupFormPage from "./components/SignUpFormModal/SignUpForm.jsx";

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  function requireLogIn(component){
    return !sessionUser ? history.push('/') : component
  }

  return (
    <>
    <Navigation/>
      <Switch>
        <Route path="/pin-builder/">
          {/* <PinForm/>  */}
          {requireLogIn(<PinForm/>)}
        </Route>
        <Route exact path="/pin/:pinId">
          {/* <PinShow/>
           */}
            {requireLogIn(<PinShow/>)}
        </Route>
        <Route path="/users/:userId/boards/:boardId">
          <BoardShow/>
          {/* {requireLogIn(<BoardShow/>)} */}
        </Route>
        <Route path="/users/:userId/:boardType">
          {/* <UserShow/> */}
          {requireLogIn(<UserShow/>)}
        </Route>
        <Route path="/users/:userId/">
          {/* <UserShow/> */}
          {requireLogIn(<UserShow/>)}
        </Route>
        <Route path="/board-builder">
          {/* <BoardCreate/> */}
        </Route>
        <Route path="/">
          {sessionUser ? <PinIndex/> : <LoggedOutHome/>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
