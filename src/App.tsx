import React from 'react';
import './App.css';
import Test from "./component/Test/Test";
import Header from "./component/Header/Header";
import {Route} from "react-router-dom";
import LoginPage from "./component/auth/Login/LoginPage";
import RegistrationPage from "./component/auth/Registration/RegistrationPage";
import ProfilePage from "./component/Profile/ProfilePage";
import RecoverNewPassword from "./component/RecoverNewPassword/RecoverNewPassword";
import EnterNewPassword from "./component/EnterNewPassword/EnterNewPassword";

function App() {
  return (
    <div className="App">
      <Header/>
      <Route path={'/login'} render={() => <LoginPage/>}/>
      <Route path={'/registration'} render={() => <RegistrationPage/>}/>
      <Route path={'/profile'} render={() => <ProfilePage/>}/>
      <Route path={'/recoveryNewPassword'} render={() => <RecoverNewPassword/>}/>
      <Route path={'/enterNewPassword'} render={() => <EnterNewPassword/>}/>
      <Test/>
    </div>
  );
}

export default App;
