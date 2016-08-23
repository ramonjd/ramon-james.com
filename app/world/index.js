var scene;
var HEIGHT;
var WIDTH;
var aspectRatio;
var fieldOfView;
var nearActor;
var farActor;
var camera;
var renderer;
var container;
var controls;
var ambientLight;
var hemisphereLight;
var shadowLight;
var sun;
var Sun;
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
var world;
var deltaTime = 0;
var deltaTime = 0;
var newTime = new Date().getTime();
var oldTime = new Date().getTime();
var mousePos = { x: 0, y: 0 };
var zoomFactor = 1;
var zoomIncrement = -0.001;

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
    };
}

function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
    var tx = -1 + (event.clientX / WIDTH)*2;
    var ty = 1 - (event.clientY / HEIGHT)*2;
    mousePos = { x: tx, y: ty };
}

function handleTouchMove(event) {
    event.preventDefault();
    var tx = -1 + (event.touches[0].pageX / WIDTH)*2;
    var ty = 1 - (event.touches[0].pageY / HEIGHT)*2;
    mousePos = { x: tx, y: ty };
}

function normalize(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
  ambientLight = new THREE.AmbientLight(0xFFEDB9, .5);
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
  nearActor = .1;
  farActor = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearActor,
    farActor
    );
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  camera.position.x = 0;
  camera.position.z = 3000;
  camera.position.y = 0;
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

Sun = function() {
  //var geometry = new THREE.CylinderGeometry(world.terrainRadius, world.terrainRadius, world.terrainLength, 40, 10);
  var geometry = new THREE.SphereGeometry(400, 32, 32)
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  geometry.mergeVertices();
  var l = geometry.vertices.length;
  this.flares = [];
  for (var i=0; i<l; i++){
    var v = geometry.vertices[i];
    //v.y = Math.random()*30;
    this.flares.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: world.coronaMinAmp + Math.random() * (world.coronaMaxAmp - world.coronaMinAmp),
        speed: world.coronaMinSpeed + Math.random() * (world.coronaMaxSpeed - world.coronaMinSpeed)
    });
  };
  var material = new THREE.MeshBasicMaterial( {color: Colors.red} );

  // var material = new THREE.MeshPhongMaterial({
  //   color: Colors.red,
  //   transparent: true,
  //   opacity: .8,
  //   shading: THREE.FlatShading
  // });

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.name = 'flares';
  this.mesh.receiveShadow = true;
}

Sun.prototype.moveCorona = function (){
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  for (var i=0; i<l; i++){
    var v = verts[i];
    var vprops = this.flares[i];
    v.x =  vprops.x + Math.sin(vprops.ang) * vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
    vprops.ang += vprops.speed * deltaTime;
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}

function createSun() {
  sun = new Sun();
  //terrain.mesh.position.y = world.terrainRadius;
  sun.mesh.position.y = 400;
  scene.add(sun.mesh);
}



function loop(){
  newTime = new Date().getTime();
  deltaTime = newTime - oldTime;
  oldTime = newTime;
  // sun.mesh.rotation.z += world.speed * deltaTime; //*game.seaRotationSpeed;
  // if (sun.mesh.rotation.z > 2 * Math.PI) {
  //     sun.mesh.rotation.z -= 2 * Math.PI;
  // }
  if (camera.position.z > 1000) {
      camera.position.z -= 100;
  }



  camera.updateProjectionMatrix();
  ambientLight.intensity += (.5 - ambientLight.intensity) * deltaTime * 0.005;
  sun.moveCorona();


  if ( zoomFactor >= 0.98 ){
      camera.fov = camera.fov * zoomFactor;
      camera.updateProjectionMatrix();
      zoomFactor += zoomIncrement;
   }
   renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

function init(event){
    reset();
    createScene();
    createLights();
    createSun();
    setTimeout(loop, 1000);
}

window.addEventListener('load', init, false);
