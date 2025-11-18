import * as THREE from "three";
import $ from "jquery";

// --- Función para transición suave de animaciones ---
// ❌ ELIMINADA: Ya no se requiere la función fadeToAction.
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

    // ... (Event listeners keydown/keyup, sin cambios) ...
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
        const walkSpeed = 2; 
        const runSpeed = 2; 
        
        const speed = (move.run ? runSpeed : walkSpeed);
        
        // --- Lógica de decisión de animación ---
        const isMoving = move.forward || move.backward || move.left || move.right;
        
        // ❌ LÓGICA DE ANIMACIÓN ELIMINADA ❌
        // Antes: fadeToAction('Run'), fadeToAction('Idle'), etc.
        // ----------------------------------------------
        
        // --- Lógica de movimiento (Mueve la CÁMARA en XZ) ---
        velocity.x -= velocity.x * 20.0 * delta;
        velocity.z -= velocity.z * 20.0 * delta;

        if (move.forward) velocity.z -= speed * delta;
        if (move.backward) velocity.z += speed * delta;
        if (move.left) velocity.x -= speed * delta;
        if (move.right) velocity.x += speed * delta;

        controls.moveRight(velocity.x);
        controls.moveForward(-velocity.z);

        // --- Lógica de gravedad (CORREGIDA) ---
        if (canJump === false) {
          velocity.y -= GRAVITY * delta;
        }
        if (canJump && move.jump) {
          velocity.y = JUMP_IMPULSE;
          canJump = false;
        }
        
        // Aplicar la gravedad a la cámara
        camera.position.y += velocity.y * delta; 
        
        // Detección de suelo y reset de Y
        if (camera.position.y < cameraHeight) { 
          velocity.y = 0;
          camera.position.y = cameraHeight;
          canJump = true;
        }

        return isMoving;
    }

    return {
        updateMovement,
        velocity, 
        move,
        cameraHeight, // Se agregó para que gameCore.js lo use en player.position.y
        lastPosition: { camera: camera.position.clone() } // Necesario para la colisión en gameCore.js
    };
}