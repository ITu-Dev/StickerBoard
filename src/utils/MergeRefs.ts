import { LegacyRef, MutableRefObject, RefCallback } from "react";

type Ref<T> = MutableRefObject<T> | LegacyRef<T>;

export const mergeRefs = <T>(refs: Ref<T>[]): RefCallback<T> => {
    const filtered = refs.filter(Boolean);

    return (refObject: T) => filtered
        .forEach(ref => {
            if (typeof ref === "function") {
                ref(refObject);
            } else {
                (ref as MutableRefObject<T>).current = refObject;
            }
        });
};
