import { Effect, Event, Store } from "effector";

//Unsupported partial generics yet
export declare enum EMPTY {}

export type Model<
    S,
    Ev extends EMPTY | object,
    > = {
        store: Store<S>
        events: Ev extends EMPTY ? object :
            {
                [K in keyof Ev]: Event<Ev[K]>
            }
    };