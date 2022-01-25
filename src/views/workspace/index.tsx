import React, { FC, useLayoutEffect, useState } from "react";
import { StickerModel, stickersUnit } from "store/StickersStore";
import { useStore } from "effector-react";
import styles from "./Workspase.module.css"
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import { Sticker } from "components/Sticker";
import { selectedStickerStore, setSelectedSticker } from "store/SelectedStickerStore";
import { StickerService } from "api/StickerService";

interface windowSize {
    width: number
    height: number
}


export const Workspace: FC = x => {
    const store = useStore(stickersUnit.store);
    const [windowSize, setWidowSize] = useState<windowSize>({width: 500, height: 500})
    const selected = useStore(selectedStickerStore);


    useLayoutEffect(() => {
        const updateSize = () => {
            setWidowSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener("resize", updateSize)
        updateSize()
    },[])

    const onDragStartHandler = (e: KonvaEventObject<DragEvent>, r: StickerModel) => {
        stickersUnit.events.updateRect({...r, x: e.target.x(), y: e.target.y()})
    };

    //@ts-ignore
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty && selected) {
            StickerService.updateSticker(selected)
            setSelectedSticker(null)
        }
      };

    const onDragStopHandler = (e: KonvaEventObject<DragEvent>, r: StickerModel) => {
        StickerService.updateSticker(r)
    };

    return <div className={styles.workspace}>
        <Stage width={windowSize.width} height={windowSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}>
            
            <Layer>
                {
                    store.map((r, index) => <Sticker
                        {...r}
                            width={r.width}
                            height={r.height}
                            x={r.x} y={r.y}
                            key={index}
                            onSelect={() => {
                                setSelectedSticker(r)
                            }}
                            onChange={(n) => stickersUnit.events.updateRect(n)}
                            isSelected={r.idSticker === selected?.idSticker}
                            colorSticker={r.colorSticker}
                            rotation={r.rotation} 
                            index={index}
                            onDragStart={(e) => onDragStartHandler(e, r)}
                            onDragStop={e => onDragStopHandler(e, r)}
                            idSticker={r.idSticker}/>)
                }
            </Layer>
        </Stage>
    </div>
}
