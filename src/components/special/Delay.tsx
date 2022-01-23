import { None } from "basic-components/dist/utils/types";
import React, { FC, ReactElement, useEffect, useState } from "react";


type DelayedFC<T> = FC<{ item: T; destroying: boolean; destroyTimeoutMs: number }>;

export const Delay = <T,>(x: { timeoutMs: number; item: T | None; fn: DelayedFC<T> }): ReactElement | null => {
    const [state, setState] = useState(x.item);
    const [delay, setDelay] = useState(false);

    if (state !== x.item) {
        if (!x.item) {
            if (!delay)
                setDelay(true);
        } else {
            setState(x.item);
        }
    }

    useEffect(() => {
        let canceled = false;

        if (delay && x.item !== state) {
            setTimeout(() => {
                if (!canceled) {
                    setState(x.item);
                    setDelay(false);
                }
            }, x.timeoutMs);
        }

        return () => { canceled = true; };
    });

    const Fn = x.fn;

    return state ? <Fn item={state} destroying={delay} destroyTimeoutMs={x.timeoutMs} /> : null;
};
   