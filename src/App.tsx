import React from 'react';
import styles from './App.module.css';
import { TextButton } from './components/TextButton';
import { Workspace } from './views/workspace';

function App() {
  return <div className={styles.App}>
  <Workspace>
    <TextButton text="+ new sticker" onClick={() => console.log("click")}/>
  </Workspace>
  </div>  
}

export default App;
