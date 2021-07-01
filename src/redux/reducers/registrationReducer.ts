import {Dispatch} from "redux"


const initialState = {
    isRegister: false
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-IS-REGISTER':
            debugger
            return {...state, isRegister: action.value}
        default:
            return state
    }
}

export const setIsRegisterAC = (value: boolean) =>
    ({type: 'login/SET-IS-REGISTER', value} as const)
type ActionsType = ReturnType<typeof setIsRegisterAC>

export const registerTC = (email: string, password: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        try {
            const response = await authApi.auth(email, password)
            dispatch(setIsRegisterAC(true))
        } catch (e) {
            alert(e)
        }
    }
}
