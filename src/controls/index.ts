import PubSub from 'pubsub-js';
import Mousetrap from 'mousetrap';

Mousetrap.bind(['up', 'down', 'left', 'right'], (event: { key: string }) => {
  PubSub.publish(`xwing.move.${event.key}`);
});

Mousetrap.bind('ctrl', () => {
  PubSub.publish(`xwing.lazer`);
});

Mousetrap.bind('space', () => {
  PubSub.publish(`xwing.rotate`);
});

// @TODO
export function TouchControls() {}

export function KeyboardControls() {}
