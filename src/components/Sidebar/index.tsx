import React, { FC, useState } from "react";
import { rectUnit } from "store/StickersStore";
import { ColorButton, stickerColors, StickerColors, stickerColors as col, textColors } from "../ColorButton";
import { TextButton } from "../TextButton";
import styles from "./Sidebar.module.css"
import { useStore } from "effector-react";
import { selectedStickerStore, selectedStickerTextStore } from "store/SelectedStickerStore";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SidebarProps{

}

export const Sidebar: FC<SidebarProps> = x => {
    const selectedSticker = useStore(selectedStickerStore);
    const selectedStickerText = useStore(selectedStickerTextStore)
    const [selectedColor, setSelectedColor] = useState<StickerColors>("orange")

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
                  color: "#555555"
              }
          })
      }

    const deleteSticker = () => {
        if (!selectedSticker) return;
        rectUnit.events.removeRect(selectedSticker)
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
        {selectedSticker && <Button variant="contained" color="error" onClick={() => deleteSticker()}>Delete sticker</Button>}
        {selectedSticker && selectedSticker.innerText === undefined && <TextButton text="+ New text" onClick={onNewTextClickHandler} style={{fontSize: 24}}/>}
    </div>

    const changeTextColor = (color: string) => {
        if (!selectedStickerText) return;
        if (!selectedStickerText.innerText) return;
        rectUnit.events.updateRect({...selectedStickerText, innerText: {...selectedStickerText.innerText, color: color}})
    }

    const changeFontSize = (size: number) => {
        if (!selectedStickerText) return;
        if (!selectedStickerText.innerText) return;
        rectUnit.events.updateRect({...selectedStickerText, innerText: {...selectedStickerText.innerText, fontSize: size}})
    }

    const deleteText = () => {
        if (!selectedStickerText) return;
        if (!selectedStickerText.innerText) return;
        rectUnit.events.updateRect({...selectedStickerText, innerText: undefined})
    }

    const textEdit = <div className={styles.textEditSection}>
        <span className={styles.textSectionTitle}>Text edit</span>
        <div className={styles.textColorSection}>
            {Object.keys(textColors).map((t, i) => <ColorButton key={i}
                                                           color={t as StickerColors}
                                                           style={{justifySelf: "center",
                                                               width: 30,
                                                               height: 30,
                                                               border: t === selectedColor ? "2px solid #6E625C" : ""}}
                                                                //@ts-ignore
                                                           onClick={() => changeTextColor(textColors[t])}/>)}
        </div>
        <FormControl>
            <InputLabel id="font-size-select">Font size</InputLabel>
            <Select id="font-size-select"
                    label="Font size"
                    style={{width: 120, height: 40}}
                    value={selectedStickerText?.innerText?.fontSize}
                    onChange={v => changeFontSize(v.target.value as number)}>
                {
                    Array.from(Array(60).keys())
                        .filter(k => k%2 === 0 && k !== 0 )
                        .map((s, i) => <MenuItem key={`${s}--${i}`} value={s}>{s}</MenuItem>)
                }
            </Select>
        </FormControl>

        <Button variant="contained" color="error" onClick={() => deleteText()}>Delete text</Button>
    </div>

    return <div className={styles.sidebar}>
        {stickerEdit}
        {selectedStickerText && textEdit}
    </div>
}
