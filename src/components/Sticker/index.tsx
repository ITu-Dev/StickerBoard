import Konva from "konva";
import { KonvaEventObject } from "konva/types/Node";
import React, { FC, useEffect, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { StickerModel } from "store/StickersStore";
import { Text } from "components/Text/Text"
import { useKeydown } from "utils/useKeydown";
import { selectedStickerTextStore, setSelectedStickerText } from "store/SelectedStickerStore";
import { useStore } from "effector-react";
import { StickerService } from "api/StickerService";

interface StickerProps extends StickerModel{
    index: number
    isSelected: boolean
    onDragStart?: (e: KonvaEventObject<DragEvent>) => void
    onDragStop?: (e: KonvaEventObject<DragEvent>) => void
    onSelect:() => void
    onChange:(v: StickerModel) => void
}


export const Sticker: FC<StickerProps> = x => {
    const textSelected = useStore(selectedStickerTextStore);
    const [isTextEditing, setIsTextEditing] = useState(false);
    const [isTextTransforming, setIsTextTransforming] = useState(false);

    const rectRef = useRef<Konva.Rect>(null);
    const groupRef = useRef<Konva.Group>(null)
    const textRef = useRef<Konva.Text>(null);
    const transformRef = useRef<Konva.Transformer>(null);

    const textDragHandler = (e: KonvaEventObject<DragEvent>) => {
        if (!x.field) return;
        x.onChange({...x, field: {...x.field, x: e.target.x(), y: e.target.y()} })
    }

    useKeydown("Escape", e => {
        setIsTextEditing(false);
        setIsTextTransforming(false);
        setSelectedStickerText(null)
        if (x.field)
            StickerService.updateStickerText(x.field)
    })

    function toggleEdit() {
        setIsTextEditing(p => !p);
        setIsTextTransforming(false)
    }

    function toggleTransforming() {
        setIsTextTransforming(p => !p);
        setIsTextEditing(false)
    }

    function onTextResize(newWidth: number, newHeight: number, rotation: number) {
        if (!x.field) return;
        x.onChange({...x, field: {
            ...x.field,
                width: newWidth,
                height: newHeight,
                rotation: rotation
            }})
    }

    useEffect(() => {
        if (isTextEditing || isTextTransforming)
            setSelectedStickerText(x);
        if (!isTextTransforming && !isTextEditing)
            setSelectedStickerText(null);
    }, [isTextEditing, isTextTransforming, x])

    useEffect(() => {
        if (!x.isSelected) return;
        if (!transformRef.current) return;
        if (!rectRef.current) return;
        if (!groupRef.current) return;

        if (x.field && textRef.current) {
            transformRef.current.nodes([rectRef.current, textRef.current]);
        }
        else
            transformRef.current.nodes([rectRef.current]);
        transformRef.current.getLayer()?.batchDraw();

      }, [x.isSelected, x.field]);

    const groupTransformHandler = (e: KonvaEventObject<Event>) => {
        const node = rectRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        x.onChange({
            ...x,
            width: Math.round(node.width() * scaleX),
            height: Math.round(node.height() * scaleY),
            rotation: node.rotation()
        });
    }

    return <>
    <Group key={x.index+1}
           id={x.idSticker}
           draggable={!isTextEditing && !isTextTransforming}
           ref={groupRef}
           onDragStart={x.onDragStart}
           onDragEnd={x.onDragStop} >
        <Rect width={x.width} height={x.height}
              x={0} y={0}
              onClick={textSelected === null ? x.onSelect : void 0}
              fill={x.colorSticker}
              cornerRadius={2}
              shadowBlur={2}
              shadowOpacity={0.4}
              ref={rectRef}
              onTransformEnd={groupTransformHandler}/>
        {x.field && <Text x={x.field.x}
                          y={x.field.y}
                          draggable={isTextTransforming}
                          ref={textRef}
                          dragStartHandler={textDragHandler}
                          value={x.field?.text}
                          width={x.field.width}
                          height={x.field.height}
                          fontSize={x.field.fontSize}
                          color={x.field.color}
                          onResize={onTextResize}
                          isEditing={isTextEditing}
                          isTransforming={isTextTransforming}
                          onToggleEdit={toggleEdit}
                          onToggleTransform={toggleTransforming}
                          onChange={v => {
                   if (!x.field) return;
                   x.onChange({...x, field: {...x.field, text: v}})
               }}/>}
    </Group>
    {x.isSelected && (<Transformer ref={transformRef} boundBoxFunc={(oldBox, newBox) => newBox}/>)}
</>
}
