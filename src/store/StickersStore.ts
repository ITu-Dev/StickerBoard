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

interface RectEvents {
    setRects: Rectangle[],
    addRect: Rectangle
    pushRect: Rectangle
    removeRect: Rectangle
    updateRect: Rectangle
}

const store = createStore<Rectangle[]>([]);

const events = createApi<Rectangle[], ApiEvents<Rectangle[], RectEvents>>(store, {
    setRects: (s, p) => ([...s, ...p]),
    addRect: (s, p) => ([...s, {...p, id: (s.length).toString()} ]),
    pushRect: (s, p) => {
        s.push(p)
        return (s);
    },
    removeRect: (s, p) => s.filter(r => r.id !== p.id),
    updateRect: (s, r) => s.map(rect => rect.id === r.id ? r : rect)
})

export const rectUnit: Model<Rectangle[], RectEvents> = {
    store: store,
    events
}
