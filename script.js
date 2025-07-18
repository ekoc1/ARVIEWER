import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.140.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.140.0/examples/jsm/loaders/GLTFLoader.js";

const mindarThree = new MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "./qrcode.mind"
});

const { renderer, scene, camera } = mindarThree;

let model = null;

const loader = new GLTFLoader();
loader.load("./model.glb", (gltf) => {
  model = gltf.scene;
  model.position.set(0, 0, 0);  // Marker üzerindeki konum
  model.scale.set(0.5, 0.5, 0.5);
  model.visible = false;  // Başlangıçta gizli
  scene.add(model);
});

mindarThree.controller.onTargetFound = () => {
  console.log("Marker bulundu, modeli göster");
  if (model) model.visible = true;
};

mindarThree.controller.onTargetLost = () => {
  console.log("Marker kayboldu, modeli gizle");
  if (model) model.visible = false;
};

(async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
})();
