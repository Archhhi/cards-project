import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {Redirect} from "react-router-dom";
import {getAuthUserData} from "../redux/reducers/loginReducer";

const WithAuthRedirect: React.FC = ({children}) => {
  let isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthUserData())
  },[isAuth])

  if (!isAuth) {
    return <Redirect to={'/login'}/>
  } else {
    return <> {children} </>
  }
}

export default WithAuthRedirect