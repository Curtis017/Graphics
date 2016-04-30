// Global Graphic Content
var GC = {}
GC.scene = new THREE.Scene();
GC.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
GC.renderer = new THREE.WebGLRenderer();
GC.raycaster = new THREE.Raycaster();
GC.mouse = new THREE.Vector2();
GC.meshes = [];
GC.objects = [];

// Once objects are created and added draw everything
var draw = function () {
  GC.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( GC.renderer.domElement );

  for (var i = 0; i < GC.meshes.length; i++) {
    GC.scene.add( GC.meshes[i] );
  }

  for (var i = 0; i < GC.objects.length; i++) {
    GC.scene.add( GC.objects[i] );
  }

  GC.camera.position.z = 10;
  render();
}

// Main loop that keeps displaying objects
var render = function () {
  requestAnimationFrame( render );

  // Rotation animation
  for (var i = 0; i < GC.objects.length; i++) {
    GC.objects[i].rotation.z += 0.01;
    GC.objects[i].rotation.x += 0.01;
  }

  GC.renderer.render(GC.scene, GC.camera);
};

// Add light to the scene
var addLight = function (light) {
  GC.scene.add(light);
}

// Add mesh to the scene
var addMesh = function (mesh) {
  GC.meshes.push(mesh);
}
