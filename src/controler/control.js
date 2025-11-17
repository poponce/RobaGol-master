import * as THREE from "three";
import $ from "jquery";

// --- Función para transición suave de animaciones ---
// ¡Esta función es tu mejor amiga!
function fadeToAction(name, duration = 0.2) {
    const { animations, currentAction } = window;
    
    if (!animations || !animations[name] || animations[name] === currentAction) {
        return; // No hacer nada si no existe o ya está activa
    }

    const nextAction = animations[name];
    
    if (currentAction) {
        currentAction.fadeOut(duration); 
    }
    
    nextAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
    
    window.currentAction = nextAction; 
}
// -----------------------------------------------------------

export function setupPlayerControls(camera, controls, player) {
  const move = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false, // Variable para la gravedad/salto
    run: false,
  };
  const velocity = new THREE.Vector3();
  const GRAVITY = 9.8;
  const JUMP_IMPULSE = 4; // Cuánto "salta" (para la gravedad)
  let canJump = true; 
  const cameraHeight = 1.6; // ¡Importante! La misma altura que en gameCore.js

  controls.addEventListener("lock", function () {
    canJump = true;
  });

  $(document).on("keydown", (e) => {
    if (e.code === "KeyW") move.forward = true;
    if (e.code === "KeyS") move.backward = true;
    if (e.code === "KeyA") move.left = true;
    if (e.code === "KeyD") move.right = true;
    if (e.code === "Space") move.jump = true; 
    if (e.code === "ShiftLeft") move.run = true;
  });

  $(document).on("keyup", (e) => {
    if (e.code === "KeyW") move.forward = false;
    if (e.code === "KeyS") move.backward = false;
    if (e.code === "KeyA") move.left = false;
    if (e.code === "KeyD") move.right = false;
    if (e.code === "Space") move.jump = false;
    if (e.code === "ShiftLeft") move.run = false;
  });

  function updateMovement(delta) {
    const walkSpeed = 2; // Velocidad de "Run" (no tienes "Walk")
    const runSpeed = 2; 
    
    const speed = (move.run ? runSpeed : walkSpeed);
    
    // --- Lógica de decisión de animación (¡ACTUALIZADA!) ---
    const isMoving = move.forward || move.backward || move.left || move.right;
    
    if (window.animations && Object.keys(window.animations).length > 0) { 
        if (!canJump && velocity.y > 0.1) {
            // 1. En el aire (subiendo) -> Reproducir 'Roll'
            fadeToAction('Roll', 0.1);
        } else if (isMoving && move.run && canJump) {
            // 2. Corriendo (Shift)
            fadeToAction('Run', 0.2);
        } else if (isMoving && !move.run && canJump) {
            // 3. Caminando (tu modelo solo tiene 'Run', así que usamos 'Run')
            fadeToAction('Run', 0.2); 
        } else if (!isMoving && canJump) {
            // 4. Detenido
            fadeToAction('Idle', 0.5); 
        }
    }
    // ----------------------------------------------
   
    // --- Lógica de movimiento (Mueve la CÁMARA) ---
    velocity.x -= velocity.x * 20.0 * delta;
    velocity.z -= velocity.z * 20.0 * delta;

    if (move.forward) velocity.z -= speed * delta;
    if (move.backward) velocity.z += speed * delta;
    if (move.left) velocity.x -= speed * delta;
    if (move.right) velocity.x += speed * delta;

    controls.moveRight(velocity.x);
    controls.moveForward(-velocity.z);

    // --- Lógica de gravedad ---
    if (canJump === false) {
      velocity.y -= GRAVITY * delta;
    }
    if (canJump && move.jump) {
      velocity.y = JUMP_IMPULSE;
      canJump = false;
    }
    camera.position.y += velocity.y * delta;

    // Colisión con el suelo
    if (camera.position.y < cameraHeight) {
        velocity.y = 0;
        camera.position.y = cameraHeight;
        canJump = true;
    }
  }

  return {
    updateMovement,
    velocity, 
    move,
    canJump 
  };
}