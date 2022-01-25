import { createEffect, createEvent, createStore } from "effector";

export interface User {
    idUser: number
    login: string
    userName: string
    uuid: string
}

export const UserStore = createStore<User | null>(null);
export const setUser = createEvent<User | null>()
export const removeUser = createEvent()

UserStore.on(setUser, (s, p) => p);
UserStore.on(removeUser, (s) => null);
