import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import Line from './objects/Line'
import Board from './objects/Board'

class Scene {
  constructor() { }

  setup(canvas) {
    this.canvas = canvas
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.currentObject = null

    // instantier la logique three.js
    this.setupScene()
    this.setupCamera()
    this.setupRenderer()
    this.setupControls()
    this.setupStats()

    this.addEvents()
    this.addObjects()
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas)
  }

  setupStats() {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  addObjects() {
    // Line
    this.line = new Line()
    // Board
    this.board = new Board()

    this.camera.position.z = 200
    this.scene.add(this.line.group)
    this.currentObject = this.line
  }

  onResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.width, this.height)
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
        // line
        this.currentObject = this.line
        this.camera.position.z = 200
        break

      case 1:
        // board
        this.currentObject = this.board
        this.camera.position.z = 20

        break

        // Todo Ajouter un Sphere liquide

      default:
        break
    }
    this.scene.add(this.currentObject.group)
  }

  tick = (time, deltaTime, frame) => {
    this.stats.begin()

    this.renderer.render(this.scene, this.camera)

    if (this.currentObject) {
      this.currentObject.update()
    }
    this.stats.end()
  }
}

const scene = new Scene()
export default scene
