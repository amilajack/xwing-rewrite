import PubSub from 'pubsub-js';
import Mousetrap from 'mousetrap';

export function KeyboardControls(state) {
  // document.addEventListener('mousemove', onDocumentMouseMove);
  // document.addEventListener('mousedown', onDocumentMouseDown);
  // document.addEventListener('mouseup', onDocumentMouseUp);

  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    event.stopPropagation();
    switch (event.key) {
      case 'ArrowLeft':
        state.leftIsDown = false;
        break;
      case 'ArrowUp':
        state.upIsDown = false;
        break;
      case 'ArrowRight':
        state.rightIsDown = false;
        break;
      case 'ArrowDown':
        state.downIsDown = false;
        break;
      case 'Control':
        state.ctrlIsDown = false;
        break;
    }
  });

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    switch (event.key) {
      case 'ArrowLeft':
        state.leftIsDown = true;
        break;
      case 'ArrowUp':
        state.upIsDown = true;
        break;
      case 'ArrowRight':
        state.rightIsDown = true;
        break;
      case 'ArrowDown':
        state.downIsDown = true;
        break;
      case 'Control':
        state.ctrlIsDown = true;
        break;
    }
  });

  Mousetrap.bind('ctrl', () => {
    PubSub.publish(`xwing.lazer`);
    return false;
  });

  Mousetrap.bind('space', () => {
    PubSub.publish(`xwing.rotate`);
    return false;
  });
}

// @TODO
export function TouchControls() {
  // document.addEventListener('touchstart', onTouchStart);
  // document.addEventListener('touchmove', onTouchMove);
  // document.addEventListener('touchend', onTouchEnd);
}
