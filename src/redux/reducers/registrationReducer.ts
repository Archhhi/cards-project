import {Dispatch} from "redux"
import {authAPI} from "../../api/api"

const initialState = {
    isRegister: false,
    error: ''
}
type InitialStateType = typeof initialState

type ActionsType = SetIsRegisterACType | SetErrorACType

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-REGISTER':
            return {...state, isRegister: action.value}
        case 'login/SET-ERROR':
            debugger
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setIsRegisterAC = (value: boolean) =>
    ({type: 'login/SET-IS-REGISTER', value} as const)
type SetIsRegisterACType = ReturnType<typeof setIsRegisterAC>

export const setErrorAC = (error: string) =>
    ({type: 'login/SET-ERROR', error} as const)
type SetErrorACType = ReturnType<typeof setErrorAC>

export const registerTC = (email: string, password: string) => {
    debugger
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            const response = await authAPI.auth(email, password)
            debugger
            console.log(response)
            dispatch(setIsRegisterAC(true))
        } catch (e) {
            dispatch(setErrorAC(e.toString())) //todo ask ignat
        }
    }
}
