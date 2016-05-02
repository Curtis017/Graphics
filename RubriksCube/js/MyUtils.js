// Global Graphic Content
var GC = {}
GC.scene = new THREE.Scene();
GC.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
GC.renderer = new THREE.WebGLRenderer();
GC.raycaster = new THREE.Raycaster();
GC.mouse = new THREE.Vector2();
GC.pivot = new THREE.Object3D();
GC.cubesSelected = [];
GC.meshes = [];
GC.objects = [];
GC.choice = 0;

// Once objects are created and added draw everything
var draw = function () {
  GC.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( GC.renderer.domElement );

  GC.camera.position.z = 3;
  GC.camera.position.y = 3;
  GC.camera.position.x = 3;
  GC.camera.lookAt(new THREE.Vector3(0,0,0));
  render();
}

// Main loop that keeps displaying objects
var render = function () {
  requestAnimationFrame( render );

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

var setCubes = function () {
  GC.pivot.rotation.set( 0, 0, 0 );
  GC.pivot.updateMatrixWorld();
  for (var i = 0; i < GC.cubesSelected.length; i++) {
    THREE.SceneUtils.attach( GC.cubesSelected[ i ], GC.scene, GC.pivot );
  }
}

var setScene = function () {
  GC.pivot.updateMatrixWorld();
  for (var i = 0; i < GC.cubesSelected.length; i++) {
    GC.cubesSelected[i].updateMatrixWorld();
    THREE.SceneUtils.detach( GC.cubesSelected[ i ], GC.pivot, GC.scene );
  }
  GC.cubesSelected = [];
}

var setCubesSelectedZ = function (clickedCubeZValue){
  for (var i = 2; i < 29; i++) {
    if (Math.round((GC.scene.children[i].position.z)*100)/100 === clickedCubeZValue) {
      GC.cubesSelected.push(GC.scene.children[i]);
    }
  }
}

var setCubesSelectedX = function (clickedCubeXValue){
  for (var i = 2; i < 29; i++) {
    if (Math.round((GC.scene.children[i].position.x)*100)/100 === clickedCubeXValue) {
      GC.cubesSelected.push(GC.scene.children[i]);
    }
  }
}

var setCubesSelectedY = function (clickedCubeYValue){
  for (var i = 2; i < 29; i++) {
    if (Math.round((GC.scene.children[i].position.y)*100)/100 === clickedCubeYValue) {
      GC.cubesSelected.push(GC.scene.children[i]);
    }
  }
}
