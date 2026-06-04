// ============================================
// MATES.ARGENTINOS — 3D Hero Scene
// Three.js interactive stylized Mate
// ============================================

window.Hero3DScene = class {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
    this.camera.position.z = 10;
    this.camera.position.y = 1;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Group to hold the whole mate
    this.mateGroup = new THREE.Group();
    this.scene.add(this.mateGroup);

    this.createLighting();
    this.createMateModel();
    
    // Interaction state
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;

    this.bindEvents();
    
    // Animation loop variables
    this.clock = new THREE.Clock();
    
    this.animate();
  }

  createLighting() {
    // Ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Main Directional (Sunlight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    this.scene.add(dirLight);

    // Emerald Rim Light
    const rimLight = new THREE.PointLight(0x10b981, 1.5, 20);
    rimLight.position.set(-5, 3, -5);
    this.scene.add(rimLight);

    // Gold Fill Light
    const fillLight = new THREE.PointLight(0xd4a574, 1, 20);
    fillLight.position.set(5, -2, 2);
    this.scene.add(fillLight);
  }

  createMateModel() {
    // We create a stylized 3D Mate programmatically

    // 1. Gourd (Calabash shape)
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const v = i / 20;
      const radius = Math.sin(v * Math.PI) * 1.5 + Math.sin(v * Math.PI * 2) * 0.2;
      const y = (v - 0.5) * 3;
      points.push(new THREE.Vector2(radius > 0 ? radius : 0.01, y));
    }
    
    const gourdGeo = new THREE.LatheGeometry(points, 32);
    
    const gourdMat = new THREE.MeshStandardMaterial({
      color: 0x142014, // Dark forest
      roughness: 0.8,
      metalness: 0.1,
    });
    
    const gourd = new THREE.Mesh(gourdGeo, gourdMat);
    this.mateGroup.add(gourd);

    // 2. Silver Rim
    const rimGeo = new THREE.TorusGeometry(1.35, 0.15, 16, 32);
    const silverMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      roughness: 0.2,
      metalness: 0.9,
    });
    const rim = new THREE.Mesh(rimGeo, silverMat);
    rim.position.y = 1.45;
    rim.rotation.x = Math.PI / 2;
    this.mateGroup.add(rim);

    // 3. Yerba (Top green surface)
    const yerbaGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const yerbaMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80, // Bright green
      roughness: 0.9,
      metalness: 0,
    });
    const yerba = new THREE.Mesh(yerbaGeo, yerbaMat);
    yerba.position.y = 1.35;
    yerba.rotation.x = -0.1;
    yerba.rotation.z = 0.1;
    this.mateGroup.add(yerba);

    // 4. Bombilla (Silver straw)
    const bombillaGroup = new THREE.Group();
    
    const tubeGeo = new THREE.CylinderGeometry(0.06, 0.06, 4, 16);
    const tube = new THREE.Mesh(tubeGeo, silverMat);
    tube.position.y = 2;
    bombillaGroup.add(tube);

    const bulbGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const bulb = new THREE.Mesh(bulbGeo, silverMat);
    bulb.position.y = 0;
    bombillaGroup.add(bulb);

    bombillaGroup.position.set(0.5, 0, -0.5);
    bombillaGroup.rotation.z = -0.3;
    bombillaGroup.rotation.x = 0.2;
    
    this.mateGroup.add(bombillaGroup);

    this.mateGroup.position.y = -0.5;
    this.floatOffset = Math.random() * Math.PI * 2;
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    document.addEventListener('mousemove', (event) => {
      this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      this.targetRotationY = this.mouseX * 0.5;
      this.targetRotationX = this.mouseY * 0.2;
    });
  }

  onWindowResize() {
    if (!this.container) return;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    const time = this.clock.getElapsedTime();

    const floatY = Math.sin(time * 1.5 + this.floatOffset) * 0.2;
    const floatRotX = Math.sin(time * 1.0) * 0.05;
    
    this.mateGroup.rotation.y += (this.targetRotationY - this.mateGroup.rotation.y) * 0.05;
    this.mateGroup.rotation.x += (this.targetRotationX + floatRotX - this.mateGroup.rotation.x) * 0.05;
    
    this.mateGroup.position.y = -0.5 + floatY;
    this.mateGroup.rotation.y += 0.002;

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onWindowResize);
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
};
