import React, { CSSProperties, useEffect } from "react";
import { ModalBase } from "./ModalBase";
import styles from "./CardModal.module.css";
import { Card } from "../Card/Card";


interface CardModalProps {
    title: React.ReactNode
    bottom?: React.ReactNode
    close: (() => void) | "disabled"
    children: React.ReactNode
    width: string
    useScrim?: boolean
    style?: CSSProperties
    baseStyle?: CSSProperties
    cardStyle?: CSSProperties
    cardHeaderStyle?: CSSProperties
    cardContentStyle?: CSSProperties
    padding?: string
}

const nop = (): void => void(0);

export const CardModal: React.FC<CardModalProps> = x => {
    const close = x.close === "disabled" ? undefined : x.close;
    const closeOnEsc = (ev: KeyboardEvent) => {
        if (ev.key === "Escape")
            close?.();
    };
    useEffect(() => {
        document.addEventListener("keydown", closeOnEsc);
        return () => document.removeEventListener("keydown", closeOnEsc);
    }, []);

    return <ModalBase style={{ zIndex: 10, ...x.baseStyle }} useScrim={!!x.useScrim} close={close ?? nop}>
        <div className={styles.wrapper} style={{ width: x.width, ...x.style }}>
            <Card onClick={e => e.stopPropagation()}
                  style={{ overflow: "hidden", ...x.cardStyle }}
                  headerStyle={x.cardHeaderStyle}
                  contentStyle={{ overflowY: "auto", ...x.cardContentStyle }}
                  padding={x.padding}
                  bottom={x.bottom} title={x.title} hasCloseButton={!!close} onClose={close}>
                { x.children }
            </Card>
        </div>
    </ModalBase>;
};
