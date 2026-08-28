/**
 * =================================================================
 * THREE.JS 3D INTERACTIVE HERO & BACKGROUND SCENE
 * Creates an interactive 3D folder, floating elements, particles,
 * and mouse/scroll responsive camera movement.
 * =================================================================
 */

let scene, camera, renderer;
let folderGroup, laptopGroup, floatingItems = [];
let particlesMesh;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

function initThreeScene() {
  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  const fov = 45;
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
  camera.position.set(0, 0, 14);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x00d2ff, 1.8);
  mainLight.position.set(10, 15, 12);
  mainLight.castShadow = true;
  scene.add(mainLight);

  const accentLight = new THREE.DirectionalLight(0x1d70b8, 1.5);
  accentLight.position.set(-10, -10, -5);
  scene.add(accentLight);

  const pointLight = new THREE.PointLight(0x00e5ff, 2, 20);
  pointLight.position.set(0, 2, 5);
  scene.add(pointLight);

  // Build 3D Objects
  create3DFolder();
  createFloatingElements();
  createParticles();

  // Listeners
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('scroll', onScrollMove);

  // Start Animation Loop
  animateThree();
}

// Create 3D Folder Object
function create3DFolder() {
  folderGroup = new THREE.Group();

  // Folder Back Cover (Blue Tab)
  const backShape = new THREE.Shape();
  const width = 5.2;
  const height = 3.6;
  const radius = 0.25;

  // Folder tab outline
  backShape.moveTo(-width / 2 + radius, -height / 2);
  backShape.lineTo(width / 2 - radius, -height / 2);
  backShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
  backShape.lineTo(width / 2, height / 2 - radius);
  backShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  // Folder tab top notch
  backShape.lineTo(-0.5, height / 2);
  backShape.lineTo(-0.8, height / 2 + 0.4);
  backShape.lineTo(-width / 2 + radius, height / 2 + 0.4);
  backShape.quadraticCurveTo(-width / 2, height / 2 + 0.4, -width / 2, height / 2 + 0.4 - radius);
  backShape.lineTo(-width / 2, -height / 2 + radius);
  backShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

  const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
  const folderGeo = new THREE.ExtrudeGeometry(backShape, extrudeSettings);

  // Folder Blue Glossy Material
  const folderMat = new THREE.MeshStandardMaterial({
    color: 0x1d70b8,
    roughness: 0.25,
    metalness: 0.4,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1
  });

  const folderMesh = new THREE.Mesh(folderGeo, folderMat);
  folderMesh.castShadow = true;
  folderMesh.receiveShadow = true;
  folderGroup.add(folderMesh);

  // Inner Paper Sheets protruding
  const paperGeo = new THREE.PlaneGeometry(4.8, 3.2);
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf8f9fa,
    roughness: 0.6,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < 3; i++) {
    const paper = new THREE.Mesh(paperGeo, paperMat);
    paper.position.set(0, 0.25 + i * 0.05, 0.1 + i * 0.08);
    paper.rotation.z = (i - 1) * 0.04;
    folderGroup.add(paper);
  }

  // Front Folder Pocket
  const frontShape = new THREE.Shape();
  frontShape.moveTo(-width / 2, -height / 2);
  frontShape.lineTo(width / 2, -height / 2);
  frontShape.lineTo(width / 2, height / 4);
  frontShape.lineTo(-width / 2, height / 4 - 0.2);
  frontShape.lineTo(-width / 2, -height / 2);

  const frontGeo = new THREE.ExtrudeGeometry(frontShape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 });
  const frontMat = new THREE.MeshStandardMaterial({
    color: 0x0a4b82,
    roughness: 0.3,
    metalness: 0.5
  });
  const frontMesh = new THREE.Mesh(frontGeo, frontMat);
  frontMesh.position.z = 0.35;
  folderGroup.add(frontMesh);

  // Initial Position & Tilt
  folderGroup.position.set(3.2, 0.2, 0);
  folderGroup.rotation.set(0.2, -0.4, 0.1);
  scene.add(folderGroup);
}

