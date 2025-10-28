
import { initGameCore, loadScene } from "./modules/gameCore.js"; 
import { initSocketClient } from "./client.js"; 
import { setupLobbyScene } from "./modules/levels/1.Stadium/scene/level_1.js";
import { setupArenaScene } from "./modules/levels/2.Forest/scene/level_2.js";
import { setupRoomScene } from "./modules/levels/3.Town/scene/level_3.js";

const container = document.body;

async function initializeGame() {
    
    await initGameCore(container, setupLobbyScene); 
    
    initSocketClient();
}

initializeGame();


window.changeToLobby = () => loadScene(setupLobbyScene);
window.changeToArena = () => loadScene(setupArenaScene);
window.changeToRoom = () => loadScene(setupRoomScene);

function onKeyDown(event) {
    
    switch (event.key) {
        case '1':
            console.log("Cambiando a Nivel 1: Lobby/Estadio");
           
            window.changeToLobby(); 
            break;
        case '2':
            console.log("Cambiando a Nivel 2: Arena/Bosque");
         
            window.changeToArena(); 
            break;
        case '3': console.log("Cambiando a Nivel 3: Room/Pueblo");
          
            window.changeToRoom(); 
            break;
    }
}


document.addEventListener('keydown', onKeyDown, false);