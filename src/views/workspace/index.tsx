import React, { FC, useLayoutEffect, useState } from "react";
import { rectUnit } from "../../store";
import { useStore } from "effector-react";
import styles from "./Workspase.module.css"
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import { Sticker } from "../../components/Sticker";

interface windowSize {
    width: number
    height: number
}

export const Workspace: FC = x => {
    const store = useStore(rectUnit.store);
    const [windowSize, setWidowSize] = useState<windowSize>({width: 500, height: 500})
    const [selected, setSelected] = useState<string | null>();

    useLayoutEffect(() => {
        const updateSize = () => {
            setWidowSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener("resize", updateSize)
        updateSize()
    },[])

    const onDragStartHandler = (e: KonvaEventObject<DragEvent>) => {

    };

    
    //@ts-ignore
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelected(null);
        }
      };


    const onDragStopHandler = (e: KonvaEventObject<DragEvent>) => {

       // if(store.rects.find(r => r.id === e.target.id())) 
            //console.log(e.currentTarget.getPosition(), e.currentTarget.getAbsoluteRotation(),e.target.id(), e.currentTarget.getSize())
    };
    
    return <div className={styles.workspace}>
       
        <Stage width={windowSize.width} height={windowSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}>
            
            <Layer>
                {
                    store.rects?.map((r, index) => <Sticker
                            width={r.width}
                            height={r.height}
                            x={r.x} y={r.y}
                            key={index}
                            onSelect={() => {
                                setSelected(r.id)
                            }}
                            restProps={r}
                            onChange={(n) => {store.rects[index] = n; 
                                rectUnit.events.setRects({rects: store.rects})
                            }}
                            isSelected={r.id === selected}
                            fill={r.fill}
                            rotation={r.rotation} 
                            index={index}
                            onDragStart={onDragStartHandler}
                            onDragStop={onDragStopHandler}
                            id={r.id}/>)
                }
            </Layer>
        </Stage>
    </div>
}
