import React from "react";
import { Orientation } from "./common";
import { Property } from "csstype";
import styles from "./Simple.module.css";
import { Minus } from "basic-components/dist/utils/types";
import { c } from "../../utils/c";


interface LayoutProps {
    onClick?: () => void

    innerClassName?: string
    outerClassName?: string

    innerStyle?: React.CSSProperties
    outerStyle?: React.CSSProperties

    orientation: Orientation
    reverse?: boolean

    alignItems?: Property.AlignItems
}

const mapOrientation: { readonly [key in Orientation]: string } = {
    vertical: "column",
    horizontal: "row"
};

const SimpleLayoutBase: React.FC<LayoutProps & { justify: Property.JustifyContent }> = x => {
    const direction = mapOrientation[x.orientation] + (x.reverse ? "-reverse" : "") as Property.FlexDirection;

    // every layout problem can be solved with wrapping div into div
    return <div style={x.outerStyle} className={x.outerClassName} onClick={x.onClick}>
        <div className={x.innerClassName} style={{
            display: "flex",
            flexDirection: direction,
            justifyContent: x.justify,
            alignItems: x.alignItems,
            ...x.innerStyle }}>
            { x.children }
        </div>
    </div>;
};

type WithoutOrientation = Minus<LayoutProps, { orientation: Orientation }>;
interface Spacing { spacing?: string }

export const Stack: React.FC<LayoutProps & Spacing> = x =>
    <SimpleLayoutBase {...x}
                      innerClassName={c(styles.stack, x.innerClassName)}
                      innerStyle={{ ...x.innerStyle, ["--spacing-" + x.orientation]: x.spacing } as React.CSSProperties}
                      outerStyle={x.outerStyle}
                      orientation={x.orientation}
                      justify="flex-start" />;

export const VStack: React.FC<WithoutOrientation & Spacing> = x =>
    <Stack {...x} orientation="vertical" />;
export const HStack: React.FC<WithoutOrientation & Spacing> = x =>
    <Stack {...x} orientation="horizontal" />;

export const Spread: React.FC<LayoutProps> = x =>
    <SimpleLayoutBase {...x} orientation={x.orientation} justify="space-between" />;
export const VSpread: React.FC<WithoutOrientation> = x =>
    <SimpleLayoutBase {...x} orientation="vertical" justify="space-between" />;
export const HSpread: React.FC<WithoutOrientation> = x =>
    <SimpleLayoutBase {...x} orientation="horizontal" justify="space-between" />;

export const Expandee: React.FC = () => <div className={styles.expandee} />;
