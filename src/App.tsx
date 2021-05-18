import React from 'react';
import styles from './App.module.css';
import { Sidebar } from './components/Sidebar';
import { TextButton } from './components/TextButton';
import { rectUnit } from './store';
import { Workspace } from './views/workspace';

function App() {
  const onNewStickerClickHandler = () =>{
    rectUnit.events.addRect({
      x: 600,
      y: 400,
      scaleX: 4,
      scaleY: 2,
      fill: "#F4B66E",
      rotation: 0
    })
  }

  return <div className={styles.App}>
    <Sidebar>
      <TextButton text="+ New sticker" onClick={() => {onNewStickerClickHandler()}} style={{fontSize: 24}}/>
    </Sidebar>
  <Workspace />
  </div>  
}

export default App;
