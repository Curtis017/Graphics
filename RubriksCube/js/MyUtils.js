// Global Graphic Content
var GC = {}
GC.scene = new THREE.Scene();
GC.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
GC.renderer = new THREE.WebGLRenderer();
GC.raycaster = new THREE.Raycaster();
GC.mouse = new THREE.Vector2();
GC.pivot = new THREE.Object3D();
GC.cubesSelected = [];
GC.choice = 0;
GC.counter = 0;
GC.rotatingLock = false;

// Once objects are created and added draw everything
var draw = function () {
  GC.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( GC.renderer.domElement );

  GC.camera.position.x = 3;
  GC.camera.position.y = 3;
  GC.camera.position.z = 3;
  GC.camera.lookAt(new THREE.Vector3(0,0,0));
  render();
};

// Main loop that keeps displaying objects
var render = function () {
  requestAnimationFrame( render );

  // Rotates the object slowly
  if (GC.counter > 0) {
    rotateAroundPivot();
    GC.counter--;
    // Finished rotating
    if (GC.counter <= 0) {
      resetScene();
      GC.rotatingLock = false;
    }
  }

  GC.renderer.render(GC.scene, GC.camera);
};

var setCubes = function () {
  GC.pivot.rotation.set( 0, 0, 0 );
  GC.pivot.updateMatrixWorld();
  for (var i = 0; i < GC.cubesSelected.length; i++) {
    THREE.SceneUtils.attach( GC.cubesSelected[ i ], GC.scene, GC.pivot );
  }
};

var resetScene = function () {
  GC.pivot.updateMatrixWorld();
  for (var i = 0; i < GC.cubesSelected.length; i++) {
    GC.cubesSelected[i].updateMatrixWorld();
    THREE.SceneUtils.detach( GC.cubesSelected[ i ], GC.pivot, GC.scene );
  }
  GC.cubesSelected = [];
};

var rotateAroundPivot = function() {
  switch (GC.choice % 3) {
    case 0:
      GC.pivot.rotation.z += (Math.PI/2)/20;
      break;
    case 1:
      GC.pivot.rotation.x += (Math.PI/2)/20;
      break;
    case 2:
      GC.pivot.rotation.y += (Math.PI/2)/20;
      break;
  }
};

var setSelectedCubes = function(clickedCubePosition) {
  switch (GC.choice % 3) {
    // Rotate Z
    case 0:
      for (var i = 2; i < 29; i++) {
        if (Math.trunc(GC.scene.children[i].position.z) === Math.trunc(clickedCubePosition.z)) {
          GC.cubesSelected.push(GC.scene.children[i]);
        }
      }
      break;
    // Rotate X
    case 1:
      for (var i = 2; i < 29; i++) {
        if (Math.trunc(GC.scene.children[i].position.x) === Math.trunc(clickedCubePosition.x)) {
          GC.cubesSelected.push(GC.scene.children[i]);
        }
      }
      break;
    // Rotate Y
    case 2:
      for (var i = 2; i < 29; i++) {
        if (Math.trunc(GC.scene.children[i].position.y) === Math.trunc(clickedCubePosition.y)) {
          GC.cubesSelected.push(GC.scene.children[i]);
        }
      }
      break;
  }
  GC.counter = 20;
  setCubes();
};
