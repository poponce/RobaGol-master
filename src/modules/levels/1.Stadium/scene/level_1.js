import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/** Registrar colisión */
function registerCollision(model, scene) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);

    if (!window.collidableObjects) window.collidableObjects = [];
    window.collidableObjects.push(box);

    // DEBUG
    const helper = new THREE.BoxHelper(model, 0xff0000);
    helper.material.depthTest = false;
    scene.add(helper);
}

/** Carga genérica y rápida */
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

export function setupLobbyScene(scene) {

    /** ================ TERRENO & GUIAS ================= */
    const terrain = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    terrain.rotateX(-Math.PI / 2);
    scene.add(terrain);

    scene.add(new THREE.GridHelper(200, 20));
    scene.add(new THREE.AxesHelper(10));

    /** ================ LISTAS DE MODELOS ================= */

    // MUROS
    const muros = [
        { pos: [-62, 0, 40], rot: [0, Math.PI / 2, 0] },
        { pos: [-62, 0, 72], rot: [0, Math.PI / 2, 0] },
        { pos: [-95, 0, 8] },
        { pos: [8, 0, 18] },
        { pos: [8.15, 0, 49], rot: [0, Math.PI / 2, 0] },
        { pos: [8.15, 0, 81], rot: [0, Math.PI / 2, 0] },
        { pos: [41.5, 0, 49], rot: [0, Math.PI / 2, 0] },
        { pos: [41.5, 0, 81], rot: [0, Math.PI / 2, 0] },
        { pos: [24, 0, -27] },
        { pos: [24, 0, -80] },
        { pos: [58, 0, -27], rot: [0, Math.PI / 2, 0] },
        { pos: [58, 0, -59], rot: [0, Math.PI / 2, 0] },
        { pos: [-46, 0, -34] },
        { pos: [-14, 0, -35], rot: [0, Math.PI / 2, 0] },
    ];

    // BANCAS
    const bancas = [
        { pos: [-42, 0, -67], rot: [0, Math.PI / 2, 0] },
        { pos: [27, 0, -52], rot: [0, Math.PI / 2, 0] },
        { pos: [33, 0, 61], rot: [0, Math.PI / 2, 0] },
        { pos: [-88, 0, 52], rot: [0, Math.PI / 2, 0] },
    ];

    // BALONES
    const balones = [
        { pos: [-75, 0.25, 50] },
        { pos: [25, 0.25, 40] },
        { pos: [40, 0.25, -50] },
        { pos: [-30, 0.25, -57] },
    ];

    // CANCHAS
    const canchas = [
        { pos: [-75, 0, 50] },
        { pos: [25, 0, 40] },
        { pos: [40, 0, -50] },
        { pos: [-30, 0, -57] },
    ];

    // LUCES ESTADIO
    const luces = [
        { pos: [-74, 0, -10] },
        { pos: [-53, 0, -90] },
        { pos: [20, 0, -81] },
        { pos: [46, 0, 85] },
        { pos: [-30, 0, 80] },
        { pos: [-92, 0, 66] },
    ];

    /** ================ CARGA ÚNICA POR MODELO ================= */

    spawnModel("/models/stage_1/Muro.glb", scene, muros, true);
    spawnModel("/models/stage_1/Banca.glb", scene, bancas, true);
    spawnModel("/models/stage_1/Balon.glb", scene, balones, false);
    spawnModel("/models/stage_1/Cancha.glb", scene, canchas, false);
    spawnModel("/models/stage_1/LucesEstadio.glb", scene, luces, true);
}
