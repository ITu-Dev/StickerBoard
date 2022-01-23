import { useEffect } from "react";

export const useKeydown = (key: string, event: (e: KeyboardEvent) => void) => {
    const handler = (e: KeyboardEvent) => e.key === key ? event(e) : void(0);
    useEffect(() => {
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);
};
