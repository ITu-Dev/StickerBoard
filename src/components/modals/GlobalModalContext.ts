import { createEvent, createStore, Store, Event } from "effector";
import { ModalRequest } from "./types";

export type ModalRequestList = {
    readonly head: ModalRequest<never, never>
    readonly tail: Store<ModalRequestList | null>
    readonly updateTail: Event<ModalRequestList | null>
};

type GlobalModalContext = {
    readonly modalRequestsHead?: ModalRequestList
};

export const pushGlobalModalRequest = createEvent<ModalRequest<never, never>>("push global modal request");
export const popGlobalModalRequest = createEvent<ModalRequest<never, never>>("pop global modal request");

const createNewListHead = (request: ModalRequest<never, never>): ModalRequestList => {
    const newList = {
        head: request,
        tail: createStore<ModalRequestList | null>(null),
        updateTail: createEvent<ModalRequestList | null>("update modal request list tail")
    };

    newList.tail.on(newList.updateTail, (_, n) => n);
    return newList;
};

const addToModalList = (list: ModalRequestList | undefined, request: ModalRequest<never, never>): ModalRequestList => {
    if (!list) {
        return createNewListHead(request);
    }

    const tailState = list.tail.getState();
    if (tailState) {
        addToModalList(tailState, request);
    } else {
        list.updateTail(createNewListHead(request));
    }

    return list;
};

const removeFromModalList = (
    list: ModalRequestList | undefined,
    request: ModalRequest<never, never>
): ModalRequestList | undefined => {

    if (!list) return undefined;

    if (list.head === request) {
        return undefined;
    }

    const tailState = list.tail.getState();
    if (tailState) {
        if (tailState.head === request) {
            list.updateTail(null);
        } else {
            removeFromModalList(tailState, request);
        }
    }

    return list;
};

export const GlobalModalContext = createStore<GlobalModalContext>({})
    .on(pushGlobalModalRequest, (x, r) => {
        const newHead = addToModalList(x.modalRequestsHead, r);
        return newHead !== x.modalRequestsHead ? ({
            ...x,
            modalRequestsHead: newHead
        }) : x;
    })
    .on(popGlobalModalRequest, (x, r) => {
        const newHead = removeFromModalList(x.modalRequestsHead, r);
        return newHead !== x.modalRequestsHead ? ({
            ...x,
            modalRequestsHead: newHead
        }) : x;
    });
