const mindar = document.querySelector('mindar-image');
const modelViewer = document.getElementById('model-viewer');

mindar.addEventListener('targetFound', () => {
  modelViewer.style.display = 'block';
  console.log('Marker bulundu, modeli göster');
});

mindar.addEventListener('targetLost', () => {
  modelViewer.style.display = 'none';
  console.log('Marker kayboldu, modeli gizle');
});
