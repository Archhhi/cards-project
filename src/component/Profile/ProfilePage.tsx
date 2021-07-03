import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUserData} from "../../redux/reducers/loginReducer";
import {RootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";

const ProfilePage = () => {
  const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)


  if(!isAuth) return <Redirect to={'/profile'}/>

  return (
    <div>
      Profile page
    </div>
  )
}

export default ProfilePage