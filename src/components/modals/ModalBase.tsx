import React, { CSSProperties, FC, useContext } from "react";
import { c } from "../../utils/c";
import styles from "./ModalBase.module.css";
import { ModalDestroyContext } from "./ModalPresenter";


interface ModalBaseProps {
    readonly useScrim: boolean
    readonly close: () => void
    style?: CSSProperties
}

export const ModalBase: FC<ModalBaseProps> = x => {
    const [destroying, destroyTimeout] = useContext(ModalDestroyContext);
    return <div className={c(styles.modalScrim, destroying ? styles.modalDestroying : styles.modalActive)}
                style={{
                    background: x.useScrim ? "#00000060" : undefined,
                    "--destroyTimeout": destroyTimeout + "ms",
                    ...(x.style ? x.style : {})
                } as CSSProperties}
                onClick={x.close}>
        { x.children }
    </div>;
};
