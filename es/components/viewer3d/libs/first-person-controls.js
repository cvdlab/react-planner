export function firstPersonOnKeyDown(event, moveForward, moveLeft, moveBackward, moveRight, canJump, velocity) {

  switch (event.keyCode) {

    case 38: // up
    case 87:
      // w
      moveForward = true;
      break;

    case 37: // left
    case 65:
      // a
      moveLeft = true;
      break;

    case 40: // down
    case 83:
      // s
      moveBackward = true;
      break;

    case 39: // right
    case 68:
      // d
      moveRight = true;
      break;

    case 32:
      // space
      if (canJump === true) velocity.y += 225;
      canJump = false;
      break;
  }

  return { moveForward: moveForward, moveLeft: moveLeft, moveBackward: moveBackward, moveRight: moveRight, canJump: canJump };
}

export function firstPersonOnKeyUp(event, moveForward, moveLeft, moveBackward, moveRight, canJump) {

  switch (event.keyCode) {
    case 38: // up
    case 87:
      // w
      moveForward = false;
      break;

    case 37: // left
    case 65:
      // a
      moveLeft = false;
      break;

    case 40: // down
    case 83:
      // s
      moveBackward = false;
      break;

    case 39: // right
    case 68:
      // d
      moveRight = false;
      break;
  }
  return { moveForward: moveForward, moveLeft: moveLeft, moveBackward: moveBackward, moveRight: moveRight, canJump: canJump };
}