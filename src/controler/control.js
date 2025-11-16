import * as THREE from "three";
import $ from "jquery";

// --- ¡NUEVO! Función para transición suave de animaciones ---
// Esta función se comunicará con las animaciones cargadas en gameCore.js
function fadeToAction(name, duration = 0.2) {
    const { animations, currentAction } = window;
    
    // Si la animación no existe o ya se está reproduciendo, no hacer nada
    if (!animations || !animations[name] || animations[name] === currentAction) {
        return;
    }

    const nextAction = animations[name];
    
    if (currentAction) {
        // Hacer "fade out" (desvanecer) la acción actual
        currentAction.fadeOut(duration); 
        nextAction.enabled = true; // Activar la siguiente
        
        // Mezclar suavemente desde la actual
        nextAction.crossFadeFrom(currentAction, duration, false);
    }
    
    nextAction.play(); // Iniciar la nueva acción
    window.currentAction = nextAction; // Guardar como la acción actual
}
// -----------------------------------------------------------

export function setupPlayerControls(camera, controls, player) {
  const move = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  };
  const velocity = new THREE.Vector3();
  const GRAVITY = 9.8;
  const JUMP_IMPULSE = 4;
  let canJump = true; // Empezar en true para permitir el primer salto

  controls.addEventListener("lock", function () {
    canJump = true;
  });

  $(document).on("keydown", (e) => {
    if (e.code === "KeyW") move.forward = true;
    if (e.code === "KeyS") move.backward = true;
    if (e.code === "KeyA") move.left = true;
    if (e.code === "KeyD") move.right = true;
    if (e.code === "Space") move.jump = true;
  });

  $(document).on("keyup", (e) => {
    if (e.code === "KeyW") move.forward = false;
    if (e.code === "KeyS") move.backward = false;
    if (e.code === "KeyA") move.left = false;
    if (e.code === "KeyD") move.right = false;
    if (e.code === "Space") move.jump = false;
  });

  function updateMovement(delta) {
    const speed = 2;
    
    // --- ¡NUEVO! Lógica de decisión de animación ---
    const isMoving = move.forward || move.backward || move.left || move.right;
    
    if (window.animations) { // Solo si las animaciones ya cargaron
        if (!canJump && velocity.y > 0.1) {
            // 1. Saltando (en el aire, subiendo)
            fadeToAction('Jump', 0.05); 
        } else if (isMoving && canJump) {
            // 2. Caminando (en el suelo y presionando teclas)
            fadeToAction('Walk', 0.2); 
        } else if (!isMoving && canJump) {
            // 3. Reposo (en el suelo, sin presionar teclas)
            fadeToAction('Idle', 0.5);
        }
    }
    // ----------------------------------------------
   
    // Lógica de movimiento (frena)
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    // Lógica de movimiento (acelera)
    if (move.forward) velocity.z -= speed * delta;
    if (move.backward) velocity.z += speed * delta;
    if (move.left) velocity.x -= speed * delta;
    if (move.right) velocity.x += speed * delta;

    // Aplicar movimiento a la CÁMARA
    controls.moveRight(velocity.x);
    controls.moveForward(-velocity.z);

    // Lógica de gravedad y salto
    if (canJump === false) {
      velocity.y -= GRAVITY * delta;
    }

    if (canJump && move.jump) {
      velocity.y = JUMP_IMPULSE;
      canJump = false;
    }
    
    camera.position.y += velocity.y * delta;

    // Colisión con el suelo (Y=1.6 es la altura de los ojos)
    if (camera.position.y < 1.6) {
        velocity.y = 0;
        camera.position.y = 1.6;
        canJump = true;
    }
  }

  // Devolver todo lo necesario
  return {
    updateMovement,
    velocity, 
    move,
    canJump // Exportar 'canJump' es vital para la lógica de animación
  };
}