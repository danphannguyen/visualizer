import * as THREE from "three";
import audioController from "../../utils/AudioController";
import fragmentShader from "../shaders/bubble/sphere/fragment.glsl";
import vertexShader from "../shaders/bubble/sphere/vertex.glsl";

export default class Bubble {
    constructor() {
        this.group = new THREE.Group();

        this.timeFrequency = 0.0003
        this.elapsedTime = 0

        this.setVariations()
        this.setGeometry()
        this.setLights()
        this.setOffset()
        this.setMaterial()
        this.setMesh()
    }

    setVariations() {
        this.variations = {}

        this.variations.volume = {}
        this.variations.volume.target = 0
        this.variations.volume.current = 0
        this.variations.volume.upEasing = 0.03
        this.variations.volume.downEasing = 0.002
        this.variations.volume.getValue = () => {
            const level0 = audioController.fdata[0] / 100
            const level1 = audioController.fdata[10] / 100
            const level2 = audioController.fdata[20] / 100

            return Math.max(level0, level1, level2) * 0.3
        }
        this.variations.volume.getDefault = () => {
            return 0.152
        }

        this.variations.lowLevel = {}
        this.variations.lowLevel.target = 0
        this.variations.lowLevel.current = 0
        this.variations.lowLevel.upEasing = 0.005
        this.variations.lowLevel.downEasing = 0.002
        this.variations.lowLevel.getValue = () => {
            let value = 0.05
            value *= 0.003
            value += 0.0001
            value = Math.max(0, value)

            return value
        }
        this.variations.lowLevel.getDefault = () => {
            return 0.0003
        }

        this.variations.mediumLevel = {}
        this.variations.mediumLevel.target = 0
        this.variations.mediumLevel.current = 0
        this.variations.mediumLevel.upEasing = 0.008
        this.variations.mediumLevel.downEasing = 0.004
        this.variations.mediumLevel.getValue = () => {
            let value = 0.05
            value *= 2
            value += 3.587
            value = Math.max(3.587, value)

            return value
        }
        this.variations.mediumLevel.getDefault = () => {
            return 3.587
        }

        this.variations.highLevel = {}
        this.variations.highLevel.target = 0
        this.variations.highLevel.current = 0
        this.variations.highLevel.upEasing = 0.02
        this.variations.highLevel.downEasing = 0.001
        this.variations.highLevel.getValue = () => {
            let value = 0.05
            value *= 5
            value += 0.5
            value = Math.max(0.5, value)

            return value
        }
        this.variations.highLevel.getDefault = () => {
            return 0.65
        }
    }

    setLights() {
        this.lights = {}

        // Light A
        this.lights.a = {}

        this.lights.a.intensity = 1.85

        this.lights.a.color = {}
        this.lights.a.color.value = '#ff3e00'
        this.lights.a.color.instance = new THREE.Color(this.lights.a.color.value)

        this.lights.a.spherical = new THREE.Spherical(1, 0.615, 2.049)

        // Light B
        this.lights.b = {}

        this.lights.b.intensity = 1.4

        this.lights.b.color = {}
        this.lights.b.color.value = '#0063ff'
        this.lights.b.color.instance = new THREE.Color(this.lights.b.color.value)

        this.lights.b.spherical = new THREE.Spherical(1, 2.561, - 1.844)
    }

    setOffset() {
        this.offset = {}
        this.offset.spherical = new THREE.Spherical(1, Math.random() * Math.PI, Math.random() * Math.PI * 2)
        this.offset.direction = new THREE.Vector3()
        this.offset.direction.setFromSpherical(this.offset.spherical)
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(1, 512, 512)
        this.geometry.computeTangents()
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            uniforms:
            {
                uLightAColor: { value: this.lights.a.color.instance },
                uLightAPosition: { value: new THREE.Vector3(1, 1, 0) },
                uLightAIntensity: { value: this.lights.a.intensity },

                uLightBColor: { value: this.lights.b.color.instance },
                uLightBPosition: { value: new THREE.Vector3(- 1, - 1, 0) },
                uLightBIntensity: { value: this.lights.b.intensity },

                uSubdivision: { value: new THREE.Vector2(this.geometry.parameters.widthSegments, this.geometry.parameters.heightSegments) },

                uOffset: { value: new THREE.Vector3() },

                uDistortionFrequency: { value: 1.5 },
                uDistortionStrength: { value: 0.65 },
                uDisplacementFrequency: { value: 2.120 },
                uDisplacementStrength: { value: 0.152 },

                uFresnelOffset: { value: -1.609 },
                uFresnelMultiplier: { value: 3.587 },
                uFresnelPower: { value: 1.793 },

                uTime: { value: 0 }
            },
            defines:
            {
                USE_TANGENT: ''
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.material.uniforms.uLightAPosition.value.setFromSpherical(this.lights.a.spherical)
        this.material.uniforms.uLightBPosition.value.setFromSpherical(this.lights.b.spherical)
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.group.add(this.mesh)
    }

    update(deltaTime) {

        // Update variations
        for (let _variationName in this.variations) {
            const variation = this.variations[_variationName]
            variation.target = audioController.fdata ? variation.getValue() : variation.getDefault()

            const easing = variation.target > variation.current ? variation.upEasing : variation.downEasing
            variation.current += (variation.target - variation.current) * easing * deltaTime
        }

        // Time
        this.timeFrequency = this.variations.lowLevel.current
        this.elapsedTime = deltaTime * this.timeFrequency

        // Update material
        this.material.uniforms.uDisplacementStrength.value = this.variations.volume.current
        this.material.uniforms.uDistortionStrength.value = this.variations.highLevel.current
        this.material.uniforms.uFresnelMultiplier.value = this.variations.mediumLevel.current

        // Offset
        const offsetTime = this.elapsedTime * 0.3
        this.offset.spherical.phi = ((Math.sin(offsetTime * 0.001) * Math.sin(offsetTime * 0.00321)) * 0.5 + 0.5) * Math.PI
        this.offset.spherical.theta = ((Math.sin(offsetTime * 0.0001) * Math.sin(offsetTime * 0.000321)) * 0.5 + 0.5) * Math.PI * 2
        this.offset.direction.setFromSpherical(this.offset.spherical)
        this.offset.direction.multiplyScalar(this.timeFrequency * 2)

        this.material.uniforms.uOffset.value.add(this.offset.direction)

        // Time
        this.material.uniforms.uTime.value += this.elapsedTime
    }
}
