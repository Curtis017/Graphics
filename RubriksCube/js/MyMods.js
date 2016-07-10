$(document).ready(function(){

  // start the program
  start();
  createHUD();

  // Rotates selection of cubes
  $("#rubriksCube").on("click", function(){
    if (!GC.rotationLock) {

      // Get the x and y coordinates of the mouse relative to the container
      GC.mouse.x = ( (event.clientX - $(this).position().left) / GC.canvas.offsetWidth ) * 2 - 1;
      GC.mouse.y = - ( (event.clientY - $(this).position().top) / GC.canvas.offsetHeight ) * 2 + 1;

      // update the picking ray with the camera and mouse position
      GC.raycaster.setFromCamera( GC.mouse, GC.camera );

      // calculate objects intersecting the picking ray
      var objects = [];
      GC.scene.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { objects.push(node);}});

      // set the cubes that are effected by the rotation
      var intersects = GC.raycaster.intersectObjects( objects );
      if (intersects.length > 0) {
        GC.rotationLock = true;
        setSelectedCubes(intersects[0].object.position);
      }
    }
  });

  // Resizing Window
  $(window).resize(function(){
    GC.camera.aspect = GC.canvas.offsetWidth / GC.canvas.offsetHeight;
    GC.camera.updateProjectionMatrix();

    GC.renderer.setSize( GC.canvas.offsetWidth, GC.canvas.offsetHeight );
  });

});
