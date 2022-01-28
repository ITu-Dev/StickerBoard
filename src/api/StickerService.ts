import { api } from "utils/api";
import { UserStore } from "store/UserStore";
import { Field, StickerModel } from "store/StickersStore";
import { selectedStickerStore, selectedStickerTextStore } from "store/SelectedStickerStore";

export namespace StickerService {
    export async function getAll() {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.get(`/StickerBoard/${userId}`)
            .then(p => p.data)
            .catch(console.error)
    }

    export async function create( data: Partial<StickerModel>) {
        const userId = UserStore.getState()?.idUser
        const userUuid = UserStore.getState()?.uuid
        if (!userId || !userUuid) return;
        return await api.post(`/StickerBoard/${userId}`, {
            colorSticker: data.colorSticker,
            x: data.x,
            y: data.y,
            rotation: data.rotation,
            height: data.height,
            width: data.width,
            idSticker: 0,
            userUuid,
            uuid: "0",
            stickerName: "stub"
        })
            .then(p => p.data)
            .catch(console.error)
    }

    export async function updateSticker(data: StickerModel) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.put(`/StickerBoard/putsticker/${userId}`, {
            idSticker: data.idSticker,
            uuid: data.uuid,
            x: data.x,
            y: data.y,
            rotation: data.rotation,
            width: data.width,
            height: data.height,
            colorSticker: data.colorSticker,
            userUuid: data.userUuid,
            stickerName: "stub"
        })
            .then(p => p.data)
            .catch(console.error)
    }

    export async function updateStickerText(data: Partial<Field>) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        console.log(data, "text service")
        return await api.put(`/StickerBoard/putfield/${userId}`, {
            idField: data.idField ?? 0,
            stickerUuid: data.stickerUuid,
            uuid: data.uuid ?? "0",
            text: data.text,
            x: data.x,
            y: data.y,
            rotation: data.rotation,
            width: data.width,
            height: data.height,
            fontSize: data.fontSize,
            color: data.color,
        })
            .then(p => p.data)
            .catch(console.error)
    }

    export async function deleteSticker(stickerUuid: string) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.delete(`StickerBoard/deletesticker/${userId}`, { data: {stickerUuid}})
            .then(p => p.status)
            .catch(console.error)
    }

    export async function deleteField(fieldUuid: string) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.delete(`StickerBoard/deletefield/${userId}`, {data: {fieldUuid}})
            .then(p => p.status)
            .catch(console.error)
    }
}
