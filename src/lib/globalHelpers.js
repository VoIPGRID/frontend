import { getClosestAncestorOfType } from './dom';

if (window && document) {
  document.body.addEventListener(
    'blur',
    ({ target: { nodeName, type }, target }) => {
      if ('INPUT' === nodeName && (type === 'password' || type === 'text' || type === '')) {
        const node = getClosestAncestorOfType(target, 'LABEL');
        if (node) {
          node.classList.remove('clean');
        }
      }
    },
    true
  );
}
