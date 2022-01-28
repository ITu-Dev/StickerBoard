import React, { FC, useLayoutEffect, useState } from "react";
import { currentStickerPosition, setStickerPosition, StickerModel, stickersUnit } from "store/StickersStore";
import { useStore } from "effector-react";
import styles from "./Workspase.module.css"
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import { Sticker } from "components/Sticker";
import { selectedStickerStore, setSelectedSticker, setSelectedStickerText} from "store/SelectedStickerStore";
import { StickerService } from "api/StickerService";

interface windowSize {
    width: number
    height: number
}


export const Workspace: FC = x => {
    const store = useStore(stickersUnit.store);
    const [windowSize, setWidowSize] = useState<windowSize>({width: 500, height: 500})
    const selected = useStore(selectedStickerStore);
    const selectedStickerPosition = useStore(currentStickerPosition);

    useLayoutEffect(() => {
        const updateSize = () => {
            setWidowSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener("resize", updateSize)
        updateSize()
    },[])

    const onDragStartHandler = (e: KonvaEventObject<DragEvent>, r: StickerModel) => {
        //stickersUnit.events.updateRect({...r, x: e.target.x(), y: e.target.y()})
    };

    //@ts-ignore
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty && selected) {
            const founded = store.find(s => s.idSticker === selected.idSticker)
            if (founded)
                StickerService.updateSticker({
                    ...founded, 
                    x: selectedStickerPosition?.position.x ?? founded.x, 
                    y: selectedStickerPosition?.position.y ?? founded.y,
                    rotation: selectedStickerPosition?.position.rotation ?? founded.rotation})
                    .then(p => stickersUnit.events.updateRect(p))
            setSelectedSticker(null)
        }
      };

    const onDragStopHandler = (e: KonvaEventObject<DragEvent>, r: StickerModel) => {
        setStickerPosition({
            id: r.idSticker,
            position: {
                x: Math.round(e.target.x()),
                y: Math.round(e.target.y()),
                rotation: r.rotation
            } 
        })
        
        
    };

    const textDragHandler = (e: KonvaEventObject<DragEvent>, r: StickerModel) => {
        // if (!r.field?.idField) return;
        // stickersUnit.events.updateRect({
        //     ...r, 
        //     field: {
        //         ...r.field,
        //         stickerUuid: r.uuid,
        //         x: Math.round(e.target.x()), 
        //         y: Math.round(e.target.y())
        //     }});
        //     setSelectedStickerText({
        //         ...r, 
        //         field: {
        //             ...r.field,
        //             stickerUuid: r.uuid,
        //             x: Math.round(e.target.x()), 
        //             y: Math.round(e.target.y())
        //         }})
    }

    return <div className={styles.workspace}>
        <Stage width={windowSize.width} height={windowSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}>
            
            <Layer>
                {
                    store.map((r, index) => <Sticker
                            key={index}
                            onSelect={() => {
                                setSelectedSticker(r)
                                setStickerPosition({
                                    id: r.idSticker,
                                    position: {
                                        x: r.x,
                                        y: r.y,
                                        rotation: r.rotation 
                                    } 
                                })
                            }}
                            isSelected={r.idSticker === selected?.idSticker}
                            index={index}
                            onDragStart={(e) => onDragStartHandler(e, r)}
                            onDragStop={e => onDragStopHandler(e, r)}
                            textDragHandler={e => textDragHandler(e, r)}
                            idSticker={r.idSticker}/>)
                }
            </Layer>
        </Stage>
    </div>
}
