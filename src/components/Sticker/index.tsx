import Konva from "konva";
import { KonvaEventObject } from "konva/types/Node";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { currentStickerPosition, setStickerPosition, stickersUnit } from "store/StickersStore";
import { Text } from "components/Text/Text"
import { useKeydown } from "utils/useKeydown";
import { selectedStickerTextStore, setSelectedStickerText } from "store/SelectedStickerStore";
import { useStore } from "effector-react";
import { StickerService } from "api/StickerService";
import { c } from "basic-components/dist/utils/react";
interface StickerProps {
    idSticker: number
    index: number
    isSelected: boolean
    onDragStart?: (e: KonvaEventObject<DragEvent>) => void
    onDragStop?: (e: KonvaEventObject<DragEvent>) => void
    textDragHandler?: (e: KonvaEventObject<DragEvent>) => void
    onSelect:() => void
}

const rotatePoint = ({x, y}:{ x: number, y: number }, rad: number) => {
    const rcos = Math.cos(rad);
    const rsin = Math.sin(rad);
    return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
  };
  
  // will work for shapes with top-left origin, like rectangle
  function rotateAroundCenter(node: Konva.Group, rotation: number) {
    //current rotation origin (0, 0) relative to desired origin - center (node.width()/2, node.height()/2)
    const topLeft = { x: -node.width() / 2, y: -node.height() / 2 };
    const current = rotatePoint(topLeft, node.rotation());
    const rotated = rotatePoint(topLeft, rotation);
    const dx = rotated.x - current.x,
      dy = rotated.y - current.y;
  
    node.rotation(rotation);
    node.x(node.x() + dx);
    node.y(node.y() + dy);
  }
  


export const Sticker: FC<StickerProps> = x => {
    const textSelected = useStore(selectedStickerTextStore);
    const [isTextEditing, setIsTextEditing] = useState(false);
    const [isTextTransforming, setIsTextTransforming] = useState(false);
    const [needUpdateText, setNeedUpdateText] = useState(false);
    const stickerStore = useStore(stickersUnit.store);
    const stickerPos = useStore(currentStickerPosition);
    const sticker = useMemo(() => stickerStore.find(s => s.idSticker === x.idSticker), [stickerStore]);

    const rectRef = useRef<Konva.Rect>(null);
    const groupRef = useRef<Konva.Group>(null)
    const textRef = useRef<Konva.Text>(null);
    const transformRef = useRef<Konva.Transformer>(null);


    useKeydown("Escape", e => {
        setIsTextEditing(false);
        setIsTextTransforming(false);
        setSelectedStickerText(null)  
        setNeedUpdateText(true)
    })

    useEffect(() => {
        if (!needUpdateText) return;
        if (!textRef.current) return;
        if (!isTextEditing && !isTextTransforming  && sticker && sticker.field)
        StickerService.updateStickerText({...sticker.field, stickerUuid: sticker.uuid, x: textRef.current.getPosition().x, y: textRef.current.getPosition().y})
        .then(p => stickersUnit.events.updateRect(p))
        .then(() => setNeedUpdateText(false))
    }, [needUpdateText])

    function toggleEdit() {
        setIsTextEditing(p => !p);
        setIsTextTransforming(false)
    }

    function toggleTransforming() {
        setIsTextTransforming(p => !p);
        setIsTextEditing(false)
    }


    useEffect(() => {
        if (isTextEditing || isTextTransforming)
            setSelectedStickerText(sticker ?? null);
        if (!isTextTransforming && !isTextEditing)
            setSelectedStickerText(null);
    }, [isTextEditing, isTextTransforming, sticker])

    useEffect(() => {
        if (!x.isSelected) return;
        if (!transformRef.current) return;
        if (!rectRef.current) return;
        if (!groupRef.current) return;

        if (sticker?.field && textRef.current) {
            transformRef.current.nodes([rectRef.current, textRef.current]);
        }
        else
            transformRef.current.nodes([rectRef.current]);
        transformRef.current.getLayer()?.batchDraw();

      }, [x.isSelected, sticker?.field]);


    if (!sticker) return <></>;

    function onTextResize(newWidth: number, newHeight: number, rotation: number) {
        if (!sticker?.field) return;
        stickersUnit.events.updateRect({...sticker, field: {
            ...sticker.field,
                width: Math.round(newWidth),
                height: Math.round(newHeight),
                rotation: rotation
            }})
    }

    const groupTransformHandler = (e: KonvaEventObject<Event>) => {
        const node = rectRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        stickersUnit.events.updateRect({
            ...sticker,
            width: Math.round(node.width() * scaleX),
            height: Math.round(node.height() * scaleY),
        });
        //if (gnode)
        //rotateAroundCenter(node, e.currentTarget.rotation())
        console.log(e.currentTarget.rotation())
        if (stickerPos)
            setStickerPosition({...stickerPos, position: {...stickerPos.position, rotation: e.currentTarget.rotation()}})
    }
    //console.log(groupRef && groupRef.current?.rotation())
    return <>
    <Group key={x.index+1}
           id={x.idSticker.toString()}
           draggable={!isTextEditing && !isTextTransforming && x.isSelected}
           ref={groupRef}
           onDragStart={x.onDragStart}
           onDragEnd={x.onDragStop}
           x={sticker.x}
           y={sticker.y}
           width={sticker.width} 
           height={sticker.height}>
        <Rect width={sticker.width} 
              height={sticker.height}
              x={0} y={0}
              onClick={textSelected === null ? x.onSelect : void 0}
              fill={sticker.colorSticker}
              cornerRadius={2}
              shadowBlur={2}
              shadowOpacity={0.4}
              ref={rectRef}
              onTransformEnd={groupTransformHandler}/>
        {sticker.field && <Text x={sticker.field.x}
                          y={sticker.field.y}
                          draggable={isTextTransforming}
                          ref={textRef}
                          dragStopHandler={x.textDragHandler}
                          value={sticker.field?.text}
                          width={sticker.field.width}
                          height={sticker.field.height}
                          fontSize={sticker.field.fontSize}
                          color={sticker.field.color}
                          onResize={onTextResize}
                          isEditing={isTextEditing}
                          isTransforming={isTextTransforming}
                          onToggleEdit={toggleEdit}
                          onToggleTransform={toggleTransforming}
                          onChange={v => {
                   if (!sticker.field) return;
                   stickersUnit.events.updateRect({...sticker, field: {...sticker.field, text: v}})
               }}/>}
    </Group>
    {x.isSelected && (<Transformer ref={transformRef} rotateEnabled={false} boundBoxFunc={(oldBox, newBox) => newBox}/>)}
</>
}
