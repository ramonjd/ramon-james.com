var scene;
var HEIGHT;
var WIDTH;
var aspectRatio;
var fieldOfView;
var nearPlane;
var farPlane;
var camera;
var renderer;
var container;
var ambientLight;
var hemisphereLight;
var shadowLight;
var terrain;
var newTime;
var deltaTime;
var oldTime;
var Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    brownDark:0x23190f,
    pink:0xF5986E,
    yellow:0xf4ce93,
    blue:0x68c3c0
};
var terrainRadius;
var terrainLength;
var wavesMinAmp;
var wavesMaxAmp;
var wavesMinSpeed;
var wavesMaxSpeed;
var speed;
var planeDefaultHeight;

function reset() {
    terrainRadius = 600;
    terrainLength = 800;
    wavesMinAmp = 5;
    wavesMaxAmp = 20;
    wavesMinSpeed = 0.001;
    wavesMaxSpeed = 0.003;
    speed = 0;
    planeDefaultHeight = 100;
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function Terrain() {
  var geom = new THREE.CylinderGeometry(terrainRadius, terrainRadius, terrainLength, 40, 10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  geom.mergeVertices();
  var l = geom.vertices.length;
  this.waves = [];

  for (var i=0; i<l; i++){
    var v = geom.vertices[i];
    //v.y = Math.random()*30;
    this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: wavesMinAmp + Math.random() * (wavesMaxAmp - wavesMinAmp),
        speed: wavesMinSpeed + Math.random() * (wavesMaxSpeed - wavesMinSpeed)
    });
  };
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.red,
    transparent: true,
    opacity: .8,
    shading: THREE.FlatShading
  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.name = 'waves';
  this.mesh.receiveShadow = true;
}

Terrain.prototype.moveWaves = function (){
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  for (var i=0; i<l; i++){
    var v = verts[i];
    var vprops = this.waves[i];
    v.x =  vprops.x + Math.cos(vprops.ang)*vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;
    vprops.ang += vprops.speed*deltaTime;
    this.mesh.geometry.verticesNeedUpdate=true;
  }
}

function createTerrain() {
  terrain = new Terrain();
  terrain.mesh.position.y = -terrainRadius;
  scene.add(terrain.mesh);
}

function createLights() {

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  ambientLight = new THREE.AmbientLight(0xdc8874, .5);
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 4096;
  shadowLight.shadow.mapSize.height = 4096;
  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);
  // scene.add(ch);
  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);

}


function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = .1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = planeDefaultHeight;
  //camera.lookAt(new THREE.Vector3(0, 400, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', handleWindowResize, false);

  /*
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = -Math.PI / 2;
  controls.maxPolarAngle = Math.PI ;

  //controls.noZoom = true;
  //controls.noPan = true;
  //
  */
}

function loop(){
  newTime = new Date().getTime();
  deltaTime = newTime - oldTime;
  oldTime = newTime;
  terrain.mesh.rotation.z += speed * deltaTime; //*game.seaRotationSpeed;
  if (terrain.mesh.rotation.z > 2 * Math.PI) {
      terrain.mesh.rotation.z -= 2 * Math.PI;
  }
  ambientLight.intensity += (.5 - ambientLight.intensity) * deltaTime * 0.005;
  terrain.moveWaves();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function init(event){
    reset();
    createScene();
    createLights();
    createTerrain();

    setTimeout(loop, 1000);
}

window.addEventListener('load', init, false);
