import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/**
 * @param {THREE.Object3D} model 
 * @param {THREE.Scene} scene 
 */

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
    //-----------Cancha 1---------------
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (modelMuro) => {
        modelMuro.position.set(-62, 0, 40);
        modelMuro.scale.set(1, 1, 1); 
        modelMuro.rotation.y=Math.PI/2;
        registerCollision(modelMuro, scene); //Colision
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (modelMuro) => {
        modelMuro.position.set(-62, 0, 72);
        modelMuro.scale.set(1, 1, 1); 
        modelMuro.rotation.y=Math.PI/2;
        registerCollision(modelMuro, scene); //Colision
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(-95, 0, 8);
        muromodel.scale.set(1, 1, 1); 
        registerCollision(muromodel, scene); 
    });
    //-----------------Cancha 2---------------
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(8, 0, 18);
        muromodel.scale.set(1, 1, 1); 
        registerCollision(muromodel, scene); 
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(8.15, 0, 49);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(8.15, 0, 81);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(41.5, 0, 49);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(41.5, 0, 81);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });
    //------------Cancha 3------------
     loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(24, 0, -27);
        muromodel.scale.set(1, 1, 1); 
        registerCollision(muromodel, scene); 
     });
     loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(24, 0, -80);
        muromodel.scale.set(1, 1, 1); 
        registerCollision(muromodel, scene); 
     });
     loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(58, 0, -27);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(58, 0, -59);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });
    //--------------Cancha 4---------------
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(-46, 0, -34);
        muromodel.scale.set(1, 1, 1); 
        registerCollision(muromodel, scene); 
    });
    loadGLTFModel("/models/stage_1/Muro.glb", scene, (muromodel) => {
        muromodel.position.set(-14, 0, -35);
        muromodel.scale.set(1, 1, 1); 
        muromodel.rotation.y=Math.PI/2;
        registerCollision(muromodel, scene); 
    });

    // Banca (Con Colisión)
    loadGLTFModel("/models/stage_1/Banca.glb", scene, (model) => {
        model.position.set(-42, 0, -67); 
        model.scale.set(1, 1, 1); 
        modelScale.rotation.y=Math.PI/2;
        registerCollision(model, scene); 
    });
    loadGLTFModel("/models/stage_1/Banca.glb", scene, (model) => {
        model.position.set(27, 0, -52); 
        model.scale.set(1, 1, 1); 
        modelScale.rotation.y=Math.PI/2;
        registerCollision(model, scene); 
    });
    loadGLTFModel("/models/stage_1/Banca.glb", scene, (model) => {
        model.position.set(33, 0, 61); 
        model.scale.set(1, 1, 1); 
        modelScale.rotation.y=Math.PI/2;
        registerCollision(model, scene); 
    });
    loadGLTFModel("/models/stage_1/Banca.glb", scene, (model) => {
        model.position.set(-88, 0, 52); 
        model.scale.set(1, 1, 1); 
        modelScale.rotation.y=Math.PI/2;
        registerCollision(model, scene); 
    });

    // Otros objetos decorativos...
    loadGLTFModel("/models/stage_1/Balon.glb", scene, (model) => {
        model.position.set(-75, 0.25, 50); 
        model.scale.set(1, 1, 1); 
    });
    loadGLTFModel("/models/stage_1/Balon.glb", scene, (model) => {
        model.position.set(25, 0.25, 40); 
        model.scale.set(1, 1, 1); 
    });
    loadGLTFModel("/models/stage_1/Balon.glb", scene, (model) => {
        model.position.set(40, 0.25, -50); 
        model.scale.set(1, 1, 1); 
    });
    loadGLTFModel("/models/stage_1/Balon.glb", scene, (model) => {
        model.position.set(-30, 0.25, -57); 
        model.scale.set(1, 1, 1); 
    });

    // CANCHA
    loadGLTFModel("/models/stage_1/Cancha.glb", scene, (canchaModel) => {
        canchaModel.position.set(-75, 0, 50); 
        canchaModel.scale.set(1, 1, 1); 
    });

    loadGLTFModel("/models/stage_1/Cancha.glb", scene, (canchaModel1) => {
        canchaModel1.position.set(25, 0, 40); 
        canchaModel1.scale.set(1, 1, 1); 
    });
    loadGLTFModel("/models/stage_1/Cancha.glb", scene, (canchaModel2) => {
        canchaModel2.position.set(40, 0, -50); 
        canchaModel2.scale.set(1, 1, 1); 
    });
    loadGLTFModel("/models/stage_1/Cancha.glb", scene, (canchaModel3) => {
        canchaModel3.position.set(-30, 0, -57); 
        canchaModel3.scale.set(1, 1, 1); 
    });

    //lUCES ESTADIO 
    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(-74, 0, -10);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(-53, 0, -90);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(20, 0, -81);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(46, 0, 85);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(-30, 0, 80);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
    loadGLTFModel("/models/stage_1/LucesEstadio.glb", scene, (lucesModel) => {
        lucesModel.position.set(-92, 0, 66);
        lucesModel.scale.set(1, 1, 1); 
        registerCollision(lucesModel, scene);
    });
}