
// Add light
var light = new THREE.AmbientLight( 0xFFFFFF ); // white light
GC.scene.add(light);
GC.scene.add(GC.pivot);

// Create cubes and set position
for (var k = -1; k < 2; k++) {			// z
  for (var i = -1; i < 2; i++) {		// y
    for (var j = -1; j < 2; j++) {	// x

      // Create objects
      var cube = getCubeMesh();
      var edges = new THREE.EdgesHelper( cube, 0x000000 );

      // Set attributes
      edges.material.linewidth = 3;
      cube.position.x = j;
      cube.position.y = i;
      cube.position.z = k;

      // Add to the scene
      GC.scene.add(cube);
      GC.scene.add(edges);
    }
  }
}

console.log("s - switch rotation direction.");
console.log("a - switch rotation axis.");
