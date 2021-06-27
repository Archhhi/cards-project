import axios from "axios";

export type AuthResponseType = {
    addedUser: {}
    error?: string
}

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})
export const authApi = {
    auth(email: string, password: string) {
        // debugger
        return instance.post<AuthResponseType>('auth/register', {email, password})
    }
}