import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

// Función auxiliar local para este nivel
function registerCollision(model, scene) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    
    if (window.collidableObjects) {
        window.collidableObjects.push(box);
    }

    // DEBUG: Visualizar colisión (Rojo)
    const helper = new THREE.BoxHelper(model, 0xff0000);
    helper.material.depthTest = false; 
    scene.add(helper);
}

export function setupLobbyScene(scene) {
    // 1. Terreno
    const terrain = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    terrain.rotateX(-Math.PI / 2);
    scene.add(terrain);

    // 2. Ayudas visuales
    scene.add(new THREE.GridHelper(200, 20));
    scene.add(new THREE.AxesHelper(10)); 
    
    // 3. Carga de Objetos
    
    // Muro (Con Colisión)
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (model) => {
        model.position.set(-15, 0, -25);
        model.scale.set(1, 1, 1); 
        registerCollision(model, scene); // <--- Importante
    });

    // Banca (Con Colisión)
    loadGLTFModel("/models/stage_1/Banca.glb", scene, (model) => {
        model.position.set(20, 0.25, 20); 
        model.scale.set(1, 1, 1); 
        registerCollision(model, scene); // <--- Importante
    });

    // Otros objetos decorativos...
    loadGLTFModel("/models/stage_1/Balon.glb", scene, (model) => {
        model.position.set(0, 0.25, 0); 
        model.scale.set(2, 2, 2); 
    });

    loadGLTFModel("/models/stage_1/Cancha.glb", scene, (canchaModel) => {
        canchaModel.position.set(-45, 0, 15); 
        canchaModel.scale.set(1, 1, 1); 
    });

    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(-39, 3, -25);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
}