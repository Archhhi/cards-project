import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {Redirect, useParams} from "react-router-dom";
import {setNewPasswordAPI} from "../../api/api";
import {changePasswordTC} from "../../redux/reducers/enterNewPasswordReducer";
import {AppRootStateType} from "../../redux/store";

const EnterNewPassword = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>();
    const passwordChangedSuccess = useSelector<AppRootStateType, boolean | undefined>
    (state => state.enterNewPassword.passwordChangedSuccess)

    const formik = useFormik({
        initialValues: {
            resetPasswordToken: token,
            password: '',
            passwordVerification: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 5) {
                errors.password = 'must be more than 4 characters';
            } else if (values.password !== values.passwordVerification) {
                errors.passwordVerification = 'Passwords don\'t match';
            }

            return errors
        },
        onSubmit: values => {
            dispatch(changePasswordTC(values))
        },

    })
      if (passwordChangedSuccess) {
          return <Redirect to={'/login'}/>
      }


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input type="password"  {...formik.getFieldProps("password")} />
                    {formik.touched.password &&
                    formik.errors.password
                        ? <div style={{color: "red"}}>{formik.errors.password}</div>
                        : null}
                </div>
                <div>
                    <input type="password"  {...formik.getFieldProps("passwordVerification")} />
                    {formik.touched.passwordVerification &&
                    formik.errors.passwordVerification
                        ? <div style={{color: "red"}}>{formik.errors.passwordVerification}</div>
                        : null}
                </div>

                <button type="submit">sent</button>
            </form>
        </div>
    )
}

export default EnterNewPassword

type FormikErrorType = {
    resetPasswordToken?: any
    password?: string
    passwordVerification?: string
}

