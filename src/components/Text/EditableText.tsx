import React, { CSSProperties } from "react";
import { Text } from 'react-konva';
import { Html } from "react-konva-utils";

function getStyle(width: number, height: number): CSSProperties {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const baseStyle: CSSProperties = {
        width: `${width}px`,
        height: `${height}px`,
        border: "1px solid #000",
        padding: "0px",
        margin: "0px",
        background: "none",
        outline: "none",
        resize: "none",
        color: "black",
        fontSize: "16px",
        fontFamily: "sans-serif"
    };
    if (isFirefox) {
        return baseStyle;
    }
    return {
        ...baseStyle,
        marginTop: "-4px"
    };
}

export interface EditableInputProps {
    x: number
    y: number
    isEditing?: boolean
    onToggleEdit?: (v: boolean) => void
    onChange: (v: string ) => void
    value: string
    width: number
    height: number
}

export const EditableTextInput: React.FC<EditableInputProps> = x => {
    console.log(x.isEditing, "isEditing")
    return  x.isEditing
        ? <Html groupProps={{x: x.x, y: x.y}} divProps={{style: {opacity: 1}}}>
            <textarea value={x.value} onChange={v => x.onChange(v.currentTarget.value)}
                      style={getStyle(x.width, x.height)}/>
        </Html>
        : <Text x={x.x}
                y={x.y}
                width={x.width}
                text={x.value}
        />
}



