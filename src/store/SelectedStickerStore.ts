import {createStore, createEvent} from "effector";
import { Rectangle } from "store/StickersStore";

export const selectedStickerStore = createStore<Rectangle | null>(null)
export const setSelectedSticker = createEvent<Rectangle | null>();

selectedStickerStore.on(setSelectedSticker, (s, p) => p)

export const selectedStickerTextStore = createStore<Rectangle | null>(null);
export const setSelectedStickerText = createEvent<Rectangle | null>();

selectedStickerTextStore.on(setSelectedStickerText, (s, p) => p)
