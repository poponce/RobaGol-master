import * as THREE from "three";
import $ from "jquery";

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
  let canJump = false;

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
   
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    if (move.forward) velocity.z -= speed * delta;
    if (move.backward) velocity.z += speed * delta;
    if (move.left) velocity.x -= speed * delta;
    if (move.right) velocity.x += speed * delta;

    controls.moveRight(velocity.x);
    controls.moveForward(-velocity.z);

    if (canJump === false) {
      velocity.y -= GRAVITY * delta;
    }

    if (canJump && move.jump) {
      velocity.y = JUMP_IMPULSE;
      canJump = false;
    }

    camera.position.y += velocity.y * delta;

    const groundLevel = 1.8; 

    if (camera.position.y < groundLevel) {
     
      velocity.y = 0;
      camera.position.y = groundLevel;
      canJump = true;
    }

    player.position.set(
      camera.position.x,
      camera.position.y - 0.8,
      camera.position.z
    );
    player.rotation.y = camera.rotation.y;
  }

  return { updateMovement };
}
