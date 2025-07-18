window.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./qrkod.mind",
  });

  const { renderer, scene, camera } = mindarThree;

  const anchor = mindarThree.addAnchor(0);

  const loader = new THREE.GLTFLoader();

  let placedModel = null;
  let modelPlaced = false;

  loader.load("model.glb", (gltf) => {
    placedModel = gltf.scene;
    placedModel.scale.set(0.4, 0.4, 0.4);
    placedModel.visible = false; // başta görünmesin
    scene.add(placedModel);
  });

  anchor.onTargetFound = () => {
    if (!modelPlaced && placedModel) {
      // Marker'ı görünce bir kere yerleştir
      placedModel.position.copy(anchor.group.position);
      placedModel.quaternion.copy(anchor.group.quaternion);
      placedModel.visible = true;
      modelPlaced = true;
      console.log("Model marker üzerine yerleştirildi.");
    }
  };

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
