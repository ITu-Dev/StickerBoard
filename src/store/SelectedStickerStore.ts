import {createStore, createEvent} from "effector";
import { StickerModel } from "store/StickersStore";

export const selectedStickerStore = createStore<StickerModel | null>(null)
export const setSelectedSticker = createEvent<StickerModel | null>();

selectedStickerStore.on(setSelectedSticker, (s, p) => p)

export const selectedStickerTextStore = createStore<StickerModel | null>(null);
export const setSelectedStickerText = createEvent<StickerModel | null>();

selectedStickerTextStore.on(setSelectedStickerText, (s, p) => p)
