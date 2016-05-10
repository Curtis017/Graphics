// Global Graphic Content
var GC = {}
GC.scene = new THREE.Scene();
GC.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
GC.renderer = new THREE.WebGLRenderer();
GC.raycaster = new THREE.Raycaster();
GC.mouse = new THREE.Vector2();
GC.pivot = new THREE.Object3D();
GC.rotateSpeed = 20;
GC.cubesSelected = [];
GC.choice = 0;
GC.counter = 0;
GC.rotatingLock = false;
GC.controls = null;

// Once objects are created and added draw everything
var draw = function () {
  GC.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( GC.renderer.domElement );

  GC.camera.position.x = 3;
  GC.camera.position.y = 3;
  GC.camera.position.z = 3;
  GC.camera.lookAt(new THREE.Vector3(0,0,0));

  // Add OrbitControls so that we can pan around with the mouse.
  GC.controls = new THREE.OrbitControls(GC.camera, GC.renderer.domElement);

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
  GC.controls.update();
};

// attaches selected group to the pivot
var setCubes = function () {
  GC.pivot.rotation.set( 0, 0, 0 );
  GC.pivot.updateMatrixWorld();
  for (var i = 0; i < GC.cubesSelected.length; i++) {
    THREE.SceneUtils.attach( GC.cubesSelected[ i ], GC.scene, GC.pivot );
  }
};

// adds cubes back to the scene
var resetScene = function () {
  GC.pivot.updateMatrixWorld();
  for (var i = 0; i < GC.cubesSelected.length; i++) {
    GC.cubesSelected[i].updateMatrixWorld();
    THREE.SceneUtils.detach( GC.cubesSelected[ i ], GC.pivot, GC.scene );
  }
  GC.cubesSelected = [];
};

// Rotates the pivot around the desired axis
var rotateAroundPivot = function() {
  switch (GC.choice % 3) {
    case 0:
      GC.pivot.rotation.z += (Math.PI/2)/GC.rotateSpeed;
      break;
    case 1:
      GC.pivot.rotation.x += (Math.PI/2)/GC.rotateSpeed;
      break;
    case 2:
      GC.pivot.rotation.y += (Math.PI/2)/GC.rotateSpeed;
      break;
  }
};

// Sets an array with the selected group of cubes
var setSelectedCubes = function(clickedCubePosition) {
  GC.scene.traverse( function( node ) {
    if ( node instanceof THREE.Mesh ) {
      switch(GC.choice % 3) {
        case 0:
        if (Math.trunc(node.position.z) === Math.trunc(clickedCubePosition.z)) {
          GC.cubesSelected.push(node);
        }
        break;
        case 1:
        if (Math.trunc(node.position.x) === Math.trunc(clickedCubePosition.x)) {
          GC.cubesSelected.push(node);
        }
        break;
        case 2:
        if (Math.trunc(node.position.y) === Math.trunc(clickedCubePosition.y)) {
          GC.cubesSelected.push(node);
        }
        break;
      }
    }
  });
  GC.counter = GC.rotateSpeed;
  setCubes();
};

// Creates a cube mesh (rubrik's colors)
var getCubeMesh = function () {
  var materials = [
			    new THREE.MeshPhongMaterial({
			        color: 0x009E60}),	//Green
			    new THREE.MeshPhongMaterial({
			        color: 0xffffff}),	//White
			    new THREE.MeshPhongMaterial({
			        color: 0x0051BA}),	//Blue
			    new THREE.MeshPhongMaterial({
			        color: 0xC41E3A}),	//Red
			    new THREE.MeshPhongMaterial({
			        color: 0xFFD500}),	//Yellow
			    new THREE.MeshPhongMaterial( {
			        color: 0xFF5800})		//Orange
	];

	var material = new THREE.MeshFaceMaterial(materials);
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var cube = new THREE.Mesh( geometry, material );
  return cube;
}
