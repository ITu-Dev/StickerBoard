import React, { Ref } from "react";
import { ResizeableText } from "./ResizeableText";
import { EditableTextInput } from "./EditableText";
import Konva from "konva";

export interface EditableTextProps {
    x: number
    y: number
    isEditing: boolean
    isTransforming: boolean
    onToggleEdit: () => void
    onToggleTransform: () => void
    onChange: (v: string) => void
    onResize: (w: number, h: number) => void
    value: string
    width: number
    height: number
}

export const Text = React.forwardRef((x: EditableTextProps, ref: Ref<Konva.Text>) =>  x.isEditing
    ? <EditableTextInput
        x={x.x}
        y={x.y}
        width={x.width}
        height={x.height}
        value={x.value}
        onChange={v => x.onChange(v)}
        isEditing={x.isEditing}
    />
    : <ResizeableText
        x={x.x}
        y={x.y}
        ref={ref}
        isSelected={x.isTransforming}
        onClick={x.onToggleTransform}
        onDoubleClick={x.onToggleEdit}
        onResize={x.onResize}
        value={x.value}
        width={x.width}
    />)

