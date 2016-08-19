import THREE from 'three'

let scene
let HEIGHT
let WIDTH
let aspectRatio
let fieldOfView
let nearActor
let farActor
let camera
let renderer
let container
let controls
let ambientLight
let hemisphereLight
let shadowLight
let sun
const Colors = {
    red: 0xd75461,
    white: 0xf7f2F9,
    yellow: 0xfbe5d3,
    blue: 0x1a4c68
}
let world
let deltaTime = 0
let newTime = new Date().getTime()
let oldTime = new Date().getTime()
const zoomFactor = 1
const zoomIncrement = -0.01

function reset() {
    world = {
        coronaRadius: 400,
        coronaMinAmp: 5,
        coronaMaxAmp: 20,
        coronaMinSpeed: 0.0005,
        coronaMaxSpeed: 0.002,
        speed: 0,
        cameraSensivity: 0.002,
        cameraZPositionMax: 1000,
        cameraZPositionMin: 300
    }
}

function handleWindowResize() {
    HEIGHT = window.innerHeight
    WIDTH = window.innerWidth
    renderer.setSize(WIDTH, HEIGHT)
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
}

function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)
    ambientLight = new THREE.AmbientLight(0xFFEDB9, 0.5)
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
    shadowLight.position.set(150, 350, 350)
    shadowLight.castShadow = true
    shadowLight.shadow.camera.left = -400
    shadowLight.shadow.camera.right = 400
    shadowLight.shadow.camera.top = 400
    shadowLight.shadow.camera.bottom = -400
    shadowLight.shadow.camera.near = 1
    shadowLight.shadow.camera.far = 1000
    shadowLight.shadow.mapSize.width = 4096
    shadowLight.shadow.mapSize.height = 4096
    scene.add(hemisphereLight)
    scene.add(shadowLight)
    scene.add(ambientLight)
}

function createScene() {
    HEIGHT = window.innerHeight
    WIDTH = window.innerWidth
    scene = new THREE.Scene()
    aspectRatio = WIDTH / HEIGHT
    fieldOfView = 50
    nearActor = 0.1
    farActor = 10000
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearActor,
        farActor
    )
    scene.fog = new THREE.Fog(Colors.white, 100, 950)
    camera.position.x = 0
    camera.position.z = 750
    camera.position.y = 0
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    renderer.shadowMap.enabled = true
    container = document.getElementById('world')
    container.appendChild(renderer.domElement)
    window.addEventListener('resize', handleWindowResize, false)
}

function Sun() {
    const geometry = new THREE.SphereGeometry(400, 32, 32)
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
    geometry.mergeVertices()
    const l = geometry.vertices.length
    this.flares = []
    for (let i = 0; i < l; i++) {
        const v = geometry.vertices[i]
        this.flares.push({
            y: v.y,
            x: v.x,
            z: v.z,
            ang: Math.random() * Math.PI * 2,
            amp: world.coronaMinAmp + Math.random() * (world.coronaMaxAmp - world.coronaMinAmp),
            speed: world.coronaMinSpeed + Math.random() * (world.coronaMaxSpeed - world.coronaMinSpeed)
        })
    }
    const material = new THREE.MeshBasicMaterial({ color: Colors.yellow })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.name = 'flares'
    this.mesh.receiveShadow = true
}

Sun.prototype.moveCorona = function moveCorona() {
    const verts = this.mesh.geometry.vertices
    const l = verts.length
    for (let i = 0; i < l; i++) {
        const v = verts[i]
        const vprops = this.flares[i]
        v.x = vprops.x + Math.sin(vprops.ang) * vprops.amp
        v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp
        vprops.ang = vprops.ang + (vprops.speed * deltaTime)
        this.mesh.geometry.verticesNeedUpdate = true
    }
}

function createSun() {
    sun = new Sun()
    sun.mesh.position.y = world.coronaRadius - 100
    scene.add(sun.mesh)
}

function loop() {
    newTime = new Date().getTime()
    deltaTime = newTime - oldTime
    oldTime = newTime
    sun.mesh.rotation.y = sun.mesh.rotation.y + (world.speed * deltaTime) // *game.seaRotationSpeed;
    if (sun.mesh.rotation.y > 2 * Math.PI) {
        sun.mesh.rotation.y = sun.mesh.rotation.y - (2 * Math.PI)
    }
    // ambientLight.intensity = ambientLight.intensity + ((0.5 - ambientLight.intensity) * deltaTime * 0.005)
    sun.moveCorona()
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}

export function initSunHero(event) {
    reset()
    createScene()
    //createLights()
    createSun()
    setTimeout(loop, 3000)
}
