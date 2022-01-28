import { createApi, createEvent, createStore } from "effector";
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
    idSticker: number
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
    updateRect: (s, r) => {
       return s.map(rect => rect.idSticker === r.idSticker ? r : rect)
    },
})

export const stickersUnit: Model<StickerModel[], StickerEvents> = {
    store: store,
    events
}

interface ItemPosition {
    x: number
    y: number
    rotation: number
}

interface PositionStore {
    id: number
    position: ItemPosition
}

export const currentStickerPosition = createStore<PositionStore | null>(null)
export const setStickerPosition= createEvent<PositionStore>();

currentStickerPosition.on(setStickerPosition, (s, p) => p)