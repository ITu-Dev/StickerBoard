import React from 'react';
import styles from './App.module.css';
import { Sidebar } from 'components/Sidebar';
import { Workspace } from 'views/workspace';
import { Login } from "views/Login";
import { useStore } from "effector-react";
import { UserStore } from "store/UserStore";

function App() {
 const user = useStore(UserStore);
  return <div >
    <div className={styles.App}>
      {
        user
            ? <>
              <Sidebar />
              <Workspace />
            </>
            : <Login />
      }
  </div>
  
  </div>  
}

export default App;
