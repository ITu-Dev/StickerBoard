import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Sidebar } from 'components/Sidebar';
import { Workspace } from 'views/workspace';
import { Login } from "views/Login";
import { useStore } from "effector-react";
import { setUser, UserStore } from "store/UserStore";

function App() {
 const user = useStore(UserStore);

 useEffect(() => {
     const storageUser = localStorage.getItem("user")
     if (user === null && storageUser)
         setUser(JSON.parse(storageUser))
 }, [])

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
