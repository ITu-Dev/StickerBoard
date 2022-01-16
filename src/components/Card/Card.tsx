import React, { useContext, createContext, MouseEvent, CSSProperties, useState, forwardRef, Ref, FC } from "react";
import styles from "./Card.module.css";
import img from "../../assets/icons/close.svg"
import { c } from "../../utils/c";
import { Expandee } from "basic-components";

interface CardProps {
    title?: React.ReactNode
    padding?: string

    hasCloseButton?: boolean
    hasCollapseButton?: boolean
    onClick?: (e: MouseEvent) => void
    onClose?: () => void

    bottom?: React.ReactNode

    style?: CSSProperties
    contentStyle?: CSSProperties
    bottomStyle?: CSSProperties
    headerStyle?: CSSProperties

    className?: string
    ref?: Ref<HTMLDivElement>
}

export const CardTitleContext = createContext<React.ReactNode | undefined>(undefined);

export const Card: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>((x, ref) => {
    const providedTitle = useContext(CardTitleContext);

    const [collapsed, setCollapsed] = useState(false);

    return <div className={c(styles.card, x.className)} onClick={x.onClick} style={x.style} ref={ref}>
        <div className={styles.cardHeader} style={x.headerStyle}>
            <div className={styles.cardHeaderTitle}>
                {
                    x.hasCollapseButton &&
                        <div onClick={() => setCollapsed(!collapsed)} className={styles.collapseButton} />
                }
                <div className={styles.cardTitleContent}>{ x.title ?? providedTitle }</div>
                <Expandee />
                {
                    x.hasCloseButton &&
                        <div onClick={x.onClose} className={styles.closeButton}><img src={img}  alt=''/></div>
                }
            </div>
        </div>

        <div className={collapsed ? styles.cardCollapsed : styles.cardContent}
             style={{ padding: x.padding, ...x.contentStyle }}>
            { x.children }
        </div>
        {
            x.bottom && <div className={collapsed ? styles.cardCollapsed : styles.cardBottom}
                             style={x.bottomStyle}>
                { x.bottom }
            </div>
        }
    </div>;
});
