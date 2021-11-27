import React, { createContext, FC } from "react";
import { GlobalModalContext, ModalRequestList } from "./GlobalModalContext";
import { useStore } from "effector-react";
import { ModalRequest } from "./types";
import { Delay } from "../special";


const delayMs = 100;
export const ModalDestroyContext = createContext([false, delayMs] as [boolean, number]);

interface ModalContainerProps {
    request: ModalRequest<never, never>
    destroying: boolean
    destroyTimeoutMs: number
}

const ModalContainer: FC<ModalContainerProps> = x => {
    const Component = x.request.component;

    return <div style={x.destroying ? { pointerEvents: "none", userSelect: "none" } : undefined}>
        <ModalDestroyContext.Provider value={[x.destroying, x.destroyTimeoutMs]}>
            <Component {...x.request.props} done={x.request.callback} />
        </ModalDestroyContext.Provider>
    </div>;
};

const ModalCursor: FC<{ item: ModalRequestList; destroying: boolean; destroyTimeoutMs: number }> = x => {
    return <>
        <ModalContainer request={x.item.head} destroying={x.destroying} destroyTimeoutMs={x.destroyTimeoutMs} />
        { /* eslint-disable-next-line @typescript-eslint/no-use-before-define */ }
        <ModalCursorTail list={x.item} />
    </>;
};

const ModalCursorTail: FC<{ list: ModalRequestList }> = x => {
    const tail = useStore(x.list.tail);

    return <Delay timeoutMs={delayMs} item={tail} fn={ModalCursor} />;
};

export const ModalPresenter: FC<{ children?: never | [] }> = () => {
    const context = useStore(GlobalModalContext);

    return <div>
        <Delay timeoutMs={delayMs}
               item={context.modalRequestsHead}
               fn={ModalCursor} />
    </div>;
};
