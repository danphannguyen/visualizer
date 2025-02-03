import * as THREE from "three";
import audioController from "../../utils/AudioController";
import scene from "../Scene";

export default class LogoIUT {
    constructor() {

        this.group = null;

        this.material = new THREE.MeshNormalMaterial();

        this.matcap = scene.textureLoader.load(("/textures/matcap.png"))
        this.matcap2 = scene.textureLoader.load(("/textures/matcap-2.png"))

        this.material = new THREE.MeshMatcapMaterial({
            matcap: this.matcap
        });

        this.material2 = new THREE.MeshMatcapMaterial({
            matcap: this.matcap2
        });

        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;

        this.sphere = null;

        scene.gltfLoader.load('/models/logo-iut.glb', (gltf) => {
            this.group = gltf.scene

            this.group.traverse((object) => {

                // si l'objet est un mesh appliquer le matériaux
                if (object.type === "Mesh") {
                    object.material = this.material
                }

                this.sphere = this.group.getObjectByName("Icosphere")
                this.sphere.material = this.material2

                this.left = this.group.getObjectByName("BezierCircle");
                this.right = this.group.getObjectByName("BezierCircle002");
                this.top = this.group.getObjectByName("BezierCircle003");
                this.bottom = this.group.getObjectByName("BezierCircle001");

            });

            this.group.rotation.x = Math.PI / 2
        });
    }

    update() {

        this.group.rotation.y += 0.001;
        this.group.rotation.z += 0.002;

        const remappedFrequency = audioController.fdata[0] / 255

        const scale = 0.5 + remappedFrequency
        const scale2 = 1 + remappedFrequency / 2

        this.sphere.scale.set(
            scale,
            scale,
            scale,
        )

        this.left.position.x = -0.75 + remappedFrequency;
        this.right.position.x = 0.75 - remappedFrequency;

        this.top.position.z = -0.75 + remappedFrequency;
        this.bottom.position.z = 0.75 - remappedFrequency;

        this.left.scale.set(scale2, scale2, scale2)
        this.right.scale.set(scale2, scale2, scale2)
        this.top.scale.set(scale2, scale2, scale2)
        this.bottom.scale.set(scale2, scale2, scale2)
    }
}