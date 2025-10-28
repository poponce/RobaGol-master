// Scene_Lobby.js
import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/**
 * Define el contenido del Escenario del Lobby.
 * @param {THREE.Scene} scene La escena activa para añadir objetos.
 */
export function setupArenaScene(scene) {
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
    loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        ArbolModel.position.set(-15, 0, -25);
        ArbolModel.scale.set(1, 1, 1); 
        ArbolModel.name = "Lobby_Arbol";
        console.log("Arbol cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(-25, 0, -25);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/Bandera.glb", scene, (BanderaModel) => {
        BanderaModel.position.set(-35, 0, -25);
        BanderaModel.scale.set(1, 1, 1); 
        BanderaModel.name = "Lobby_Bandera";
        console.log("Bandera cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(-15, 0, -15);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/Piedra 1.glb", scene, (Piedra1Model) => {
        Piedra1Model.position.set(-15, 0, -5);
        Piedra1Model.scale.set(1, 1, 1); 
        Piedra1Model.name = "Lobby_Piedra1";
        console.log("Piedra1 cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/Piedra 2.glb", scene, (Piedra2Model) => {
        Piedra2Model.position.set(-15, 0, -35);
        Piedra2Model.scale.set(1, 1, 1); 
        Piedra2Model.name = "Lobby_Piedra2";
        console.log("Piedra2 cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/Piedra 3.glb", scene, (Piedra3Model) => {
        Piedra3Model.position.set(-25, 0, -35);
        Piedra3Model.scale.set(1, 1, 1); 
        Piedra3Model.name = "Lobby_Piedra3";
        console.log("Piedra3 cargado y colocado.");
    });

    loadGLTFModel("/models/stage_2/señal.glb", scene, (señalModel) => {
        señalModel.position.set(-35, 0, -45);
        señalModel.scale.set(1, 1, 1); 
        señalModel.name = "Lobby_señal";
        console.log("señal cargado y colocado.");
    });
}