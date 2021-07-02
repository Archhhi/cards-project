import React from 'react';
import './App.css';
import Header from "./component/Header/Header";
import {Route, Redirect, Switch} from "react-router-dom";
import LoginPage from "./component/auth/Login/LoginPage";
import RegistrationPage from "./component/auth/Registration/RegistrationPage";
import ProfilePage from "./component/Profile/ProfilePage";
import RecoverNewPassword from "./component/RecoverNewPassword/RecoverNewPassword";
import EnterNewPassword from "./component/EnterNewPassword/EnterNewPassword";
import EmailSent from "./component/RecoverNewPassword/EmailSent";
import WithAuthRedirect from "./hoc/withAuthRedirect";

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' render={() => <WithAuthRedirect><Redirect to={'/profile'}/></WithAuthRedirect>}/>
        <Route path='/profile' render={() => <WithAuthRedirect><ProfilePage/></WithAuthRedirect>}/>
        <Route path='/login' render={() => <LoginPage/>}/>
        <Route path='/registration' render={() => <RegistrationPage/>}/>
        <Route path='/recoveryNewPassword' render={() => <RecoverNewPassword/>}/>
        <Route path='/enterNewPassword/:token' render={() => <EnterNewPassword/>}/>
        <Route path='/emailSent' render={() => <EmailSent/>}/>
      </Switch>
    </div>
  );
}

export default App;
