import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUserData} from "../../redux/reducers/loginReducer";
import {RootStateType} from "../../redux/store";

const ProfilePage = () => {
  const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthUserData())
  },[isAuth])

  return (
    <div>
      Profile page
    </div>
  )
}

export default ProfilePage