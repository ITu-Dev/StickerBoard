import React, { CSSProperties, FC } from "react";
import { c } from "../../utils/c";
import styles from "./ColorButton.module.css"

export type Colors = keyof typeof colors;
export const colors = {
    pink: "#FBB9CD",
    green: "#B5D9AC",
    blue: "#ADCCDE",
    darkGreen: "#5A8178",
    orange: "#F4B66E"
}
interface ColorButtonProps {
    color: Colors
    onClick?: () => void
    style?: CSSProperties
    className?: string
}

export const ColorButton: FC<ColorButtonProps> = x => {
    return <button className={c(styles.button, x.className)} 
    style={{...x.style, background: colors[x.color]}}
    onClick={() => x.onClick?.()}/>
}