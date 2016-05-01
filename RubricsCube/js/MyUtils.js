// Global Graphic Content
var GC = {}
GC.scene = new THREE.Scene();
GC.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
GC.renderer = new THREE.WebGLRenderer();
GC.raycaster = new THREE.Raycaster();
GC.mouse = new THREE.Vector2();
GC.objects = [];

// Once objects are created and added draw everything
var draw = function () {
  GC.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( GC.renderer.domElement );

  for (var i = 0; i < GC.objects.length; i++) {
    GC.scene.add( GC.objects[i] );
  }

  GC.camera.position.z = 5;
  GC.camera.position.x = 5;
  GC.camera.position.y = 5;
  GC.camera.lookAt(new THREE.Vector3(0,0,0));
  render();
}

// Main loop that keeps displaying objects
var render = function () {
  requestAnimationFrame( render );

  // Rotation animation
  for (var i = 0; i < GC.objects.length; i++) {
    GC.objects[i].rotation.y += 0.01;
    GC.objects[i].rotation.x += 0.01;

    // Rotate if the parent has been clicked
    if (GC.objects[i].rotateAmount > 0.0) {
      GC.objects[i].rotation.z += (Math.PI/2)/20;
      GC.objects[i].rotateAmount -= (Math.PI/2)/20;
    } else {GC.objects[i].rotateAmount = 0.0;}
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
