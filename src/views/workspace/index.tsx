import React, { FC, useLayoutEffect, useState } from "react";
import { Rectangle, rectUnit } from "store/StickersStore";
import { useStore } from "effector-react";
import styles from "./Workspase.module.css"
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import { Sticker } from "components/Sticker";
import { selectedStickerStore, setSelectedSticker } from "store/SelectedStickerStore";

interface windowSize {
    width: number
    height: number
}


export const Workspace: FC = x => {
    const store = useStore(rectUnit.store);
    const [windowSize, setWidowSize] = useState<windowSize>({width: 500, height: 500})
    const selected = useStore(selectedStickerStore);


    useLayoutEffect(() => {
        const updateSize = () => {
            setWidowSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener("resize", updateSize)
        updateSize()
    },[])

    const onDragStartHandler = (e: KonvaEventObject<DragEvent>, r: Rectangle) => {
        rectUnit.events.updateRect({...r, x: e.target.x(), y: e.target.y()})
    };

    //@ts-ignore
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedSticker(null)
        }
      };


    const onDragStopHandler = (e: KonvaEventObject<DragEvent>) => {};

    return <div className={styles.workspace}>
        <Stage width={windowSize.width} height={windowSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}>
            
            <Layer>
                {
                    store.rects?.map((r, index) => <Sticker
                        {...r}
                            width={r.width}
                            height={r.height}
                            x={r.x} y={r.y}
                            key={index}
                            onSelect={() => {
                                setSelectedSticker(r)
                            }}
                            onChange={(n) => rectUnit.events.updateRect(n)}
                            isSelected={r.id === selected?.id}
                            fill={r.fill}
                            rotation={r.rotation} 
                            index={index}
                            onDragStart={(e) => onDragStartHandler(e, r)}
                            onDragStop={onDragStopHandler}
                            id={r.id}/>)
                }
            </Layer>
        </Stage>
    </div>
}
