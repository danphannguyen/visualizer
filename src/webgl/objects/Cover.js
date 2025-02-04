import * as THREE from "three";
import audioController from "../../utils/AudioController";
import scene from "../Scene";

import FragmentShader from "../shaders/cover/fragment.glsl"
import VertexShader from "../shaders/cover/vertex.glsl"

export default class Cover {
    constructor() {
        this.group = new THREE.Group();

        this.geometry = new THREE.PlaneGeometry(20, 20, 128, 128)
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uMap: new THREE.Uniform(),
            },
            fragmentShader: '',
            vertexShader: '',
            side: THREE.DoubleSide,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.group.add(this.mesh);
    }

    setCover(src) {
        this.texture = scene.textureLoader.load(src)
        // this.material.map = this.texture
        // this.material.needsUpdate = true

        this.material.uniforms.uMap.value = this.texture
    }

    update() {
        this.group.rotation.y += 0.005;
        this.group.rotation.z += 0.01;
    }
}
