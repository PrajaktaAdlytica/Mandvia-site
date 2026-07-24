import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Chamber() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.15, 6.2);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x78d5d1,
      transparent: true,
      opacity: 0.13,
      roughness: 0.18,
      metalness: 0.08,
      transmission: 0.52,
      thickness: 0.8,
      side: THREE.DoubleSide,
    });
    const metal = new THREE.MeshStandardMaterial({ color: 0x18382f, roughness: 0.24, metalness: 0.65 });
    const mint = new THREE.MeshStandardMaterial({ color: 0x78d5d1, emissive: 0x123c35, emissiveIntensity: 1.4 });
    const coral = new THREE.MeshStandardMaterial({ color: 0xe85d45, emissive: 0x5b160f, emissiveIntensity: 1.2 });

    [-1.1, 0, 1.1].forEach((x, index) => {
      const gate = new THREE.Mesh(new THREE.BoxGeometry(0.09, 3.2 - index * 0.25, 1.85), index === 1 ? mint : glass);
      gate.position.set(x, 0, index === 1 ? 0.2 : 0);
      group.add(gate);
      const edge = new THREE.Mesh(new THREE.TorusGeometry(0.55 + index * 0.08, 0.025, 12, 90), metal);
      edge.rotation.y = Math.PI / 2;
      edge.position.set(x, 0, 0.1);
      group.add(edge);
    });

    const intentGeometry = new THREE.CylinderGeometry(0.035, 0.035, 6, 16);
    const intent = new THREE.Mesh(intentGeometry, coral);
    intent.rotation.z = Math.PI / 2;
    intent.position.set(-2.3, 0.1, 0.32);
    group.add(intent);

    const authorized = new THREE.Mesh(intentGeometry, mint);
    authorized.rotation.z = Math.PI / 2;
    authorized.position.set(2.25, 0.1, 0.32);
    group.add(authorized);

    const decision = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), new THREE.MeshStandardMaterial({ color: 0xd89b42, emissive: 0x8a4f09, emissiveIntensity: 1.9 }));
    decision.position.set(0, 0.1, 0.35);
    group.add(decision);

    const ambient = new THREE.AmbientLight(0xccebe4, 1.25);
    const key = new THREE.PointLight(0x78d5d1, 22, 14);
    key.position.set(2, 3, 4);
    const warm = new THREE.PointLight(0xe85d45, 14, 10);
    warm.position.set(-3, -1, 3);
    scene.add(ambient, key, warm);

    let pointerX = 0;
    let pointerY = 0;
    const onPointer = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.22;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.15;
    };
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("resize", onResize);

    const animationStartedAt = performance.now();
    let frame;
    const animate = () => {
      const time = (performance.now() - animationStartedAt) / 1000;
      group.rotation.y += (pointerX - group.rotation.y) * 0.025;
      group.rotation.x += (-pointerY - group.rotation.x) * 0.025;
      decision.scale.setScalar(1 + Math.sin(time * 2.5) * 0.16);
      key.intensity = 20 + Math.sin(time * 1.4) * 3;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="chamber-canvas" ref={mountRef} aria-hidden="true" />;
}
