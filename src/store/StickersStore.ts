import { createApi, createStore } from "effector";
import { ApiEvents } from "utils/ApiEvenst";
import { Model } from "utils/Model";

export interface InnerText {
    text: string
    x: number
    y: number
    rotation: number
    width: number
    height: number
    fontSize: number
    color: string
}

export interface Rectangle {
    id?: string
    x: number
    y: number
    rotation: number
    width: number
    height: number
    fill: string
    innerText?: InnerText
}

export interface RectData {
    rects: Rectangle[]
}

interface RectEvents {
    setRects: RectData,
    addRect: Rectangle
    pushRect: Rectangle
    removeRect: Rectangle
    updateRect: Rectangle
}

const store = createStore<RectData>({ rects: []});

const events = createApi<RectData, ApiEvents<RectData, RectEvents>>(store, {
    setRects: (s, p) => ({...s, p}),
    addRect: (s, p) => ({ rects: [...s.rects, {...p, id: (s.rects.length).toString()} ]}),
    pushRect: (s, p) => {
        s.rects.push(p)
        return ({rects: s.rects});
    },
    removeRect: (s, p) => {
        const rect = s.rects.find(r => r.id === p.id)
        if (rect){
            const selectedIndex = s.rects.indexOf(rect);
            s.rects.splice(selectedIndex, 1);
        }
        return s;
    },
    updateRect: (s, r) => {
        return ({
            rects: [...s.rects.map(rect => rect.id === r.id ? r : rect)]
        })
    }
})

export const rectUnit: Model<RectData, RectEvents> = {
    store: store,
    events
}
