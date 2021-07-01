import {Dispatch} from "redux";
import {setNewPasswordAPI} from "../../api/api";

const initialState = {
    resetPasswordToken: " ",
    password: " ",
    passwordChangedSuccess: false

}

export const enterNewPasswordReducer = (state: newPasswordStateType = initialState,
                                        action: ActionChangePasswordType) => {
    switch (action.type) {
        case "enterNewPassword/NEW-PASSWORD":
            return {
                ...state, password: action.data.password,
                resetPasswordToken: action.data.resetPasswordToken, passwordChangedSuccess: true
            }
        default:
            return state
    }
}


export const changePasswordAC = (data: PasswordDataType) =>
    ({type: 'enterNewPassword/NEW-PASSWORD', data} as const)

export const changePasswordTC = (password: PasswordDataType) => (dispatch: Dispatch) => {
    setNewPasswordAPI(password)
        .then((res) => {
            dispatch(changePasswordAC(password))
        })
        .catch((error) => console.log(error))
}

export type changePasswordType = ReturnType<typeof changePasswordAC>
export type ActionChangePasswordType = changePasswordType

export type PasswordDataType = {
    resetPasswordToken: string,
    password: string,
    passwordChangedSuccess?: boolean
}

export type newPasswordStateType = PasswordDataType