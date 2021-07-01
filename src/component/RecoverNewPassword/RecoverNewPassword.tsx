import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {forgotTC} from "../../redux/reducers/recoveryPasswordReducer";
import {useFormik} from "formik";
import {AppRootStateType} from "../../redux/store";
import { Redirect } from "react-router-dom";

const RecoverNewPassword = () => {
    const emailSent = useSelector<AppRootStateType, boolean | undefined>
    (state => state.recoveryPassword.emailSent)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link:<a href='http://localhost:3000/cards-project#/enterNewPassword/$token$'>
                link</a>
                      </div>`
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors
        },
        onSubmit: values => {
            dispatch(forgotTC(values))
            formik.resetForm();
        },
    })
      if (emailSent) {
          return <Redirect to={'/emailSent'}/>
      }


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input  {...formik.getFieldProps("email")} />
                {formik.touched.email &&
                formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                <button type={"submit"}>sent</button>
            </form>
        </div>
    )
}

export default RecoverNewPassword


type FormikErrorType = {
    email?: string
}