import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Redirect, Switch} from "react-router-dom";
import LoginPage from "./components/auth/Login/LoginPage";
import RegistrationPage from "./components/auth/Registration/RegistrationPage";
import ProfilePage from "./components/Profile/ProfilePage";
import RecoverNewPassword from "./components/RecoverNewPassword/RecoverNewPassword";
import EnterNewPassword from "./components/EnterNewPassword/EnterNewPassword";
import EmailSent from "./components/RecoverNewPassword/EmailSent";
import WithAuthRedirect from "./hoc/withAuthRedirect";
import PacksList from "./components/PacksList/PacksList";
import CardsList from "./components/CardsList/CardsList";

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' render={() => <WithAuthRedirect><Redirect to={'/profile'}/></WithAuthRedirect>}/>
        <Route path='/profile' render={() => <WithAuthRedirect><ProfilePage/></WithAuthRedirect>}/>
        <Route path='/packs' render={() => <PacksList/>}/>
        <Route path='/cards' render={() => <CardsList/>}/>
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
