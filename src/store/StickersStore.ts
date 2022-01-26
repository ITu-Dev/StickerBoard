import { createApi, createStore } from "effector";
import { ApiEvents } from "utils/ApiEvenst";
import { Model } from "utils/Model";
import { setSelectedSticker } from "store/SelectedStickerStore";

export interface Field {
    idField: number
    stickerUuid: string
    uuid: string
    text: string
    x: number
    y: number
    rotation: number
    width: number
    height: number
    fontSize: number
    color: string
}

export interface StickerModel {
    idSticker?: string
    uuid: string
    x: number
    y: number
    rotation: number
    width: number
    height: number
    colorSticker: string
    userUuid: string
    field: Field | null
}

interface StickerEvents {
    setRects: StickerModel[],
    addRect: StickerModel
    pushRect: StickerModel
    removeRect: StickerModel
    updateRect: StickerModel
}

const store = createStore<StickerModel[]>([]);

const events = createApi<StickerModel[], ApiEvents<StickerModel[], StickerEvents>>(store, {
    setRects: (s, p) => ([...s, ...p]),
    addRect: (s, p) => ([...s, p ]),
    pushRect: (s, p) => {
        s.push(p)
        return (s);
    },
    removeRect: (s, p) => s.filter(r => r.idSticker !== p.idSticker),
    updateRect: (s, r) => s.map(rect => rect.idSticker === r.idSticker ? r : rect)
})


export const stickersUnit: Model<StickerModel[], StickerEvents> = {
    store: store,
    events
}

