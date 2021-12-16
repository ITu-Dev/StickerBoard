import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Rectangle, rectUnit } from "../../store";
import { useStore } from "effector-react";
import styles from "./Workspase.module.css"
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/types/Node";
import { Sticker } from "../../components/Sticker";
import { Text } from "../../components/Text/Text";

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

    const onDragStartHandler = (e: KonvaEventObject<DragEvent>, r: Rectangle) => {
        rectUnit.events.updateRect({...r, x: e.target.x(), y: e.target.y()})
    };

    
    //@ts-ignore
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelected(null);
        }
      };


    const onDragStopHandler = (e: KonvaEventObject<DragEvent>) => {};

    const [isTextEditing, setIsTextEditing] = useState(true);
    const [isTextTransforming, setIsTextTransforming] = useState(false);
    const [text, setText] = useState("Click to resize. Double click to edit.");
    const [textWidth, setTextWidth] = useState(300);
    const [textHeight, setTextHeight] = useState(500);

    useEffect(() => {
        if (isTextEditing) {
            setIsTextEditing(false);
        } else if (isTextTransforming) {
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
    
    return <div className={styles.workspace}>
       
        <Stage width={windowSize.width} height={windowSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}>
            
            <Layer>
                <Text x={100}
                      y={200}
                      value={text}
                      width={textWidth}
                      height={textHeight}
                      onResize={onTextResize}
                      isEditing={isTextEditing}
                      isTransforming={isTextTransforming}
                      onToggleEdit={toggleEdit}
                      onToggleTransform={toggleTransforming}
                      onChange={onTextChange} />
                {
                    store.rects?.map((r, index) => <Sticker
                            width={r.width}
                            height={r.height}
                            x={r.x} y={r.y}
                            key={index}
                            onSelect={() => setSelected(r.id)}
                            restProps={r}
                            onChange={(n) => rectUnit.events.updateRect(n)}
                            isSelected={r.id === selected}
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
