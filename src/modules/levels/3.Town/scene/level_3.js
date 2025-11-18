import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/** Registrar colisión */
function registerCollision(model, scene) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);

    if (!window.collidableObjects) window.collidableObjects = [];
    window.collidableObjects.push(box);

    // DEBUG: caja roja alrededor
    const helper = new THREE.BoxHelper(model, 0xff0000);
    helper.material.depthTest = false;
    scene.add(helper);
}

/** Spawn genérico */
function spawnModel(path, scene, list, withCollision = false) {
    loadGLTFModel(path, scene, original => {
        list.forEach(({ pos, rot, scale }) => {
            const model = original.clone(true);
            if (pos) model.position.set(...pos);
            if (rot) model.rotation.set(...rot);
            if (scale) model.scale.set(...scale);
            if (withCollision) registerCollision(model, scene);
            scene.add(model);
        });
    });
}

export function setupRoomScene(scene) {
    // --- Terreno y guías ---
    const terrain = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    terrain.rotateX(-Math.PI / 2);
    scene.add(terrain);

    scene.add(new THREE.GridHelper(200, 20));
    scene.add(new THREE.AxesHelper(10));

    // --- Listas de modelos ---
    const barriles = [
        { pos: [-15, 0, -25] }, { pos: [20, 0, 10] }, { pos: [-37, 0, 4] },
        { pos: [-60, 0, -40] }, { pos: [-10, 0, -50] }, { pos: [55, 0, -50] },
        { pos: [43, 0, -32] }, { pos: [48, 0, 10] }, { pos: [10, 0, 0] },
    ];

    const cajasElectricas = [
        { pos: [-25, 0, -25] }, { pos: [-57, 0, -17], rot: [0, Math.PI, 0] },
        { pos: [-44, 0, -60] }, { pos: [35, 0, -58] }, { pos: [25, 0, -40] },
        { pos: [58, 0, -14], rot: [0, Math.PI * 1.5, 0] }, { pos: [-9, 0, -13] },
    ];

    const murosConcreto = [
        { pos: [-15, 0, -15] }, { pos: [1, 0, -8] }, { pos: [-50, 0, -7], rot: [0, Math.PI / 2, 0] },
        { pos: [-34, 0, -52] }, { pos: [45, 0, -52] }, { pos: [52, 0, -3], rot: [0, Math.PI / 2, 0] },
        { pos: [35, 0, -33] },
    ];

    const conos = [
        { pos: [9, 0, -19] }, { pos: [-64, 0, -14] }, { pos: [-25, 0, -37] }, { pos: [54, 0, -61] },
    ];

    const contenedores = [
        { pos: [-25, 0, -35] }, { pos: [4, 0, -20], rot: [0, Math.PI, 0] }, 
        { pos: [-63, 0, -7], rot: [0, Math.PI * 1.5, 0] }, { pos: [37, 0, -44], rot: [0, Math.PI, 0] },
        { pos: [40, 0, -65], rot: [0, Math.PI, 0] }, { pos: [-33, 0, -63], rot: [0, Math.PI, 0] },
        { pos: [63, 0, -2], rot: [0, Math.PI / 2, 0] },
    ];

    const casas = [
        { pos: [-5, 0, -15] }, { pos: [30, 0, -40] }, { pos: [-59, 0, -2], rot: [0, Math.PI / 2, 0] },
        { pos: [-40, 0, -60] }, { pos: [40, 0, -60] }, { pos: [60, 0, -10], rot: [0, Math.PI * 1.5, 0] },
    ];

    const lamparas = [
        { pos: [-45, 0, -45] }, { pos: [-13, 0, -5] }, { pos: [-50, 0, 3] },
        { pos: [-23, 0, -53] }, { pos: [32, 0, -54] }, { pos: [46, 0, -33] },
        { pos: [53, 0, -15] },
    ];

    // --- Spawn de modelos ---
    spawnModel("/models/stage_3/Barril.glb", scene, barriles, true);
    spawnModel("/models/stage_3/Caja_electrica.glb", scene, cajasElectricas, true);
    spawnModel("/models/stage_3/concrete_barrier.glb", scene, murosConcreto, true);
    spawnModel("/models/stage_3/Cono.glb", scene, conos, false);
    spawnModel("/models/stage_3/Contenedor de Basura.glb", scene, contenedores, true);
    spawnModel("/models/stage_3/House_Model_.glb", scene, casas, true);
    spawnModel("/models/stage_3/Lampara.glb", scene, lamparas, false);
}
