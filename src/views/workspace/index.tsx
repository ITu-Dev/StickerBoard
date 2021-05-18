import React, { FC } from "react";
import { rectUnit } from "../../store";
import { useStore } from "effector-react";
import styles from "./Workspase.module.css"
import { Layer, Rect, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";

export const Workspace: FC = x => {
    const store = useStore(rectUnit.store);

    const onDragStartHandler = (e: KonvaEventObject<DragEvent>) => {
        // console.log(e.target.id())
    }

    const onDragStopHandler = (e: KonvaEventObject<DragEvent>) => {
        if(store.rects.find(r => r.id === e.target.id())) 
            console.log(e.currentTarget.getPosition(), e.target.id())
    }
    
    return <div className={styles.workspace}>
       
        <Stage width={1660} height={1080}>
            <Layer>
                {
                    store.rects?.map((r, index) => <Rect width={100} height={150}
                            x={r.x} y={r.y}
                            scaleX={r.scaleX} scaleY={r.scaleY}
                            fill={r.fill} cornerRadius={2}
                            rotation={r.rotation} key={index+1}
                            draggable
                            onDragStart={onDragStartHandler} 
                            onDragEnd={onDragStopHandler} id={r.id}/>)
                }
            </Layer>
        </Stage>
    </div>
}
