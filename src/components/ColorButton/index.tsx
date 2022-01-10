import React, { CSSProperties, FC } from "react";
import { c } from "utils/c";
import styles from "./ColorButton.module.css"

export type StickerColors = keyof typeof stickerColors;
export const stickerColors = {
    pink: "#FBB9CD",
    green: "#B5D9AC",
    blue: "#ADCCDE",
    darkGreen: "#5A8178",
    orange: "#F4B66E",

}

export type TextColors = keyof typeof textColors;
export const textColors = {
    lightBlue: "#D9E3F0",
    lightPink: "#f47373",
    gray: "#697689",
    lightGreen: "#37D67A",
    sea: "#2CCCE4",
    base: "#555555",
    dirtyYellow: "#DCE775",
    oneMoreOrange: "#FF8A65",
    purple: "#BA68C8"
}

export const commonColors = {...stickerColors, ...textColors}

interface ColorButtonProps {
    color: StickerColors | TextColors
    onClick?: () => void
    style?: CSSProperties
    className?: string
}

export const ColorButton: FC<ColorButtonProps> = x => {
    return <button className={c(styles.button, x.className)} 
    style={{...x.style, background: commonColors[x.color]}}
    onClick={() => x.onClick?.()}/>
}
