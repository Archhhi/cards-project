import React from "react";
import {useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {Redirect} from "react-router-dom";

const WithAuthRedirect: React.FC = ({children}) => {
  let isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)

  if (!isAuth) {
    return <Redirect to={'/login'}/>
  } else {
    return <> {children} </>
  }
}

export default WithAuthRedirect