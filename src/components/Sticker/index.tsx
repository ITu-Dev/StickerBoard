import Konva from "konva";
import { KonvaEventObject } from "konva/types/Node";
import React, { FC, useEffect, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { Rectangle } from "../../store";
import { Text } from "../Text/Text";

interface Sticker extends Rectangle{
    index: number
    isSelected: boolean
    onDragStart?: (e: KonvaEventObject<DragEvent>) => void
    onDragStop?: (e: KonvaEventObject<DragEvent>) => void
    onSelect:() => void
    restProps: Rectangle
    onChange:(v: Rectangle) => void
}


export const Sticker: FC<Sticker> = x => {
    
    const [isTextEditing, setIsTextEditing] = useState(true);
    const [isTextTransforming, setIsTextTransforming] = useState(false);
    const [text, setText] = useState("Click to resize. Double click to edit.");
    const [textWidth, setTextWidth] = useState(x.width);
    const [textHeight, setTextHeight] = useState(x.height);

    const rectRef = useRef<Konva.Rect>(null);
    const groupRef = useRef<Konva.Group>(null)
    const textRef = useRef<Konva.Text>(null);
    const transformRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isTextEditing) {
            setIsTextEditing(false);
        } else if (!x.isSelected && isTextTransforming) {
            setIsTextTransforming(false);
        }
    }, [isTextEditing, isTextTransforming]);

    function toggleEdit() {
        setIsTextEditing(!isTextEditing);
    }

    function toggleTransforming() {
        setIsTextTransforming(!isTextTransforming);
    }

    function onTextResize(newWidth: number, newHeight: number) {
        setTextWidth(newWidth);
        setTextHeight(newHeight);
    }

    function onTextChange(value: string) {
        setText(value)
    }

    useEffect(() => {
        if (!x.isSelected) return;
        if (!transformRef.current) return;
        if (!rectRef.current) return;
        if (!groupRef.current) return;
        if (!textRef.current) return;

        transformRef.current.nodes([rectRef.current, textRef.current]);
        transformRef.current.getLayer()?.batchDraw();

      }, [x.isSelected]);

    const groupTransformHandler = (e: KonvaEventObject<Event>) => {
        const node = rectRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        x.onChange({
            ...x.restProps,
            width: Math.round(node.width() * scaleX),
            height: Math.round(node.height() * scaleY),
            rotation: node.rotation()
        });
    }

    return <>
    <Group key={x.index+1}
           id={x.id} draggable
           ref={groupRef}
           onDragStart={x.onDragStart}
           onDragEnd={x.onDragStop} >
        <Rect width={x.width} height={x.height}
              x={0} y={0}
              onClick={x.onSelect}
              fill={x.fill}
              cornerRadius={2}
              shadowBlur={2}
              shadowOpacity={0.4}
              ref={rectRef}
              onTransformEnd={groupTransformHandler}/>
        <Text x={0}
              y={0}
              ref={textRef}
              value={text}
              width={textWidth}
              height={textHeight}
              onResize={onTextResize}
              isEditing={isTextEditing}
              isTransforming={isTextTransforming}
              onToggleEdit={toggleEdit}
              onToggleTransform={toggleTransforming}
              onChange={onTextChange} />
    </Group>
    {x.isSelected && (<Transformer ref={transformRef} boundBoxFunc={(oldBox, newBox) => newBox}/>)}
</>
}
