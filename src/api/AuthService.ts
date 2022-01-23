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
        api.post("/auth", {login: data.login, password: data.password})
            .then(p => setUser(p.data as unknown as User))
            .catch(e => {
                console.error(e)
                setUser({
                    idUser: 1,
                    login: 'login',
                    userName: 'username'
                })
            })
    }

    export async function registration(data: RegistrationData) {
        api.post("registration", {data})
            .then(p => p.status)
            .catch(console.error)
    }
}
