import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import $ from "jquery";
import { setupPlayerControls } from "../controler/control.js"; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// --- ¡NUEVO! Importar el cargador de FBX ---
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let scene, camera, renderer, player, controls, playerMovement;
let css2dRenderer;
const clock = new THREE.Clock();
let playerModelTemplate = null;

// --- ¡NUEVO! Variables de Animación ---
let mixer; // El motor de animación de Three.js
const animations = {}; // Objeto para guardar las acciones (Idle, Walk, etc.)
// ------------------------------------

window.collidableObjects = []; 

function loadPlayerModel() {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      "/public/models/Personaje.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.rotation.y = Math.PI; // Rotar 180 grados si mira hacia atrás

        // --- ¡NUEVO! Inicializar el AnimationMixer con el modelo ---
        mixer = new THREE.AnimationMixer(model);
        window.mixer = mixer; // Opcional: hacerlo global para debug
        
        playerModelTemplate = model;
        window.playerModelTemplate = playerModelTemplate; 
        resolve(model);
      },
      undefined, 
      (error) => {
        console.error("Error al cargar Personaje.glb:", error);
        playerModelTemplate = new THREE.Mesh(
          new THREE.BoxGeometry(1, 2, 1),
          new THREE.MeshStandardMaterial({ color: 0x808080 })
        );
        window.playerModelTemplate = playerModelTemplate;
        resolve(playerModelTemplate);
      }
    );
  });
}

// --- ¡NUEVO! Función para cargar animaciones (FBX o GLB) ---
function loadAnimation(name, path) {
    let loader;
    const extension = path.split('.').pop().toLowerCase();
    
    if (extension === 'fbx') {
        loader = new FBXLoader();
    } else if (extension === 'glb' || extension === 'gltf') {
        loader = new GLTFLoader();
    } else {
        console.error(`Formato de animación no soportado: ${extension}`);
        return;
    }

    loader.load(
        path,
        (asset) => {
            // asset puede ser un FBX (Object3D) o un GLB (objeto gltf)
            const clip = asset.animations[0];
            
            if (!clip) {
                console.warn(`El archivo ${path} no contiene animaciones.`);
                return;
            }
            
            clip.name = name; // Asignamos el nombre
            
            // Creamos la "acción" y la guardamos
            const action = mixer.clipAction(clip);
            animations[name] = action;
            console.log(`Animación '${name}' cargada desde ${path}.`);

            // Si es 'Idle', la reproducimos por defecto
            if (name === 'Idle' && !window.currentAction) {
                action.play();
                window.currentAction = action; 
            }
        },
        undefined,
        (error) => {
            console.error(`Error al cargar la animación ${path}:`, error);
        }
    );
}
// --------------------------------------------------------

export async function initGameCore(container, initialSceneLoader) {
 
  if (!playerModelTemplate) {
    await loadPlayerModel(); // Espera a que el modelo (y el mixer) estén listos
  }

  // --- ¡NUEVO! Cargar todas las animaciones ---
  // Asegúrate que estas rutas sean correctas
  loadAnimation('Idle', '/public/models/Idle.fbx');
  loadAnimation('Walk', '/public/models/Walk.fbx');
  loadAnimation('Jump', '/public/models/Jump.fbx');
  // loadAnimation('Run', '/public/models/Run.fbx'); // Si tienes una de correr
  window.animations = animations; // Hacerlas globales para control.js
  // --------------------------------------------
  
  window.collidableObjects = [];

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  window.scene = scene;

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 0); 

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  $(container).append(renderer.domElement);

  css2dRenderer = new CSS2DRenderer();
  css2dRenderer.setSize(window.innerWidth, window.innerHeight);
  css2dRenderer.domElement.style.position = "absolute";
  css2dRenderer.domElement.style.top = "0px";
  css2dRenderer.domElement.style.pointerEvents = "none"; 
  $(container).append(css2dRenderer.domElement);

  player = playerModelTemplate.clone();
  player.position.set(0, 1, 0); 
  scene.add(player);
  window.player = player;

  const playerHelper = new THREE.BoxHelper(player, 0x00ff00);
  playerHelper.material.depthTest = false; 
  playerHelper.material.linewidth = 3;
  scene.add(playerHelper);
  window.playerHelper = playerHelper;

  controls = new PointerLockControls(camera, renderer.domElement);
  $(document.body).on("click", () => controls.lock());
  playerMovement = setupPlayerControls(camera, controls, player);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);

  const ambient = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambient);

  loadScene(initialSceneLoader);

  animate();

  $(window).on("resize", handleResize);
}

const playerBox = new THREE.Box3(); 
const prevCameraPosition = new THREE.Vector3(); 

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // --- ¡NUEVO! Actualizar el mixer en cada frame ---
  if (mixer) {
      mixer.update(delta);
  }
  // ------------------------------------------------

  if (player) {
      prevCameraPosition.copy(camera.position);
      
      if (playerMovement) playerMovement.updateMovement(delta);

      // Sincronización
      player.position.x = camera.position.x;
      player.position.z = camera.position.z;
      player.position.y = camera.position.y - 1.6; 

      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);
      player.rotation.y = Math.atan2(cameraDirection.x, cameraDirection.z) + Math.PI;

      // Colisión
      player.updateMatrixWorld(true);
      playerBox.setFromObject(player);

      let collisionDetected = false;
      for (let i = 0; i < window.collidableObjects.length; i++) {
          if (playerBox.intersectsBox(window.collidableObjects[i])) {
              collisionDetected = true;
              break; 
          }
      }

      if (collisionDetected) {
          camera.position.copy(prevCameraPosition);
          player.position.x = camera.position.x;
          player.position.z = camera.position.z;
          player.position.y = camera.position.y - 1.6; 
          
          if (playerMovement && playerMovement.velocity) {
              playerMovement.velocity.x = 0;
              playerMovement.velocity.z = 0;
          }
      }

      if (window.playerHelper) window.playerHelper.update();
  }

  // Código de UI y Render
  if (window.sendPlayerPosition && player) {
    window.sendPlayerPosition({
      position: player.position,
      rotation: player.rotation,
    });
  }

  const camPosition = camera.position;
  const coordsElement = document.getElementById("coordinates");
  if (coordsElement) {
    coordsElement.textContent = `X: ${camPosition.x.toFixed(2)} | Y: ${camPosition.y.toFixed(2)} | Z: ${camPosition.z.toFixed(2)}`;
  }

  renderer.render(scene, camera);
  if (css2dRenderer) {
    css2dRenderer.render(scene, camera);
  }
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (css2dRenderer) {
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export function loadScene(sceneLoader) {
  window.collidableObjects = [];
  
  const persistentObjects = [
    camera,
    player,
    window.playerHelper,
    scene.children.find((c) => c.isDirectionalLight),
    scene.children.find((c) => c.isAmbientLight),
  ];

  scene.children.slice().forEach((child) => {
    if (!persistentObjects.includes(child)) {
      scene.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    }
  });

  sceneLoader(scene);
  console.log("Nuevo escenario cargado.");
}