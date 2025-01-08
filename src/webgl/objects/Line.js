import * as THREE from "three";
import audioController from "../../utils/AudioController";

export default class Line {
  constructor() {
    this.nb = 256;
    this.gap = 1.5;
    this.colors = [
      0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8f00ff,
    ];

    this.materials = [];

    this.colors.forEach((color) => {
      const material = new THREE.MeshBasicMaterial({
        color: color,
      });

      this.materials.push(material);
    });

    this.group = new THREE.Group();
    this.group.position.x = -(this.nb * this.gap) / 2;
    this.group.position.z = -50;

    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    const MODULO = Math.round(this.nb / this.colors.length);
    let n = -1;

    for (let i = 0; i < this.nb; i++) {
      if (i % MODULO === 0) {
        n++;
      }
      const mesh = new THREE.Mesh(this.geometry, this.materials[n]);

      mesh.position.x = i * this.gap;

      this.group.add(mesh);
    }
  }

  update() {
    if (!audioController.fdata) return;
    console.log(audioController.fdata);

    for (let i = 0; i < this.group.children.length; i++) {
      this.group.children[i].scale.y = audioController.fdata[i];
    }
  }
}
