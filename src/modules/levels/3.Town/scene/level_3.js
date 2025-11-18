// Scene_Lobby.js
import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/**
 * Define el contenido del Escenario del Lobby.
 * @param {THREE.Scene} scene La escena activa para añadir objetos.
 */

function registerCollision(model) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);

    if (!window.collidableObjects) window.collidableObjects = [];
    window.collidableObjects.push(box);
}

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
    //BARRILES
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(-15, 0, -25);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
        registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(20, 0, 10);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(-37, 0, 4);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(-60, 0, -40);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(-10, 0, -50);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(55, 0, -50);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(43, 0, -32);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(48, 0, 10);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });
    loadGLTFModel("/models/stage_3/Barril.glb", scene, (barrelModel) => {
        barrelModel.position.set(10, 0, 0);
        barrelModel.scale.set(1, 1, 1); 
        barrelModel.name = "Lobby_Barril";
         registerCollision(barrelModel,scene);
    });



    //CAJAS ELECTRICIDAD
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(-25, 0, -25);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
        registerCollision(Caja_electricaModel,scene);
    });
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(-57, 0, -17);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
        Caja_electricaModel.rotation.y=Math.PI;
        registerCollision(Caja_electricaModel,scene);
    });
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(-44, 0, -60);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
        registerCollision(Caja_electricaModel,scene);
    });
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(35, 0, -58);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
        registerCollision(Caja_electricaModel,scene);
    });
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(25, 0, -40);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
        registerCollision(Caja_electricaModel,scene);
    });
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(58, 0, -14);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
              Caja_electricaModel.rotation.y=Math.PI*1.5;
              registerCollision(Caja_electricaModel,scene);
    });
    loadGLTFModel("/models/stage_3/Caja_electrica.glb", scene, (Caja_electricaModel) => {
        Caja_electricaModel.position.set(-9, 0, -13);
        Caja_electricaModel.scale.set(1, 1, 1); 
        Caja_electricaModel.name = "Lobby_CajaElectrica";
         registerCollision(Caja_electricaModel,scene);
    });

    //BARRERA DE CONCRETO
     loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(-15, 0, -15);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
         registerCollision(concrete_barrierModel,scene);
    });
    loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(1, 0, -8);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
         registerCollision(concrete_barrierModel,scene);
    });
    loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(-50, 0, -7);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
        concrete_barrierModel.rotation.y=Math.PI/2;
         registerCollision(concrete_barrierModel,scene);
    });
    loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(-34, 0, -52);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
         registerCollision(concrete_barrierModel,scene);
    });
    loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(45, 0, -52);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
         registerCollision(concrete_barrierModel,scene);
    });
    loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(52, 0, -3);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
         registerCollision(concrete_barrierModel,scene);
        concrete_barrierModel.rotation.y=Math.PI/2;
    });
    loadGLTFModel("/models/stage_3/concrete_barrier.glb", scene, (concrete_barrierModel) => {
        concrete_barrierModel.position.set(35, 0, -33);
        concrete_barrierModel.scale.set(1, 1, 1); 
        concrete_barrierModel.name = "Lobby_MuroCocreto";
         registerCollision(concrete_barrierModel,scene);
    });


    //CONO  
     loadGLTFModel("/models/stage_3/Cono.glb", scene, (ConoModel) => {
        ConoModel.position.set(9, 0, -19);
        ConoModel.scale.set(1, 1, 1); 
        ConoModel.name = "Lobby_Cono";
    });
    loadGLTFModel("/models/stage_3/Cono.glb", scene, (ConoModel) => {
        ConoModel.position.set(-64, 0, -14);
        ConoModel.scale.set(1, 1, 1); 
        ConoModel.name = "Lobby_Cono";
    });
    loadGLTFModel("/models/stage_3/Cono.glb", scene, (ConoModel) => {
        ConoModel.position.set(-25, 0, -37);
        ConoModel.scale.set(1, 1, 1); 
        ConoModel.name = "Lobby_Cono";
    });
    loadGLTFModel("/models/stage_3/Cono.glb", scene, (ConoModel) => {
        ConoModel.position.set(54, 0, -61);
        ConoModel.scale.set(1, 1, 1); 
        ConoModel.name = "Lobby_Cono";
    });


    //CONTENEDOR DE BASURA
     loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(-25, 0, -35);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        registerCollision(ContenedorModel,scene);
    });
    loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(4, 0, -20);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        ContenedorModel.rotation.y=Math.PI;
         registerCollision(ContenedorModel,scene);
    });
    loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(-63, 0, -7);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        ContenedorModel.rotation.y=Math.PI*1.5;
         registerCollision(ContenedorModel,scene);
    });
    loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(37, 0, -44);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        ContenedorModel.rotation.y=Math.PI;
         registerCollision(ContenedorModel,scene);
    });
    loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(40, 0, -65);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        ContenedorModel.rotation.y=Math.PI;
         registerCollision(ContenedorModel,scene);
    });
    loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(-33, 0, -63);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        ContenedorModel.rotation.y=Math.PI;
         registerCollision(ContenedorModel,scene);
    });
    loadGLTFModel("/models/stage_3/Contenedor de Basura.glb", scene, (ContenedorModel) => {
        ContenedorModel.position.set(63, 0, -2);
        ContenedorModel.scale.set(1, 1, 1); 
        ContenedorModel.name = "Lobby_Contenedor";
        ContenedorModel.rotation.y=Math.PI/2;
         registerCollision(ContenedorModel,scene);
    });



    //CASAS
     loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(-5, 0, -15);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        registerCollision(House_Model_Model,scene);
    });
    loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(30, 0, -40);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        registerCollision(House_Model_Model,scene);
    });
    loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(-59, 0, -2);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        House_Model_Model.rotation.y=Math.PI/2;
        registerCollision(House_Model_Model,scene);
    });
    loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(-40, 0, -60);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        registerCollision(House_Model_Model,scene);
    });
    loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(40, 0, -60);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        registerCollision(House_Model_Model,scene);
    });
    loadGLTFModel("/models/stage_3/House_Model_.glb", scene, (House_Model_Model) => {
        House_Model_Model.position.set(60, 0, -10);
        House_Model_Model.scale.set(1, 1, 1); 
        House_Model_Model.name = "Lobby_Casa2";
        House_Model_Model.rotation.y=Math.PI*1.5;
        registerCollision(House_Model_Model,scene);
    });

    //LAMPARA
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(-45, 0, -45);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(-13, 0, -5);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(-50, 0, 3);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(-23, 0, -53);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(32, 0, -54);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(46, 0, -33);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });
     loadGLTFModel("/models/stage_3/Lampara.glb", scene, (LamparaModel) => {
        LamparaModel.position.set(53, 0, -15);
        LamparaModel.scale.set(1, 1, 1); 
        LamparaModel.name = "Lobby_Lampara";
    });

}