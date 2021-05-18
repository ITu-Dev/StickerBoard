export type ApiEvents<S, E extends object> = {
    [K in keyof E]: (store: S, e: E[K]) => S
};