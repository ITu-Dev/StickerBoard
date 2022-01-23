import React, { createContext, createRef, CSSProperties, FC, useContext, useEffect } from "react";
import styles from "./ScrollBox.module.css";
import { createEvent, createStore, Store } from "effector";
import { c, smoothScroll } from "basic-components/dist/utils/react";

type ScrollFunctions = {
    readonly scrollTo: (offset: number) => void
    readonly scrollToElement: (el: HTMLElement, offset?: number) => void
    readonly getOffset: (el: HTMLElement) => number
    readonly position: Store<number>

    readonly parentBox?: ScrollFunctions
};

export const ScrollContext = createContext<ScrollFunctions>({
    scrollTo() { return void(0); },
    scrollToElement() { return void(0); },
    getOffset(el) {
        return el.offsetTop;
    },
    position: createStore(0)
});

export type ScrollRef = {
    readonly current?: ScrollFunctions
};

const ownerSymbol = Symbol();
type ActualScrollRef = {
    current?: ScrollFunctions
    owner: symbol
};

export const createScrollRef = (): ScrollRef => {
    const actualRef: ActualScrollRef = {
        owner: ownerSymbol
    };

    return actualRef as ScrollRef;
};

interface ScrollBoxProps {
    children?: React.ReactNode
    style?: CSSProperties
    className?: string
    scrollRef?: ScrollRef
}

export const ScrollBox: FC<ScrollBoxProps> = x => {
    const parent = useContext(ScrollContext);
    const boxRef = createRef<HTMLDivElement>();

    const updatePosition = createEvent<number>("update scroll box position");
    const positionStore = createStore(0).on(updatePosition, (_, n) => n);

    const functions: ScrollFunctions = {
        scrollTo(n) {
            if (boxRef.current)
                smoothScroll(n, boxRef.current);
        },
        scrollToElement(el, n) {
            if (boxRef.current)
                smoothScroll(this.getOffset(el) + (n ?? 0), boxRef.current);
        },
        getOffset(el) {
            return el.offsetTop;
        },
        position: positionStore,
        parentBox: parent
    };

    let actualScrollRef = x.scrollRef as ActualScrollRef | undefined;
    if (actualScrollRef) {
        if (actualScrollRef.owner !== ownerSymbol) {
            console.error("Where did you got this scrollRef?");
            actualScrollRef = undefined;
        } else if (actualScrollRef.current !== undefined) {
            console.error("This scrollRef is already in use");
            actualScrollRef = undefined;
        } else {
            actualScrollRef.current = functions;
        }
    }

    useEffect(() => {
        if (!boxRef.current) return;

        const box = boxRef.current;

        const update = (): void => {
            updatePosition(box.scrollTop ?? 0);
        };

        update();
        box.addEventListener("scroll", update, false);

        return () => {
            if (actualScrollRef)
                actualScrollRef.current = undefined;
            box.removeEventListener("scroll", update, false);
        };
    });

    return <ScrollContext.Provider value={functions}>
        <div className={c(styles.scrollBox, x.className)} ref={boxRef} style={x.style}>
            { x.children }
        </div>
    </ScrollContext.Provider>;
};

export const useScroll = (): ScrollFunctions => useContext(ScrollContext);
