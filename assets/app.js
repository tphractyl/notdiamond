import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export default class App {


  
  constructor() {
    this.createSetup()
    this.createScene()
    this.createCamera()
    this.createRender()
    this.createGeometry(this.bpm.value)
    this.createLights()
    this.raf()
    addEventListener('resize', this.resize.bind(this))
  }

  


  lerp(min, max, t) {
    return min * (1 - t) + max * t
  }

  createSetup() {
    this.guiVisible = false
    this.time = 0
    this.canvas = document.querySelector('canvas')

    this.bpm = { value: 1000 }
    this.params = {
      wireframe: false,
      renderPass: false,
      bw: false,
      colorBurn: false,
      luminosity: false
    }
    this.bodyColor = { r: 0, g: 0, b: 0 }
  }

  createScene() {
    this.scene = new THREE.Scene()
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 100, 2000)
    this.camera.position.z = 100
    this.scene.add(this.camera)
  }

  
  createRender() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
    this.renderer.setPixelRatio(devicePixelRatio)
    this.renderer.setSize(innerWidth, innerHeight)
  }

  createGeometry(bpm) {
    this.mesh ? this.scene.remove(this.mesh) : null
    this.geometry = new THREE.TorusGeometry(100, 100)
    this.material = new THREE.ShaderMaterial({
      wireframe: this.params.wireframe,
      uniforms: { time: { value: 1.0 } },
      vertexShader: vertex,
      fragmentShader: fragment
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.set(1, 3, 0)
    this.scene.add(this.mesh)

    /* Render pass */
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.afterimagePass = new AfterimagePass()
    this.composer.addPass(this.afterimagePass)
  }

  createLights() {
    this.directionalLight = new THREE.AmbientLight('red')
    this.directionalLight.position.set(1, 1, 0)
    this.scene.add(this.directionalLight)
  }


  raf() {
    requestAnimationFrame(this.raf.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.time += 0.05
    this.material.uniforms.time.value = this.time

    if (this.params.renderPass) {
      this.composer.render()
    }
  }

  
  resize() {
    this.camera.aspect = innerWidth / innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(innerWidth, innerHeight)
  }

}

onload = () => new App()
