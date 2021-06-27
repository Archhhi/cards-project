import React from 'react';
import './App.css';
import Header from "./component/Header/Header";
import {Route, Redirect} from "react-router-dom";
import LoginPage from "./component/auth/Login/LoginPage";
import RegistrationPage from "./component/auth/Registration/RegistrationPage";
import ProfilePage from "./component/Profile/ProfilePage";
import RecoverNewPassword from "./component/RecoverNewPassword/RecoverNewPassword";
import EnterNewPassword from "./component/EnterNewPassword/EnterNewPassword";
import {useSelector} from "react-redux";
import {RootStateType} from "./redux/store";

function App() {

  const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

  if(isAuth) return <Redirect to={'/profile'}/>

  return (
    <div className="App">
      <Header/>
      <Route path={'/login'} render={() => <LoginPage/>}/>
      <Route path={'/registration'} render={() => <RegistrationPage/>}/>
      <Route path={'/profile'} render={() => <ProfilePage/>}/>
      <Route path={'/recoveryNewPassword'} render={() => <RecoverNewPassword/>}/>
      <Route path={'/enterNewPassword'} render={() => <EnterNewPassword/>}/>
    </div>
  );
}

export default App;
