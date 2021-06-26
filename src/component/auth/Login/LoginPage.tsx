import React from "react";
import {useFormik} from "formik";
import {LoginValidate} from "../../../utils/validators";
import s from "./LoginPage.module.scss";
import SuperButton from "../../../common/SuperButton/SuperButton";
import SuperInput from "../../../common/SuperInput/SuperInput";
import SuperCheckbox from "../../../common/SuperCheckBox/SuperCheckBox";

const LoginPage = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: LoginValidate,

    onSubmit: values => {
      // dispatch(loginTC(values))
      alert(JSON.stringify(values))
      formik.resetForm()
    },
  })
  return (
    <div>
      <h1>It-incubator</h1>
      <h2>Sign In</h2>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor={'email'} className={s.labelText}>Email Address</label>
        <SuperInput
          id={'email'}
          type={'email'}
          name={'email'}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <label htmlFor={'password'} className={s.labelText}>Password</label>
        <SuperInput
          id={'password'}
          type={'password'}
          name={'password'}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <SuperCheckbox
          id={'checkbox'}
          type={'checkbox'}
          name={'checkbox'}
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <SuperButton type={'submit'} disabled={formik.isSubmitting}>Login</SuperButton>
      </form>
    </div>
  )
}

export default LoginPage