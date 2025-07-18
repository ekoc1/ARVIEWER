document.addEventListener("DOMContentLoaded", () => {
  const mindar = document.querySelector('mindar-image');
  const modelViewer = document.getElementById('model-viewer');

  if (!mindar || !modelViewer) {
    console.error('MindAR veya model-viewer bulunamadı!');
    return;
  }

  mindar.addEventListener('targetFound', () => {
    modelViewer.style.display = 'block';
    console.log('Marker bulundu, model gösteriliyor');
  });

  mindar.addEventListener('targetLost', () => {
    modelViewer.style.display = 'none';
    console.log('Marker kayboldu, model gizleniyor');
  });

  mindar.start();
});
