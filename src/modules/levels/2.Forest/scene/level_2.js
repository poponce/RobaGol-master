// Scene_Lobby.js
import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

function registerCollision(model) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);

    if (!window.collidableObjects) window.collidableObjects = [];
    window.collidableObjects.push(box);
}

/**
 * Cargador genérico
 */
function spawnModels(scene, modelPath, items, enableCollision = false) {
    items.forEach(({ x, y, z, scale = 1, name }) => {
        loadGLTFModel(modelPath, scene, (model) => {
            model.position.set(x, y, z);
            model.scale.set(scale, scale, scale);
            model.name = name;

            if (enableCollision) registerCollision(model);

            console.log(`${name} cargado en (${x}, ${y}, ${z})`);
        });
    });
}

export function setupArenaScene(scene) {
    // Terreno
    const terrain = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    terrain.rotation.x = -Math.PI / 2;
    scene.add(terrain);

    scene.add(new THREE.GridHelper(200, 20));
    scene.add(new THREE.AxesHelper(10));

    // ************************************************************
    // 1. ÁRBOLES
    // ************************************************************
    spawnModels(scene, "/models/stage_2/Arbol2.glb", [
        { x: -60, y: 0, z: -10, name: "Lobby_Arbol" },
        { x: -48, y: 0, z: 40, name: "Lobby_Arbol" },
        { x: 22,  y: 0, z: 30, name: "Lobby_Arbol" },
        { x: 10,  y: 0, z: 0,  name: "Lobby_Arbol" },
        { x: 0,   y: 0, z: -35, name: "Lobby_Arbol" },
        { x: -25, y: 0, z: -50, name: "Lobby_Arbol" },
    ]);

    // ************************************************************
    // 2. ARBUSTOS
    // ************************************************************
    spawnModels(scene, "/models/stage_2/Arbusto.glb", [
        { x: -62, y: 0, z: -58, name: "Lobby_Arbusto" },
        { x: 14,  y: 0, z: -23, name: "Lobby_Arbusto" },
        { x: 85,  y: 0, z: 20,  name: "Lobby_Arbusto" },
        { x: 58,  y: 0, z: 69,  name: "Lobby_Arbusto" },
        { x: 11,  y: 0, z: 32,  name: "Lobby_Arbusto" },
        { x: -30, y: 0, z: 45,  name: "Lobby_Arbusto" },
        { x: -76, y: 0, z: 65,  name: "Lobby_Arbusto" },
        { x: 65,  y: 0, z: 7,   name: "Lobby_Arbusto" },
        { x: -50, y: 0, z: -26, name: "Lobby_Arbusto" },
    ]);

    // ************************************************************
    // 3. BANDERAS
    // ************************************************************
    spawnModels(scene, "/models/stage_2/Bandera.glb", [
        { x: 14,  y: 0, z: -23, name: "Lobby_Bandera" },
        { x: 85,  y: 0, z: 20,  name: "Lobby_Bandera" },
        { x: -30, y: 0, z: 45,  name: "Lobby_Bandera" },
        { x: 65,  y: 0, z: 7,   name: "Lobby_Bandera" },
    ]);

    // ************************************************************
    // 4. CASAS DE CAMPAÑA – con colisión
    // ************************************************************
    spawnModels(scene, "/models/stage_2/casa campaña.glb", [
        { x: -34, y: 0, z: -31, name: "Lobby_CasaCampaña" },
        { x: 20,  y: 0, z: -40, name: "Lobby_CasaCampaña" },
        { x: 25,  y: 0, z: 4,   name: "Lobby_CasaCampaña" },
        { x: 52,  y: 0, z: 40,  name: "Lobby_CasaCampaña" },
        { x: 4,   y: 0, z: 52,  name: "Lobby_CasaCampaña" },
        { x: -60, y: 0, z: 30,  name: "Lobby_CasaCampaña" },
    ], true);

    // ************************************************************
    // 5. PIEDRAS
    // ************************************************************
    spawnModels(scene, "/models/stage_2/Piedra 1.glb", [
        { x: -57, y: 0, z: 13,  name: "Lobby_Piedra1" },
        { x: -2,  y: 0, z: -52, name: "Lobby_Piedra1" },
        { x: 22,  y: 0, z: 45,  name: "Lobby_Piedra1" },
        { x: 50,  y: 0, z: -10, name: "Lobby_Piedra1" },
        { x: 30,  y: 0, z: -60, name: "Lobby_Piedra1" },
    ], true);

    spawnModels(scene, "/models/stage_2/Piedra 2.glb", [
        { x: -20, y: 0, z: -80, name: "Lobby_Piedra2" },
        { x: -40, y: 0, z: -42, name: "Lobby_Piedra2" },
        { x: -37, y: 0, z: -27, name: "Lobby_Piedra2" },
        { x: -20, y: 0, z: -20, name: "Lobby_Piedra2" },
        { x: -40, y: 0, z: 30,  name: "Lobby_Piedra2" },
    ], true);

    spawnModels(scene, "/models/stage_2/Piedra 3.glb", [
        { x: -10, y: 0, z: 50, name: "Lobby_Piedra3" },
        { x: 30,  y: 0, z: 65, name: "Lobby_Piedra3" },
        { x: 16,  y: 0, z: -20, name: "Lobby_Piedra3" },
        { x: 17,  y: 0, z: -60, name: "Lobby_Piedra3" },
        { x: -10, y: 0, z: 20, name: "Lobby_Piedra3" },
    ], true);

    // ************************************************************
    // 6. SEÑALES – con colisiones
    // ************************************************************
    spawnModels(scene, "/models/stage_2/señal.glb", [
        { x: -53, y: 0, z: -24, name: "Lobby_Señal" },
        { x: -56, y: 0, z: -58, name: "Lobby_Señal" },
        { x: 66,  y: 0, z: 10,  name: "Lobby_Señal" },
        { x: 53,  y: 0, z: 68,  name: "Lobby_Señal" },
        { x: -10, y: 0, z: 30,  name: "Lobby_Señal" },
    ], true);
}
