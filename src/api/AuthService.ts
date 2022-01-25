import { api } from "utils/api";
import { setUser, User } from "store/UserStore";

export namespace AuthService {
    export interface AuthData {
        login: string
        password: string
    }

    export interface RegistrationData {
        login: string
        password: string
        userName: string
    }

    export async function auth(data: AuthData) {
        api.post("/Identity", {login: data.login, password: data.password})
            .then(p => {
                localStorage.setItem("user", JSON.stringify(p.data))
                setUser(p.data as unknown as User)
            })
            .catch(e => {
                console.error(e)
                const mockuser = {
                    idUser: 1,
                    login: 'login',
                    userName: 'username'
                }
                setUser(mockuser)
                localStorage.setItem("user", JSON.stringify(mockuser))
            })
    }

    export async function registration(data: RegistrationData) {
        api.post("registration", {data})
            .then(p => p.status)
            .catch(console.error)
    }
}
