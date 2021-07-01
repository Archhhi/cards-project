import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {forgotAPI} from "../../api/api";
import {AxiosError} from "axios";

// в message линк нужно сделать согласно нашим роутам прописаным для
const initialState = {
    email: "nya@nya.nya",
    from: "test-front-admin <ai73a@yandex.by>",
    message: `<div style="background-color: lime; padding: 15px">
password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
    emailSent: false
}


export const recoveryPasswordReducer = (state: ForgotStateType = initialState,
                                        action: ActionRecoveryPasswordType) => {
    switch (action.type) {
        case "recoveryPassword/FORGOT":
            return {...state, email: action.email, emailSent: true}
        default:
            return state
    }
}

export const forgotAC = (email: string) => ({type: 'recoveryPassword/FORGOT', email} as const)

//dispatch пока не типизировал, так как нету типа рутового стейта
export const forgotTC = (data: ForgotDataType) => (dispatch: Dispatch) => {
    forgotAPI(data)
        .then((res) =>{
        dispatch(forgotAC(data.email))
    })
        .catch((error:AxiosError)=> console.log(error))
}

export type ForgotType = ReturnType<typeof forgotAC>
export type ActionRecoveryPasswordType = ForgotType

export type ForgotDataType = {
    email: string,
    from: string,
    message: string,
    emailSent?: boolean
}

export type ForgotStateType = ForgotDataType
