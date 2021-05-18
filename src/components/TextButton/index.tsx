import React, { CSSProperties, FC } from "react";
import styles from "./TextButton.module.css";

type buttonSize = keyof typeof size;
const size = {
    small: "small",
    medium: "medium",
    large: "large"
}
interface TextButtonProps{
    text?: string
    className?: string
    style?: CSSProperties
    emphasized?: boolean
    size?: buttonSize
    onClick?: () => void
}
export const TextButton: FC<TextButtonProps> = x => {
    return <div className={styles.textButtonWrapper}>
        <button className={styles.textButton} onClick={x.onClick} style={x.style}>
            { x.text }
        </button>
    </div>
}