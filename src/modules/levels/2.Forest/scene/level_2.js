// Scene_Lobby.js
import * as THREE from "three";
import { loadGLTFModel } from "../../../../models/modelLoader.js";

/**
 * Define el contenido del Escenario del Lobby.
 * @param {THREE.Scene} scene La escena activa para añadir objetos.
 */

function registerCollision(model, scene) {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    
    if (window.collidableObjects) {
        window.collidableObjects.push(box);
    }
}

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
    //ARBOL
    loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        Arbol2Model.position.set(-60, 0, -10);
        Arbol2Model.scale.set(1, 1, 1); 
        Arbol2Model.name = "Lobby_Arbol";
    });
     loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        Arbol2Model.position.set(-48, 0, 40);
        Arbol2Model.scale.set(1, 1, 1); 
        Arbol2Model.name = "Lobby_Arbol";
    });
     loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        Arbol2Model.position.set(22, 0, 30);
        Arbol2Model.scale.set(1, 1, 1); 
        Arbol2Model.name = "Lobby_Arbol";
    });
     loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        Arbol2Model.position.set(10, 0, 0);
        Arbol2Model.scale.set(1, 1, 1); 
        Arbol2Model.name = "Lobby_Arbol";
    });
     loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        Arbol2Model.position.set(0, 0, -35);
        Arbol2Model.scale.set(1, 1, 1); 
        Arbol2Model.name = "Lobby_Arbol";
    });
     loadGLTFModel("/models/stage_2/Arbol2.glb", scene, (Arbol2Model) => {
        Arbol2Model.position.set(-25, 0, -50);
        Arbol2Model.scale.set(1, 1, 1); 
        Arbol2Model.name = "Lobby_Arbol";
    });



//ARBUSTO Y BANDERAS
//-------------Arbustos--------------
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(-62, 0, -58);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(14, 0, -23);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(85, 0, 20);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(58, 0, 69);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(11, 0, 32);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(-30, 0, 45);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(-76, 0, 65);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(65, 0, 7);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Arbusto.glb", scene, (ArbustoModel) => {
        ArbustoModel.position.set(-50, 0, -26);
        ArbustoModel.scale.set(1, 1, 1); 
        ArbustoModel.name = "Lobby_Arbusto";
        console.log("Arbusto cargado y colocado.");
    });

    //------------Banderas---------------

    loadGLTFModel("/models/stage_2/Bandera.glb", scene, (BanderaModel) => {
        BanderaModel.position.set(14, 0, -23);
        BanderaModel.scale.set(1, 1, 1); 
        BanderaModel.name = "Lobby_Bandera";
        console.log("Bandera cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Bandera.glb", scene, (BanderaModel) => {
        BanderaModel.position.set(85, 0, 20);
        BanderaModel.scale.set(1, 1, 1); 
        BanderaModel.name = "Lobby_Bandera";
        console.log("Bandera cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Bandera.glb", scene, (BanderaModel) => {
        BanderaModel.position.set(-30, 0, 45);
        BanderaModel.scale.set(1, 1, 1); 
        BanderaModel.name = "Lobby_Bandera";
        console.log("Bandera cargado y colocado.");
    });
    loadGLTFModel("/models/stage_2/Bandera.glb", scene, (BanderaModel) => {
        BanderaModel.position.set(65, 0, 7);
        BanderaModel.scale.set(1, 1, 1); 
        BanderaModel.name = "Lobby_Bandera";
        console.log("Bandera cargado y colocado.");
    });

//CASA DE CAMPAÑA
    loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(-34, 0, -31);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
        registerCollision(CasaCampañaModel, scene);
    });
loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(20, 0, -40);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
        registerCollision(CasaCampañaModel, scene);
    });
    loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(25, 0, 4);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
        registerCollision(CasaCampañaModel, scene);
    });
    loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(52, 0, 40);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
        registerCollision(CasaCampañaModel, scene);
    });
    loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(4, 0, 52);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
        registerCollision(CasaCampañaModel, scene);
    });
    loadGLTFModel("/models/stage_2/casa campaña.glb", scene, (CasaCampañaModel) => {
        CasaCampañaModel.position.set(-60, 0, 30);
        CasaCampañaModel.scale.set(1, 1, 1); 
        CasaCampañaModel.name = "Lobby_CasaCampaña";
        console.log("CasaCampaña cargado y colocado.");
        registerCollision(CasaCampañaModel, scene);
    });


