import Konva from "konva";
import { KonvaEventObject } from "konva/types/Node";
import React, { FC, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import { Rectangle } from "../../store";

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
    const rectRef = useRef();
    const transformRef = useRef();

    React.useEffect(() => {
        if (x.isSelected) {
          // we need to attach transformer manually
          //@ts-ignore
          transformRef.current.nodes([rectRef.current]);
          //@ts-ignore
          transformRef.current.getLayer().batchDraw();
        }
      }, [x.isSelected]);
   
    return <>
    <Rect width={x.width} height={x.height}
    //@ts-ignore
    ref={rectRef}
    x={x.x} y={x.y}
    onClick={x.onSelect}
    fill={x.fill}
     cornerRadius={2}
    rotation={x.rotation}
     key={x.index+1}
    draggable
    shadowBlur={2}
    shadowOpacity={0.4}
    onDragStart={x.onDragStart} 
    onDragEnd={x.onDragStop} 
    id={x.id}
    onTransformEnd={e => {
        const node = rectRef.current;
        //@ts-ignore
        const scaleX = node.scaleX();
        //@ts-ignore
        const scaleY = node.scaleY();

        // we will reset it back
        //@ts-ignore
        node.scaleX(1);
        //@ts-ignore
        node.scaleY(1);
        x.onChange({
            ...x.restProps,
            //@ts-ignore
          width: node.width() * scaleX,
          //@ts-ignore
          height: node.height() * scaleY,
        });
    }
}
    >
      {
        // <span>jdsajkdaskdskajdh\kjdfhdskjfhdaskjlfhda</span>
      }
    </Rect>
    {x.isSelected && (
        <Transformer
        //@ts-ignore
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            return newBox;
          }}
        />
      )}
    </>
}