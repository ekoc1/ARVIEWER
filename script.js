window.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./qrkod.mind", // Marker dosyan bu
  });

  const { renderer, scene, camera } = mindarThree;

  // GLB modelini yükle
  const loader = new THREE.GLTFLoader();
  const anchor = mindarThree.addAnchor(0); // Marker ID 0

  loader.load("model.glb", (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.4, 0.4, 0.4); // Gerekirse boyut ayarı
    model.rotation.set(0, Math.PI, 0); // Dönüş ayarı
    anchor.group.add(model);
  });

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
