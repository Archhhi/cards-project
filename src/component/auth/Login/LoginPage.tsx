import React from "react";
import {useFormik} from "formik";
import {LoginValidate} from "../../../utils/validators";
import s from "./LoginPage.module.scss";
import SuperButton from "../../../common/SuperButton/SuperButton";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperCheckbox from "../../../common/SuperCheckBox/SuperCheckBox";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, removeError} from "../../../redux/reducers/loginReducer";
import {RootStateType} from "../../../redux/store";

const LoginPage = () => {

  const error = useSelector<RootStateType, any>(state => state.login.error)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: LoginValidate,

    onSubmit: values => {
      const {email, password, rememberMe} = values
      dispatch(login(email, password, rememberMe))
      formik.resetForm()
    },
  })

  const onRemoveError = () => {
    dispatch(removeError())
  }

  return (
    <div className={s.container}>
      <div className={s.loginBlock}>
        <h1>It-incubator</h1>
        <h2>Sign In</h2>

        <form onSubmit={formik.handleSubmit} className={s.formBlock}>
          <div className={s.inputBlock}>
            <label htmlFor={'email'} className={s.labelText}>Email Address</label>
            <SuperInput
              id={'email'}
              type={'email'}
              name={'email'}
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email}
            />
          </div>

          <div className={s.inputBlock}>
            <label htmlFor={'password'} className={s.labelText}>Password</label>
            <SuperInput
              id={'password'}
              type={'password'}
              name={'password'}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
          </div>

          <SuperCheckbox
            id={'checkbox'}
            type={'checkbox'}
            name={'rememberMe'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <NavLink to={'/recoveryNewPassword'} className={s.linkForgotPassword}>
            <span>forgot password</span>
          </NavLink>

          <SuperButton
            type={'submit'}
            disabled={formik.isSubmitting}
          >Login</SuperButton>

          <span className={s.span}>Don't have an account</span>

          <NavLink to={'/registration'} className={s.linkSignUp}>
            <span>Sign Up</span>
          </NavLink>
        </form>
      </div>

      {error && <div className={s.error}>
        <span className={s.eText}>{error}</span>
        <span className={s.btnCloseError} onClick={onRemoveError}>x</span>
      </div>}

    </div>
  )
}

export default LoginPage