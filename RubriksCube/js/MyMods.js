$(document).ready(function(){

  // start the program
    start();

  // Rotates selection of cubes
  $("#rubriksCube").on("click", function(){
    if (!GC.rotationLock) {

      GC.mouse.x = ( event.clientX / GC.canvas.offsetWidth ) * 2 - 1;
      GC.mouse.y = - ( event.clientY / GC.canvas.offsetHeight ) * 2 + 1;

      // update the picking ray with the camera and mouse position
      GC.raycaster.setFromCamera( GC.mouse, GC.camera );

      // calculate objects intersecting the picking ray
      // var intersects = GC.raycaster.intersectObjects( GC.scene.children );
      var objects = [];
      GC.scene.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { objects.push(node);}});

      var intersects = GC.raycaster.intersectObjects( objects );
      if (intersects.length > 0) {
        GC.rotationLock = true;
        setSelectedCubes(intersects[0].object.position);
      }
    }
  });

  // Switches which way to rotate
  $("body").on("keypress", function(key){
    console.log(key.keyCode);
    if (!GC.rotationLock) {
      if (key.keyCode === 115) {  // s key
        GC.rotationDirection++;
      }
      else if (key.keyCode === 114){
        resetCamera();
      }
      else { // any other key
        GC.choice++;
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
