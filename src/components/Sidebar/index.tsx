import React, { FC, useState } from "react";
import { rectUnit } from "store/StickersStore";
import { ColorButton, stickerColors, StickerColors, stickerColors as col, textColors } from "../ColorButton";
import { TextButton } from "../TextButton";
import styles from "./Sidebar.module.css"
import { useStore } from "effector-react";
import { selectedStickerStore, selectedStickerTextStore } from "store/SelectedStickerStore";

interface SidebarProps{
    mode: "stickerEdit" | "textEdit"
}

export const Sidebar: FC<SidebarProps> = x => {
    const selectedSticker = useStore(selectedStickerStore);
    const selectedStickerText = useStore(selectedStickerTextStore)
    const [selectedColor, setSelectedColor] = useState<StickerColors>("orange")

    const colors: StickerColors[] = ["blue", "pink", "orange", "green", "darkGreen"];

    const onNewStickerClickHandler = () => {
        rectUnit.events.addRect({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 350,
          height: 250,
          fill: col[selectedColor],
          rotation: 0
        })
      }

      const onNewTextClickHandler = () => {
        if (selectedSticker)
          rectUnit.events.updateRect({
              ...selectedSticker,
              innerText: {
                  text: "One click to transform. Double click to edit. Escape to close",
                  x: 5,
                  y: 5,
                  width: 200,
                  height: 100,
                  rotation: 0,
                  fontSize: 14,
                  color: "#000"
              }
          })
      }
      
    const stickerEdit = <div className={styles.stickerEdit}>
        <TextButton text="+ New sticker" onClick={onNewStickerClickHandler} style={{fontSize: 24}}/>
        <div className={styles.colorBlock}>
           {
               Object.keys(stickerColors).map((v,i) => <ColorButton key={i}
                    color={v as StickerColors}
                    style={{justifySelf: "center", 
                    border: v === selectedColor ? "2px solid #6E625C" : ""}}
                    onClick={() => setSelectedColor(v as StickerColors)}/>)
           }
        </div>
    </div>

    const changeTextColor = (color: string) => {
        if (!selectedStickerText) return;
        if (!selectedStickerText.innerText) return;
        rectUnit.events.updateRect({...selectedStickerText, innerText: {...selectedStickerText.innerText, color: color}})
    }

    const textEdit = <div>
        Text edit
        <div>
            {Object.keys(textColors).map((t, i) => <ColorButton key={i}
                                                           color={t as StickerColors}
                                                           style={{justifySelf: "center",
                                                               width: 30,
                                                               height: 30,
                                                               border: t === selectedColor ? "2px solid #6E625C" : ""}}
                                                                //@ts-ignore
                                                           onClick={() => changeTextColor(textColors[t])}/>)}
        </div>
    </div>

    return <div className={styles.sidebar}>
        {stickerEdit}
        {selectedSticker && selectedSticker.innerText === undefined && <TextButton text="+ New text" onClick={onNewTextClickHandler} style={{fontSize: 24}}/>}
        {selectedStickerText && textEdit}
    </div>
}
