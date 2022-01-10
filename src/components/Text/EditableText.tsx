import React, { CSSProperties } from "react";
import { Text } from 'react-konva';
import { Html } from "react-konva-utils";

function getStyle(width: number, height: number, fontSize: number, color: string): CSSProperties {
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
        color: color,
        fontSize: `${fontSize}px`,
        fontFamily: "sans-serif"
    };

    return isFirefox ? baseStyle : {
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
    fontSize: number
    color: string
}

export const EditableTextInput: React.FC<EditableInputProps> = x => {
    console.log(x.width, x.height)
    return  x.isEditing
        ? <Html groupProps={{x: x.x, y: x.y}} divProps={{style: {opacity: 1}}}>
            <textarea value={x.value} onChange={v => x.onChange(v.currentTarget.value)} onClick={() => x.onToggleEdit?.(!x.isEditing)}
                      style={getStyle(x.width, x.height, x.fontSize, x.color)}/>
        </Html>
        : <Text x={x.x}
                draggable
                onClick={() => x.onToggleEdit?.(!x.isEditing)}
                y={x.y}
                width={x.width}
                text={x.value}
                fontSize={x.fontSize}
        />
}



