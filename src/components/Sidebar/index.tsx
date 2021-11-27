import React, { FC, useState } from "react";
import { rectUnit } from "../../store";
import { ColorButton, Colors } from "../ColorButton";
import { TextButton } from "../TextButton";
import { colors as col } from "../ColorButton";
import styles from "./Sidebar.module.css"

interface SidebarProps{
    mode: "stickerEdit" | undefined
}

export const Sidebar: FC<SidebarProps> = x => {

    const [selectedColor, setSelectedColor] = useState<Colors>("orange")

    const colors: Colors[] = ["blue", "pink", "orange", "green", "darkGreen"];

    const onNewStickerClickHandler = () =>{
        rectUnit.events.addRect({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 350,
          height: 250,
          //@ts-ignore
          fill: col[selectedColor],
          rotation: 0
        })
      }
      
    const stickerEdit = <div className={styles.stickerEdit}>
        <TextButton text="+ New sticker" onClick={() => {onNewStickerClickHandler()}} style={{fontSize: 24}}/>

        <div className={styles.colorBlock}>
           {
               colors.map((v,i) => <ColorButton key={i}  
                    color={v} 
                    style={{justifySelf: "center", 
                    border: v === selectedColor ? "2px solid #6E625C" : ""}}
                    onClick={() => setSelectedColor(v)}/>)
           }
        </div>
    </div>

    return <div className={styles.sidebar}>
        {
            x.mode === "stickerEdit" ? stickerEdit : <></>
        }
    </div>
}