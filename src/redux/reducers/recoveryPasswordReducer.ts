import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {forgotAPI} from "../../api/api";

// в message линк нужно сделать согласно нашим роутам прописаным для
const initialState = {
    email: "nya@nya.nya",
    from: "test-front-admin <ai73a@yandex.by>",
    message: `<div style="background-color: lime; padding: 15px">
password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
}


export const recoveryPasswordReducer = (state: initialStateType = initialState,
                                        action: ActionRecoveryPasswordType) => {
    switch (action.type) {
        case "recoveryPassword/FORGOT":
            return {...state, email: action.email}
        default:
            return state
    }
}

export const ForgotAC = (email: string) => ({type: 'recoveryPassword/FORGOT', email} as const)

//dispatch пока не типизировал, так как нету типа рутового стейта
export const ForgotTC = (data: ForgotDataType) => (dispatch: Dispatch) => {
    forgotAPI(data)
        .then((res) =>{
        dispatch(ForgotAC(data.email))
    })
        .catch((error)=> console.log(error))
}

export type ForgotType = ReturnType<typeof ForgotAC>
export type ActionRecoveryPasswordType = ForgotType

export type ForgotDataType = {
    email: string,
    from: string,
    message: string
}

type initialStateType = ForgotDataType
