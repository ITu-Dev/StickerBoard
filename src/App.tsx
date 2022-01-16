import React from 'react';
import styles from './App.module.css';
import { ModalPresenter } from 'components/modals';
import { Sidebar } from 'components/Sidebar';
import { Workspace } from 'views/workspace';

function App() {

  return <div >
    <ModalPresenter />
    <div className={styles.App}>
      <Sidebar />
      <Workspace />
  </div>
  
  </div>  
}

export default App;
