import React, { FC } from "react";
import styles from "./Sidebar.module.css"

export const Sidebar: FC = x => {
    return <div className={styles.sidebar}>
        {
            x.children
        }
    </div>
}