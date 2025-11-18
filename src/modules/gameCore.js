import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import $ from "jquery";
import { setupPlayerControls } from "../controler/control.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, player, controls, playerMovement;
let css2dRenderer;
const clock = new THREE.Clock();
let playerModelTemplate = null;

let mixer;
const animations = {};

window.collidableObjects = [];

function loadPlayerModel() {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    console.log("DEBUG: Cargando 'HoodieCharacter.glb'...");

    // Ruta corregida: sin /public y sin espacios
    loader.load(
      "/models/HoodieCharacter.glb",
      (gltf) => {
        const model = gltf.scene;
        console.log("DEBUG: ¡ÉXITO! 'HoodieCharacter.glb' cargado.");

        // ¡AJUSTA ESTA ESCALA!
        // Si tu personaje es gigante, prueba 0.1 o 0.01
        // Si es pequeño, prueba 10 o 20.
        model.scale.set(1, 1, 1);

        mixer = new THREE.AnimationMixer(model);
        window.mixer = mixer;
        console.log("DEBUG: Mixer creado.");

        const animationNameMap = {
          "CharacterArmature|CharacterArmature|Idle": "Idle",
          "CharacterArmature|CharacterArmature|Run": "Run",
          "CharacterArmature|CharacterArmature|Roll": "Roll"
        };

        let animationsFound = 0;
        gltf.animations.forEach((clip) => {
          const shortName = animationNameMap[clip.name];
          if (shortName) {
            const action = mixer.clipAction(clip);
            animations[shortName] = action;
            animationsFound++;
            console.log(`DEBUG: Animación registrada: '${clip.name}' como '${shortName}'`);
          }
        });

        if (animationsFound === 0) {
          console.warn("DEBUG: No se encontró NINGUNA animación. Revisa los nombres en gltf-viewer.");
        }

        if (animations['Idle']) {
          animations['Idle'].play();
          window.currentAction = animations['Idle'];
          console.log("DEBUG: Reproduciendo 'Idle' por defecto.");
        } else {
          console.warn("DEBUG: No se encontró 'Idle'. El personaje puede quedar en T-Pose.");
        }

        playerModelTemplate = model;
        window.playerModelTemplate = playerModelTemplate;
        resolve(model);
      },
      undefined,
      (error) => {
        console.error("¡ERROR FATAL! No se pudo cargar 'HoodieCharacter.glb':", error);
        reject(error);
      }
    );
  });
}

export async function initGameCore(container, initialSceneLoader) {

  if (!playerModelTemplate) {
    try {
      await loadPlayerModel();
    } catch (error) {
      console.error("Fallo al cargar modelo de jugador, no se puede iniciar el juego.", error);
      return;
    }
  }

  window.animations = animations;

  window.collidableObjects = [];
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  window.scene = scene;

  // ¡AJUSTA ESTO! (Altura de los ojos)
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 0); // Altura de ojos (1.6 metros)

  const canvas = document.getElementById('gameCanvas');
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);


  css2dRenderer = new CSS2DRenderer();
  css2dRenderer.setSize(window.innerWidth, window.innerHeight);
  css2dRenderer.domElement.style.position = "absolute";
  css2dRenderer.domElement.style.top = "0px";
  css2dRenderer.domElement.style.pointerEvents = "none";
  $(container).append(css2dRenderer.domElement);

  player = playerModelTemplate.clone();
  // El 'player' (cuerpo) empieza en el suelo (Y=0)
  // Se sincronizará con la cámara en animate()
  player.position.set(camera.position.x, 0, camera.position.z);
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
const cameraHeight = 1.6; // Altura de los ojos

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  if (player && playerMovement) {
    // 1. Guardar pos. anterior de la CÁMARA
    prevCameraPosition.copy(camera.position);

    // 2. Mover la CÁMARA (la lógica de control.js)
    playerMovement.updateMovement(delta);

    // --- 3. ¡LA SINCRONIZACIÓN! (El esqueleto/rig que mencionas) ---
    // El modelo 'player' (el GLB) sigue a la 'camera'.
    player.position.x = camera.position.x;
    player.position.z = camera.position.z;
    // Ponemos los pies del modelo en el suelo, restando la altura de los ojos
    player.position.y = camera.position.y - cameraHeight;

    // Rotación: El cuerpo mira hacia donde miran los ojos
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    player.rotation.y = Math.atan2(cameraDirection.x, cameraDirection.z) + Math.PI;

    // 4. Actualizar matriz (para colisión y render)
    player.updateMatrixWorld(true);
    // -----------------------------------------------------------------

    // 5. Colisión (usa la caja del 'player' mesh)
    playerBox.setFromObject(player);

    let collisionDetected = false;
    for (let i = 0; i < window.collidableObjects.length; i++) {
      if (playerBox.intersectsBox(window.collidableObjects[i])) {
        collisionDetected = true;
        break;
      }
    }

    // 6. Si hay choque, REVERTIR LA CÁMARA
    if (collisionDetected) {
      camera.position.copy(prevCameraPosition);
      // Volver a sincronizar el mesh a la pos. revertida
      player.position.x = camera.position.x;
      player.position.z = camera.position.z;
      player.position.y = camera.position.y - cameraHeight;
    }

    if (window.playerHelper) window.playerHelper.update();
  }

  // ... (Resto de animate()) ...
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

// ... (handleResize y loadScene no cambian) ...
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
