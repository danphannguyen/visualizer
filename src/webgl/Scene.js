import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

import Line from "./objects/Line";

class Scene {
  constructor() {}

  setup(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // instantier la logique three.js
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.setupStats();

    this.addEvents();
    this.addObjects();
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  addObjects() {
    // this.geometry = new THREE.BoxGeometry(1, 1, 1);
    // this.material = new THREE.MeshNormalMaterial();
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.mesh);

    // Line
    this.line = new Line();
    this.scene.add(this.line.group);
  }

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  };

  addEvents() {
    gsap.ticker.add(this.tick);
    window.addEventListener("resize", this.onResize);
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    this.camera.position.z = 5;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  tick = (time, deltaTime, frame) => {
    this.stats.begin();

    this.renderer.render(this.scene, this.camera);

    // this.mesh.rotation.z += 0.01;
    // this.mesh.rotation.y += 0.01;
    if (this.line) {
      this.line.update();
    }

    this.stats.end();
  };
}

const scene = new Scene();
export default scene;
