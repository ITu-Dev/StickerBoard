import React, { Ref } from "react";
import { ResizeableText } from "./ResizeableText";
import { EditableTextInput } from "./EditableText";
import Konva from "konva";
import { Vector2d } from "konva/types/types";
import { KonvaEventObject } from "konva/types/Node";

export interface EditableTextProps {
    x: number
    y: number
    isEditing: boolean
    isTransforming: boolean
    onToggleEdit: () => void
    onToggleTransform: () => void
    onChange: (v: string) => void
    onResize: (w: number, h: number, r: number) => void
    value: string
    width: number
    height: number
    fontSize: number
    color: string
    draggable: boolean
    dragBoundFn?: (pos: Vector2d) => Vector2d
    dragStartHandler?: (e: KonvaEventObject<DragEvent>) => void
}

export const Text = React.forwardRef((x: EditableTextProps, ref: Ref<Konva.Text>) => {

    return  x.isEditing
        ? <EditableTextInput
            x={x.x}
            y={x.y}
            width={x.width}
            height={x.height}
            fontSize={x.fontSize}
            color={x.color}
            value={x.value}
            onChange={v => x.onChange(v)}
            isEditing={x.isEditing}
            onToggleEdit={x.onToggleEdit}
        />
        : <ResizeableText
            x={x.x}
            y={x.y}
            ref={ref}
            dragStartHandler={x.dragStartHandler}
            dragBoundFn={x.dragBoundFn}
            draggable={x.draggable}
            isSelected={x.isTransforming}
            onClick={x.onToggleTransform}
            onDoubleClick={x.onToggleEdit}
            onResize={x.onResize}
            value={x.value}
            width={x.width}
            fontSize={x.fontSize}
            color={x.color}
        />
})

