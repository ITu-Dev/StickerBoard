import { ModalFC, ModalRequest, UnwrapModalProps, UnwrapModalReturn } from "./types";
import { popGlobalModalRequest, pushGlobalModalRequest } from "./GlobalModalContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function showModal<TModal extends ModalFC<any, any>>(
    modal: TModal,
    ...props: UnwrapModalProps<TModal> extends undefined ? [] : [UnwrapModalProps<TModal>]
): Promise<UnwrapModalReturn<TModal> | undefined> {

    const result = await new Promise<UnwrapModalReturn<TModal> | undefined>(resolve => {
        const modalRequest: ModalRequest<UnwrapModalProps<TModal>, UnwrapModalReturn<TModal>> = {
            component: modal,
            callback: r => {
                resolve(r);
                popGlobalModalRequest(modalRequest as never);
            },
            props: props[0] as UnwrapModalProps<TModal>
        };

        pushGlobalModalRequest(modalRequest as never);
    });
    return result;
}
