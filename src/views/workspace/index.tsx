import React, {FC} from "react";
import styles from "./Workspase.module.css"

export const Workspace: FC = x => {
    return <div className={styles.workspace}>
        {
            x.children
        }
    </div>
}