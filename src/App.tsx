import React, {useEffect} from 'react';
import s from './App.module.scss';
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
import {useDispatch, useSelector} from "react-redux";
import {initializingApp} from "./redux/reducers/appReducer";
import {AppDispatch, RootStateType} from "./redux/store";
import Preloader from "./common/Preloader/Preloader";

function App() {
  const initializing = useSelector<RootStateType, boolean>(state => state.app.initializing)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(initializingApp())
  }, [])

  if(!initializing) return <Preloader/>

  return (
    <div className={s.app}>
      <Header/>
      <Switch>
        <Route exact path='/' render={() => <WithAuthRedirect><Redirect to={'/profile'}/></WithAuthRedirect>}/>
        <Route path='/profile' render={() => <WithAuthRedirect><ProfilePage/></WithAuthRedirect>}/>
        <Route path='/packs' render={() => <WithAuthRedirect><PacksList/></WithAuthRedirect>}/>
        <Route path='/cards/:cardsPack_id' render={() => <WithAuthRedirect><CardsList/></WithAuthRedirect>}/>
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
