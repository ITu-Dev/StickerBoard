import React, { ForwardedRef, useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";
import Konva from "konva";
import { mergeRefs } from "utils/MergeRefs";
import { Vector2d } from "konva/types/types";
import { KonvaEventObject } from "konva/types/Node";

export interface ResizeableTextProps {
    x: number
    y: number
    value: string
    isSelected: boolean
    width: number
    fontSize: number
    color: string
    onResize: (w: number, h: number, r: number) => void
    onClick: () => void
    onDoubleClick: () => void
    draggable: boolean
    dragBoundFn?: (pos: Vector2d) => Vector2d
    dragStartHandler?: (e: KonvaEventObject<DragEvent>) => void
}

export const ResizeableText = React.forwardRef((x: ResizeableTextProps, ref: ForwardedRef<Konva.Text>) => {
    const textRef = useRef<Konva.Text>(null);
    const transformerRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (!x.isSelected) return;
        if (!transformerRef.current) return;
        if (!textRef.current) return;

        transformerRef.current.nodes([textRef.current]);
        transformerRef.current.getLayer()?.batchDraw();

    }, [x.isSelected]);


    function handleResize() {
        if (textRef.current !== null) {
            const textNode = textRef.current;
            const newWidth = textNode.width() * textNode.scaleX();
            const newHeight = textNode.height() * textNode.scaleY();
            textNode.setAttrs({
                width: newWidth,
                scaleX: 1
            });
            x.onResize(newWidth, newHeight, textNode.rotation());
        }
    }


    return (
        <>
            <Text
                draggable={x.draggable}
                dragBoundFunc={pos => x.dragBoundFn?.(pos) ?? pos}
                onDragStart={x.dragStartHandler}
                x={x.x}
                y={x.y}
                ref={mergeRefs([textRef, ref])}
                text={x.value}
                fill={x.color}
                fontFamily="sans-serif"
                fontSize={x.fontSize}
                perfectDrawEnabled={false}
                onTransformEnd={handleResize}
                onClick={x.onClick}
                onTap={x.onClick}
                onDblClick={x.onDoubleClick}
                onDblTap={x.onDoubleClick}
                width={x.width}
            />
            {x.isSelected && <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => newBox}
            />}
        </>
    );
})
