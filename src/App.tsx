import React from 'react';
import styles from './App.module.css';
import { Sidebar } from 'components/Sidebar';
import { Workspace } from 'views/workspace';
import { Login } from "views/Login";

function App() {

  return <div >
    <div className={styles.App}>
      <Login />
      {/*<Sidebar />*/}
      {/*<Workspace />*/}
  </div>
  
  </div>  
}

export default App;
