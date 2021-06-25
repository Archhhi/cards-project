import React from "react";
import s from "./Header.module.scss";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <ul>
          <NavLink to={'login'}>
            <li>Login</li>
          </NavLink>
          <NavLink to={'registration'}>
            <li>Registration</li>
          </NavLink>
          <NavLink to={'profile'}>
            <li>Profile</li>
          </NavLink>
          <NavLink to={'recoveryNewPassword'}>
            <li>RecoveryNewPassword</li>
          </NavLink>
          <NavLink to={'enterNewPassword'}>
            <li>EnterNewPassword</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Header