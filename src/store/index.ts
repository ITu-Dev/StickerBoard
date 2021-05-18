import { createStore,createApi } from "effector";
import { ApiEvents } from "../utils/ApiEvenst";
import { Model } from "../utils/Model";

interface Rectangle {
    id?: string
    x: number
    y: number
    rotation: number
    scaleX: number
    scaleY: number
    fill: string
}

export interface RectData {
    rects: Rectangle[] 
}

interface RectEvents {
    setRects: RectData,
    addRect: Rectangle
}

const store = createStore<RectData>({ rects: []});

const events = createApi<RectData, ApiEvents<RectData, RectEvents>>(store, {
    setRects: (s, p) => ({...s, p}),
    addRect: (s, p) => ({ rects: [...s.rects, {...p, id: (s.rects.length).toString()} ]})
})

export const rectUnit: Model<RectData, RectEvents> = {
    store: store,
    events
}