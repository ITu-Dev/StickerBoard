import React from "react";
import { Property } from "csstype";
import { Orientation } from "./common";
import { Minus } from "basic-components/dist/utils/types";


export interface LayoutProps {
    className?: string
    style?: React.CSSProperties

    orientation: Orientation
    areas: string[] | string

    alignItems?: Property.AlignItems
    spacing?: string
}

export const Grid: React.FC<LayoutProps> = x =>
    <div className={x.className} style={{
        ...x.style,
        display: "grid",
        [x.orientation === "horizontal" ? "gridTemplateRows" : "gridTemplateColumns"]:
            typeof x.areas === "string" ? x.areas : x.areas.join(" "),
        alignItems: x.alignItems,
        gridAutoFlow: x.orientation === "horizontal" ? "column" : "row",
        gap: x.spacing
    }}>
        { x.children }
    </div>;

export type LayoutPropsWithoutGeneric = Minus<LayoutProps, { orientation: Orientation; areas: string[] | string }>;

export const VGrid: React.FC<LayoutPropsWithoutGeneric & { columns: string[] | string }> = x =>
    <Grid {...x} orientation="vertical" areas={x.columns} />;

export const HGrid: React.FC<LayoutPropsWithoutGeneric & { rows: string[] | string }> = x =>
    <Grid {...x} orientation="horizontal" areas={x.rows} />;
