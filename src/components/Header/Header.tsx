import React from "react";
import s from "./Header.module.scss";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {logout} from "../../redux/reducers/loginReducer";

const Header = React.memo(() => {
  const dispatch = useDispatch()
  const isAuth = useSelector<RootStateType, boolean>(state => state.login.isAuth)
  const onDisabled = useSelector<RootStateType, boolean>(state => state.packs.onDisabled)

  const styleBGColor = onDisabled ? s.bgColorHeader : ''

  return (
    <header className={s.header + ' ' + styleBGColor}>
      <nav className={s.nav}>
        <ul>
          {!isAuth
            ? <NavLink to={'/login'}>
              <li>Login</li>
            </NavLink>
            : <li onClick={() => dispatch(logout())}>Logout</li>
          }
          <NavLink to={'/registration'}>
            <li>Registration</li>
          </NavLink>
          <NavLink to={'/profile'}>
            <li>Profile</li>
          </NavLink>
          <NavLink to={'/packs'}>
            <li>Packs</li>
          </NavLink>
          <NavLink to={'/cards'}>
            <li>Cards</li>
          </NavLink>
          <NavLink to={'/recoveryNewPassword'}>
            <li>RecoveryNewPassword</li>
          </NavLink>
          <NavLink to={'/enterNewPassword'}>
            <li>EnterNewPassword</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  )
})

export default Header