import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-three.prod.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.140.0/build/three.module.js";

const mindarThree = new MindARThree({
  container: document.body,
  imageTargetSrc: "qrcode.mind"
});

const { renderer, scene, camera } = mindarThree;

// Modelü doğrudan sahneye ekle (anchor grubuna değil)
let model;

const loader = new THREE.GLTFLoader();
loader.load("model.glb", (gltf) => {
  model = gltf.scene;
  model.position.set(0, 0, -1); // Kameraya göre 1 metre önünde sabit pozisyon
  model.scale.set(0.5, 0.5, 0.5);
  model.visible = false; // Başta gizli
  scene.add(model);
});

mindarThree.controller.onTargetFound = () => {
  console.log("Marker bulundu");
  if(model) model.visible = true;
};

mindarThree.controller.onTargetLost = () => {
  console.log("Marker kayboldu");
  if(model) model.visible = false;
};

await mindarThree.start();

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