// Create Floating Interactive 3D Badges & Geometry
function createFloatingElements() {
  const sphereGeo = new THREE.IcosahedronGeometry(0.5, 2);
  const torusGeo = new THREE.TorusGeometry(0.6, 0.2, 16, 32);
  const cubeGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.7,
    roughness: 0.1,
    transmission: 0.8,
    thickness: 0.5,
    clearcoat: 1
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffb300,
    roughness: 0.3,
    metalness: 0.8
  });

  const cyanMat = new THREE.MeshStandardMaterial({
    color: 0x4fa8ed,
    roughness: 0.2,
    metalness: 0.6
  });

  // Floating Item 1: Glass Sphere
  const item1 = new THREE.Mesh(sphereGeo, glassMat);
  item1.position.set(-4, 2.5, 2);
  scene.add(item1);
  floatingItems.push({ mesh: item1, rotSpeedX: 0.01, rotSpeedY: 0.015, floatSpeed: 0.002, initialY: 2.5 });

  // Floating Item 2: Gold Torus Ring
  const item2 = new THREE.Mesh(torusGeo, goldMat);
  item2.position.set(5.5, -2, 1);
  scene.add(item2);
  floatingItems.push({ mesh: item2, rotSpeedX: 0.02, rotSpeedY: 0.01, floatSpeed: 0.003, initialY: -2 });

  // Floating Item 3: Cyan Tech Cube
  const item3 = new THREE.Mesh(cubeGeo, cyanMat);
  item3.position.set(-4.5, -2.5, 0.5);
  scene.add(item3);
  floatingItems.push({ mesh: item3, rotSpeedX: 0.015, rotSpeedY: 0.02, floatSpeed: 0.0025, initialY: -2.5 });
}

// Particle Background Field
function createParticles() {
  const particleCount = 120;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;
    positions[i + 1] = (Math.random() - 0.5) * 30;
    positions[i + 2] = (Math.random() - 0.5) * 15;

    // Gradient cyan-blue particle colors
    colors[i] = 0.1 + Math.random() * 0.4;
    colors[i + 1] = 0.6 + Math.random() * 0.4;
    colors[i + 2] = 1.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.6
  });

  particlesMesh = new THREE.Points(geometry, material);
  scene.add(particlesMesh);
}

// Event Listeners
function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onScrollMove() {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollY / (maxScroll || 1);

  if (folderGroup) {
    folderGroup.rotation.y = -0.4 + scrollFraction * 1.5;
    folderGroup.rotation.x = 0.2 + Math.sin(scrollFraction * Math.PI) * 0.3;
    folderGroup.position.y = 0.2 - scrollFraction * 3;
  }
}

function onWindowResize() {
  const container = document.getElementById('three-canvas-container');
  if (!container || !renderer || !camera) return;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Responsive adjusting position on small screens
  if (window.innerWidth < 768) {
    folderGroup.position.set(0, -1.8, -2);
    folderGroup.scale.set(0.7, 0.7, 0.7);
  } else {
    folderGroup.position.set(3.2, 0.2, 0);
    folderGroup.scale.set(1, 1, 1);
  }
}

// Animation Render Loop
function animateThree() {
  requestAnimationFrame(animateThree);

  // Smooth mouse interpolation
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  if (folderGroup) {
    folderGroup.rotation.z = 0.1 + targetX * 0.15;
    folderGroup.rotation.x += (targetY * 0.15 - folderGroup.rotation.x + 0.2) * 0.05;
  }

  // Rotate and float elements
  floatingItems.forEach((item, index) => {
    item.mesh.rotation.x += item.rotSpeedX;
    item.mesh.rotation.y += item.rotSpeedY;
    item.mesh.position.y = item.initialY + Math.sin(Date.now() * 0.0015 + index) * 0.3;
  });

  if (particlesMesh) {
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;
  }

  renderer.render(scene, camera);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initThreeScene();
  onWindowResize();
});
