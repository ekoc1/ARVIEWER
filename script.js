import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js";

const mindarThree = new MindARThree({
  container: document.body,
  imageTargetSrc: "qrkod.mind"
});

const { renderer, scene, camera } = mindarThree;

const modelViewer = document.getElementById('model-viewer');

// model-viewer için THREE.js objesi oluşturalım (model-viewer web component olduğu için basitçe görünür/gizle yapacağız)
modelViewer.style.display = 'none';

(async () => {
  await mindarThree.start();

  mindarThree.controller.onTargetFound = () => {
    modelViewer.style.display = 'block';
    console.log("Marker bulundu, modeli göster");
  }

  mindarThree.controller.onTargetLost = () => {
    modelViewer.style.display = 'none';
    console.log("Marker kayboldu, modeli gizle");
  }

  // Animasyon loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
})();
