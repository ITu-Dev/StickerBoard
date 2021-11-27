/* eslint-disable @typescript-eslint/no-explicit-any */

import { Defined, None, TypeError } from "basic-components/dist/utils/types";
import { ReactElement } from "react";

export type ModalAutoProps<TResult> = [TResult] extends [Defined]
    ? { done(result: TResult | undefined): void }
    : { done(): void };

export type ModalProps<TProps = undefined, TResult = undefined> =
    TProps extends Defined
        ? TProps extends None
            ? TypeError<"TProps can be either undefined or not-nullable type">
            : TProps & ModalAutoProps<TResult>
        : ModalAutoProps<TResult>;

export type ModalFC<TProps = undefined, TReturn = undefined> =
    (props: ModalProps<TProps, TReturn>) => ReactElement;

export type UnwrapModalProps<TModal extends ModalFC<any, any>> =
    TModal extends ModalFC<infer TProps, any> ? TProps : never;
export type UnwrapModalReturn<TModal extends ModalFC<any, any>> =
    TModal extends ModalFC<any, infer TReturn> ? TReturn : never;

export type ModalRequest<TProps, TResult> = {
    readonly component: ModalFC<TProps, TResult>
    readonly props: TProps
    readonly callback: (_: TResult | undefined) => void
};
