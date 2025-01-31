import * as THREE from 'three'
import audioController from '../../utils/AudioController'

export default class Board {
  constructor() {
    this.width = 16
    this.gap = 1
    this.group = new THREE.Group()

    this.geometry = new THREE.BoxGeometry(1, 1, 1)

    this.whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff
    })

    this.pinkMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc0cb
    })

    for (let y = 0; y < this.width; y++) {
      for (let x = 0; x < this.width; x++) {
        let mesh

        if (x % 2 === y % 2) {
          mesh = new THREE.Mesh(this.geometry, this.whiteMaterial)
        } else {
          mesh = new THREE.Mesh(this.geometry, this.pinkMaterial)
        }

        mesh.position.set(-this.width/2 + x, -this.width/2 + y, 0)

        this.group.add(mesh)
      }
    }

  }

  update() {
    if (!audioController.fdata) return

    for (let i = 0; i < this.group.children.length; i++) {
      this.group.children[i].scale.z = audioController.fdata[i] * 0.075 + 1
    }

    this.group.rotation.x += 0.001;
    this.group.rotation.y += 0.001;
  }
}
