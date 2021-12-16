import React, { ForwardedRef, useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";
import Konva from "konva";
import { mergeRefs } from "../../utils/MergeRefs";

export interface ResizeableTextProps {
    x: number
    y: number
    value: string
    isSelected: boolean
    width: number
    onResize: (w: number, h: number) => void
    onClick: () => void
    onDoubleClick: () => void
}

export const ResizeableText = React.forwardRef((x: ResizeableTextProps, ref: ForwardedRef<Konva.Text>) => {
    const textRef = useRef<Konva.Text>(null);
    const transformerRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (x.isSelected) return;
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
            x.onResize(newWidth, newHeight);
        }
    }

    const transformer = x.isSelected ? (
        <Transformer
            ref={transformerRef}
            rotateEnabled={false}
            flipEnabled={false}
            boundBoxFunc={(oldBox, newBox) =>  newBox}
        />
    ) : null;
    console.log(x.isSelected, "isSelected")
    return (
        <>
            <Text
                x={x.x}
                y={x.y}
                ref={mergeRefs([textRef, ref])}
                text={x.value}
                fill="black"
                fontFamily="sans-serif"
                fontSize={16}
                perfectDrawEnabled={false}
                onTransform={handleResize}
                onClick={x.onClick}
                onTap={x.onClick}
                onDblClick={x.onDoubleClick}
                onDblTap={x.onDoubleClick}
                width={x.width}
            />
            {transformer}
        </>
    );
})