//PIEDRAS
//--------------Piedra 1---------------
    loadGLTFModel("/models/stage_2/Piedra 1.glb", scene, (Piedra1Model) => {
        Piedra1Model.position.set(-57, 0, 13);
        Piedra1Model.scale.set(1, 1, 1); 
        Piedra1Model.name = "Lobby_Piedra1";
        registerCollision(Piedra1Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 1.glb", scene, (Piedra1Model) => {
        Piedra1Model.position.set(-2, 0, -52);
        Piedra1Model.scale.set(1, 1, 1); 
        Piedra1Model.name = "Lobby_Piedra1";
        registerCollision(Piedra1Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 1.glb", scene, (Piedra1Model) => {
        Piedra1Model.position.set(22, 0, 45);
        Piedra1Model.scale.set(1, 1, 1); 
        Piedra1Model.name = "Lobby_Piedra1";
        registerCollision(Piedra1Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 1.glb", scene, (Piedra1Model) => {
        Piedra1Model.position.set(50, 0, -10);
        Piedra1Model.scale.set(1, 1, 1); 
        Piedra1Model.name = "Lobby_Piedra1";
        registerCollision(Piedra1Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 1.glb", scene, (Piedra1Model) => {
        Piedra1Model.position.set(30, 0, -60);
        Piedra1Model.scale.set(1, 1, 1); 
        Piedra1Model.name = "Lobby_Piedra1";
        registerCollision(Piedra1Model, scene);
    });

    //------------------Piedra 2----------------
    loadGLTFModel("/models/stage_2/Piedra 2.glb", scene, (Piedra2Model) => {
        Piedra2Model.position.set(-20, 0, -80);
        Piedra2Model.scale.set(1, 1, 1); 
        Piedra2Model.name = "Lobby_Piedra2";
        registerCollision(Piedra2Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 2.glb", scene, (Piedra2Model) => {
        Piedra2Model.position.set(-40, 0, -42);
        Piedra2Model.scale.set(1, 1, 1); 
        Piedra2Model.name = "Lobby_Piedra2";
        registerCollision(Piedra2Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 2.glb", scene, (Piedra2Model) => {
        Piedra2Model.position.set(-37, 0, -27);
        Piedra2Model.scale.set(1, 1, 1); 
        Piedra2Model.name = "Lobby_Piedra2";
        registerCollision(Piedra2Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 2.glb", scene, (Piedra2Model) => {
        Piedra2Model.position.set(-20, 0, -20);
        Piedra2Model.scale.set(1, 1, 1); 
        Piedra2Model.name = "Lobby_Piedra2";
        registerCollision(Piedra2Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 2.glb", scene, (Piedra2Model) => {
        Piedra2Model.position.set(-40, 0, 30);
        Piedra2Model.scale.set(1, 1, 1); 
        Piedra2Model.name = "Lobby_Piedra2";
        registerCollision(Piedra2Model, scene);
    });
    //-------------Piedra 3---------------------
    loadGLTFModel("/models/stage_2/Piedra 3.glb", scene, (Piedra3Model) => {
        Piedra3Model.position.set(-10, 0, 50);
        Piedra3Model.scale.set(1, 1, 1); 
        Piedra3Model.name = "Lobby_Piedra3";
        registerCollision(Piedra3Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 3.glb", scene, (Piedra3Model) => {
        Piedra3Model.position.set(30, 0, 65);
        Piedra3Model.scale.set(1, 1, 1); 
        Piedra3Model.name = "Lobby_Piedra3";
        registerCollision(Piedra3Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 3.glb", scene, (Piedra3Model) => {
        Piedra3Model.position.set(16, 0, -20);
        Piedra3Model.scale.set(1, 1, 1); 
        Piedra3Model.name = "Lobby_Piedra3";
        registerCollision(Piedra3Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 3.glb", scene, (Piedra3Model) => {
        Piedra3Model.position.set(17, 0, -60);
        Piedra3Model.scale.set(1, 1, 1); 
        Piedra3Model.name = "Lobby_Piedra3";
        registerCollision(Piedra3Model, scene);
    });
    loadGLTFModel("/models/stage_2/Piedra 3.glb", scene, (Piedra3Model) => {
        Piedra3Model.position.set(-10, 0, 20);
        Piedra3Model.scale.set(1, 1, 1); 
        Piedra3Model.name = "Lobby_Piedra3";
        registerCollision(Piedra3Model, scene);
    });

    //SEÑAL
    loadGLTFModel("/models/stage_2/señal.glb", scene, (señalModel) => {
        señalModel.position.set(-53, 0, -24);
        señalModel.scale.set(1, 1, 1); 
        señalModel.name = "Lobby_señal";
        registerCollision(señalModel, scene);
    });
    loadGLTFModel("/models/stage_2/señal.glb", scene, (señalModel) => {
        señalModel.position.set(-56, 0, -58);
        señalModel.scale.set(1, 1, 1); 
        señalModel.name = "Lobby_señal";
        registerCollision(señalModel, scene);
    });
    loadGLTFModel("/models/stage_2/señal.glb", scene, (señalModel) => {
        señalModel.position.set(66, 0, 10);
        señalModel.scale.set(1, 1, 1); 
        señalModel.name = "Lobby_señal";
        registerCollision(señalModel, scene);
    });
    loadGLTFModel("/models/stage_2/señal.glb", scene, (señalModel) => {
        señalModel.position.set(53, 0, 68);
        señalModel.scale.set(1, 1, 1); 
        señalModel.name = "Lobby_señal";
        registerCollision(señalModel, scene);
    });
    loadGLTFModel("/models/stage_2/señal.glb", scene, (señalModel) => {
        señalModel.position.set(-10, 0, 30);
        señalModel.scale.set(1, 1, 1); 
        señalModel.name = "Lobby_señal";
        registerCollision(señalModel, scene);
    });
}