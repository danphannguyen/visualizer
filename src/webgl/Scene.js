import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Post Processing
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';

import Line from './objects/Line'
import Board from './objects/Board'
import LogoIUT from './objects/LogoIUT';
import Cover from './objects/Cover';
import Bubble from './objects/Bubble'
import audioController from '../utils/AudioController';


class Scene {
  constructor() { }

  setup(canvas) {
    this.canvas = canvas
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.currentObject = null

    // instantier la logique three.js
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupControls();
    this.setupStats();
    this.setupPostProcessing();
    this.setupGUI();

    this.setupGltfLoader();
    this.setupTextureLoader();

    this.addEvents();
    this.addObjects();
  }

  setupPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);

    this.composer.addPass(this.renderPass);

    this.bloomParams = {
      threshold: 0,
      strength: 0.3,
      radius: 1
    }

    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width, this.height),0,0,0)

    this.bloomPass.threshold = this.bloomParams.threshold;
    this.bloomPass.strength = this.bloomParams.strength;
    this.bloomPass.radius = this.bloomParams.radius;

    this.composer.addPass(this.bloomPass);

    this.afterimagePass = new AfterimagePass(0.90);
    this.composer.addPass(this.afterimagePass);

    // this.OutputPass = new OutputPass();
    // this.composer.addPass( this.outputPass );

  }

  setupGUI() {
    this.gui = new GUI();

    this.bloomFolder = this.gui.addFolder("Bloom");
    this.bloomFolder.add(this.bloomParams, "threshold", 0, 1).onChange((value) => {
      this.bloomPass.threshold = value
    }).listen()
    this.bloomFolder.add(this.bloomParams, "strength", 0, 1).onChange((value) => {
      this.bloomPass.strength = value
    }).listen()
    this.bloomFolder.add(this.bloomParams, "radius", 0, 1).onChange((value) => {
      this.bloomPass.radius = value
    }).listen()

    // const gui = new GUI( { title: 'Damp setting' } );
    // gui.add( afterimagePass.uniforms[ 'damp' ], 'value', 0, 1 ).step( 0.001 );
    // gui.add( params, 'enable' );

    this.afterimageFolder = this.gui.addFolder("Damp setting");
    this.afterimageFolder.add(this.afterimagePass.uniforms['damp'], 'value', 0, 1).step(0.001);
    // this.afterimageFolder.add( params, 'enable' );
  }

  setupGltfLoader() {
    this.gltfLoader = new GLTFLoader()
  };

  setupTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true;
  }

  setupStats() {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  addObjects() {
    // Import 3D Object
    this.line = new Line();
    this.board = new Board();
    this.logoIUT = new LogoIUT();
    this.cover = new Cover();
    this.bubble = new Bubble();

    this.camera.position.z = 10;
    this.scene.add(this.cover.group)
    this.currentObject = this.cover
  }

  onResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
  }

  addEvents() {
    gsap.ticker.add(this.tick)
    window.addEventListener('resize', this.onResize)
  }

  setupScene() {
    this.scene = new THREE.Scene()
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    )

    // this.camera.position.z = 20
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false
    })

    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  pickerVisualizer(index) {
    this.scene.remove(this.currentObject.group)
    switch (index) {
      case 0:
        // Cover
        this.bloomParams.strength = 0.3
        this.bloomPass.strength = 0.3
        this.currentObject = this.cover
        this.camera.position.z = 50
        break

      case 1:
        // line
        this.bloomParams.strength = 0.6
        this.bloomPass.strength = 0.6
        this.currentObject = this.line
        this.camera.position.z = 200
        break

      case 2:
        // board
        this.bloomParams.strength = 0.15
        this.bloomPass.strength = 0.15
        this.currentObject = this.board
        this.camera.position.z = 20

        break

      case 3:
        // logo iut
        this.bloomParams.strength = 0.85
        this.bloomPass.strength = 0.85
        this.currentObject = this.logoIUT
        this.camera.position.z = 5

        break

      case 4:
        // Bubble
        this.currentObject = this.bubble
        this.camera.position.z = 3
        break


      // Todo Ajouter un Sphere liquide

      default:
        break
    }
    this.scene.add(this.currentObject.group)
  }

  tick = (time, deltaTime, frame) => {
    this.stats.begin()

    // this.renderer.render(this.scene, this.camera)
    this.composer.render();   // Le composer prend le relai sur le renderer pour le psot processing

    this.controls.update()

    if (this.currentObject && audioController.fdata) {
      this.currentObject.update(time, deltaTime)
    }
    this.stats.end()
  }
}

const scene = new Scene()
export default scene
