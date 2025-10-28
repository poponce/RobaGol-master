// Scene_Lobby.js
import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/**
 * Define el contenido del Escenario del Lobby.
 * @param {THREE.Scene} scene La escena activa para añadir objetos.
 */
export function setupRoomScene(scene) {
    // 1. Terreno verde
    const terrain = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    terrain.rotateX(-Math.PI / 2);
    terrain.name = "Lobby_Terrain";
    scene.add(terrain);

    // 2. Cuadrícula de Ayuda
    const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x888888);
    gridHelper.name = "Lobby_Grid";
    scene.add(gridHelper);

    // 3. Sistema de Coordenadas
    const axesHelper = new THREE.AxesHelper(10); 
    axesHelper.name = "Lobby_Axes";
    scene.add(axesHelper); 

    // Cargar otros modelos 3D necesarios para el escenario
    // Copiar y pegar
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(-15, 0, -25);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
        console.log("Barril cargado y colocado.");
    });

    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(-25, 0, -25);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
        console.log("CajaElectrica cargado y colocado.");
    });

    

     loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(-15, 0, -15);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
        console.log("MuroConcreto cargado y colocado.");
    });

     loadGLTFModel("/models/stage_3/Cono.glb", scene, (ConoModel) => {
        ConoModel.position.set(-15, 0, -35);
        ConoModel.scale.set(1, 1, 1); 
        ConoModel.name = "Lobby_Cono";
        console.log("Cono cargado y colocado.");
    });

     loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(-25, 0, -35);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        console.log("Contenedor cargado y colocado.");
    });

     loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(-5, 0, -15);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        console.log("Casa2 cargado y colocado.");
    });

     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(-45, 0, -45);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
        console.log("Lampara cargado y colocado.");
    });
}