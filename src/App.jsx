import { useState, useEffect } from 'react';
import Phaser from 'phaser';
import Escena from './Escena';

function App() {
    const [listo, setListo] = useState(false);
    useEffect(() =>{
      var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene:[Escena]
        };
      const game = new Phaser.Game(config);
      game.events.on("LISTO", setListo)
      return()=>{
        setListo(false);
        game.destroy(true);
      }
    },[listo]);
}
export default App
