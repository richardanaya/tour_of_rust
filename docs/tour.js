const setupKeys = () => {
  document.body.addEventListener('keyup', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
      return;
    }
    let link;
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      link = document.querySelector('.next a');
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
      link = document.querySelector('.back a');
    }
    if (link) {
      link.click();
    }
  });
};

const iframeElement = document.querySelector('iframe');
if (iframeElement) {
  setupKeys();
  iframeElement.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('a').focus();
      setupKeys();
    }, 100);
    setTimeout(() => {
      document.querySelector('a').focus();
      setupKeys();
    }, 1000);
    setupKeys();
  });
} else {
  setupKeys();
}
