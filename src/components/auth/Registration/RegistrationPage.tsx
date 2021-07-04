import {useFormik} from "formik";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {registerTC} from "../../../redux/reducers/registrationReducer";
import {RootStateType} from "../../../redux/store";
import s from './RegistrationPage.module.scss'
import eyeImg1 from './../../../common/img/eye1.png'

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

const RegistrationPage = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.registration.isRegister)
    const error = useSelector<RootStateType, string>(state => state.registration.error)

    const dispatch = useDispatch();
    const [activeInput, setActiveInput] = useState(0)
    const [showInputPasswordNumber, setShowInputPasswordNumber] = useState(0)

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
    const onResetFunction = () => {
        formik.resetForm()

        // formik.setFieldValue("email", '')
        // formik.setFieldValue("password", '')
        // formik.setFieldValue("confirmPassword", '')
    }

    return (
        <div className={s.registrationWrap}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <h5>It-incubator</h5>
                <p>Sign Up</p>

                <div className={s.group}>
                    <input
                        onClick={() => {
                            setActiveInput(1)
                        }}
                        type='email'
                        color={'black'}
                        {...formik.getFieldProps('email')}
                        onBlur={formik.handleBlur}
                    />
                    <span className={s.bar}/>
                    <label className={activeInput === 1 || formik.values.email ? `${s.active}` : ''}>Email</label>
                    {formik.touched.email && formik.errors.email &&
                    <div style={{color: 'red'}} className={s.error}>{formik.errors.email}</div>}
                </div>
                <div className={s.group}>
                    <input
                        onClick={() => {
                            setActiveInput(2)
                        }}
                        type={showInputPasswordNumber === 1 ? 'text' : "password"}
                        {...formik.getFieldProps('password')}
                        onBlur={formik.handleBlur}

                    />
                    <span className={s.bar}/>
                    <label
                        className={activeInput === 2 || formik.values.password ? `${s.active}` : ''}>Password</label>
                    {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}} className={s.error}>{formik.errors.password}</div>}
                    <img src={eyeImg1}
                         alt="eye"
                         onMouseDown={() => {
                             setShowInputPasswordNumber(1)
                         }}
                         onMouseUp={() => {
                             setShowInputPasswordNumber(0)
                         }}
                    />
                </div>
                <div className={`${s.group} ${s.lastElement}`}>
                    <input
                        onClick={() => {
                            setActiveInput(3)
                        }}
                        type={showInputPasswordNumber === 2 ? 'text' : "password"}
                        {...formik.getFieldProps('confirmPassword')}
                        onBlur={formik.handleBlur}
                    />
                    <span className={s.bar}/>
                    <label

                        className={activeInput === 3 || formik.values.confirmPassword ? `${s.active}` : ''}>Confirm
                        password</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div style={{color: 'red'}} className={s.error}>{formik.errors.confirmPassword}</div>}
                    <img src={eyeImg1} alt="eye"
                         onMouseDown={() => {
                             setShowInputPasswordNumber(2);
                         }}
                         onMouseUp={() => {
                             setShowInputPasswordNumber(0);
                         }}
                    />
                </div>
                {error && <div className={s.error}>{error}</div>}

                <div className={s.buttons}>
                    <button onClick={onResetFunction}>Cancel</button>
                    <button type={'submit'}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegistrationPage