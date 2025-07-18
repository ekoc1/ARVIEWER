window.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./qrcode.mind", // marker dosyasının yolu
  });

  const { renderer, scene, camera } = mindarThree;

  const loader = new THREE.GLTFLoader();
  const anchor = mindarThree.addAnchor(0);

  let placedModel = null;
  let modelPlaced = false;

  loader.load(
    "./model.glb",
    (gltf) => {
      placedModel = gltf.scene;
      placedModel.scale.set(0.5, 0.5, 0.5);
      placedModel.visible = false;
      scene.add(placedModel);
    },
    undefined,
    (error) => console.error("Model yükleme hatası:", error)
  );

  anchor.onTargetFound = () => {
    console.log("Marker bulundu");
    if (!modelPlaced && placedModel) {
      placedModel.position.copy(anchor.group.position);
      placedModel.quaternion.copy(anchor.group.quaternion);
      placedModel.visible = true;
      modelPlaced = true;
      console.log("Model marker üzerine yerleştirildi ve sabitlendi.");
    }
  };

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
