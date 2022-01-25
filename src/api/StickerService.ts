import { api } from "utils/api";
import { UserStore } from "store/UserStore";
import { Field, StickerModel } from "store/StickersStore";

export namespace StickerService {
    export async function getAll(id: number) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.get(`/StickerBoard/${userId}`)
    }

    export async function create( data: Partial<StickerModel>) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.post(`/StickerBoard/${userId}`, {
            colorSticker: data.colorSticker,
            x: data.x,
            y: data.y,
            rotation: data.rotation,
            height: data.height,
            width: data.width,
        })
            .then(p => p.data)
            .catch(console.error)
    }

    export async function updateSticker(data: StickerModel) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.put(`/StickerBoard/putsticker/${userId}`, {data})
            .then(p => p.data)
            .catch(console.error)
    }

    export async function updateStickerText(data: Partial<Field>) {
        const userId = UserStore.getState()?.idUser
        if (!userId) return;
        return await api.put(`/StickerBoard/putfiled/${userId}`, {data})
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
        return await api.delete(`StickerBoard/deletefield/${userId}`, {data: fieldUuid})
            .then(p => p.data)
            .catch(console.error)
    }
}
