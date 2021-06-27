import {useFormik} from "formik";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import SuperButton from "../../../common/SuperButton/SuperButton";
import SuperInput from "../../../common/SuperInput/SuperInput";
import {registerTC} from "../../../redux/reducers/registrationReducer";
import {RootStateType} from "../../../redux/store";
import s from './RegistrationPage.module.scss';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

const RegistrationPage = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.registration.isRegister)
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length === 0) {
                errors.password = 'enter the password'
            } else if (values.password.length < 4) {
                errors.password = 'password is to small';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'confirm th password'
            }
            return errors;
        },
        onSubmit: values => {
            // dispatch(loginTC(values.email, values.password))
            // console.log(JSON.stringify(values))
            // debugger

            dispatch(registerTC(values.email, values.password))
            formik.resetForm()
        },
    })

    if (isAuth) {
        return <Redirect to='/login'/>
    }

    return (
        <div className={s.registrationWrap}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <h5>It-incubator</h5>
                <p>Sign Up</p>
                <div className={s.group}>
                    <input
                        type='email'
                        color={'black'}
                        {...formik.getFieldProps('email')}
                        onBlur={formik.handleBlur}
                    />
                    <span className={s.bar}/>
                    <label>Email</label>
                    {formik.touched.email && formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}

                </div>
                <div className={s.group}>
                    <input
                        type="password"
                        {...formik.getFieldProps('password')}
                        onBlur={formik.handleBlur}

                    />
                    <span className={s.bar}/>
                    <label>Password</label>
                    {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>
                <div className={s.group}>
                    <input
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                        onBlur={formik.handleBlur}
                    />
                    <span className={s.bar}/>
                    <label>Confirm password</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}
                </div>

                <div>
                    <SuperButton type={'reset'}>Cancel</SuperButton>
                    <SuperButton type={'submit'}>Login</SuperButton>
                </div>
            </form>
        </div>
    )
}

export default RegistrationPage