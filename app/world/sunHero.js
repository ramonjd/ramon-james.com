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
let Sun
const Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    brownDark:0x23190f,
    pink:0xF5986E,
    yellow:0xf4ce93,
    blue:0x68c3c0
}
let world
let deltaTime = 0
let newTime = new Date().getTime()
let oldTime = new Date().getTime()
let zoomFactor = 1
let zoomIncrement = -0.001

function reset() {
    world = {
        terrainRadius: 800,
        terrainLength: 800,
        coronaMinAmp: 5,
        coronaMaxAmp: 20,
        coronaMinSpeed: 0.0005,
        coronaMaxSpeed: 0.002,
        speed: 0,
        cameraSensivity:0.002,
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
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
    ambientLight = new THREE.AmbientLight(0xFFEDB9, .5)
    shadowLight = new THREE.DirectionalLight(0xffffff, .9)
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
    let ch = new THREE.CameraHelper(shadowLight.shadow.camera)
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
    nearActor = .1
    farActor = 10000
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearActor,
        farActor
    )
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)
    camera.position.x = 0
    camera.position.z = 3000
    camera.position.y = 0
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    renderer.shadowMap.enabled = true
    container = document.getElementById('world')
    container.appendChild(renderer.domElement)
    window.addEventListener('resize', handleWindowResize, false)
}

Sun = function() {
    let geometry = new THREE.SphereGeometry(400, 32, 32)
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
    geometry.mergeVertices()
    let l = geometry.vertices.length
    this.flares = []
    for (let i=0; i<l; i++){
        let v = geometry.vertices[i]
        this.flares.push({
            y: v.y,
            x: v.x,
            z: v.z,
            ang: Math.random() * Math.PI * 2,
            amp: world.coronaMinAmp + Math.random() * (world.coronaMaxAmp - world.coronaMinAmp),
            speed: world.coronaMinSpeed + Math.random() * (world.coronaMaxSpeed - world.coronaMinSpeed)
        })
    }
    let material = new THREE.MeshBasicMaterial( {color: Colors.red} )
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.name = 'flares'
    this.mesh.receiveShadow = true
}

Sun.prototype.moveCorona = function (){
    let verts = this.mesh.geometry.vertices
    let l = verts.length
    for (let i=0; i<l; i++){
        let v = verts[i]
        let vprops = this.flares[i]
        v.x =  vprops.x + Math.sin(vprops.ang) * vprops.amp
        v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp
        vprops.ang += vprops.speed * deltaTime
        this.mesh.geometry.verticesNeedUpdate = true
    }
}

function createSun() {
    sun = new Sun()
    sun.mesh.position.y = world.coronaRadius
    scene.add(sun.mesh)
}

function loop(){
    newTime = new Date().getTime()
    deltaTime = newTime - oldTime
    oldTime = newTime
    if (camera.position.z > 1000) {
        camera.position.z -= 100
    }
    camera.updateProjectionMatrix()
    ambientLight.intensity += (.5 - ambientLight.intensity) * deltaTime * 0.005
    sun.moveCorona()
    if ( zoomFactor >= 0.98 ) {
        camera.fov = camera.fov * zoomFactor
        camera.updateProjectionMatrix()
        zoomFactor += zoomIncrement
    }
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}

export function initSunHero(event) {
    reset()
    createScene()
    createLights()
    createSun()
    setTimeout(loop, 3000)
}
