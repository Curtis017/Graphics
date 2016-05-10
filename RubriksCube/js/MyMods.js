$(document).ready(function(){

  // Rotates selection of cubes
  $("body").on("click", function(){
    if (!GC.rotatingLock) {

      GC.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      GC.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      // update the picking ray with the camera and mouse position
      GC.raycaster.setFromCamera( GC.mouse, GC.camera );

      // calculate objects intersecting the picking ray
      // var intersects = GC.raycaster.intersectObjects( GC.scene.children );
      var objects = [];
      GC.scene.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { objects.push(node);}});

      var intersects = GC.raycaster.intersectObjects( objects );
      if (intersects.length > 0) {
        GC.rotatingLock = true;
        setSelectedCubes(intersects[0].object.position);
      }
    }
  });

  // Switches which way to rotate
  $("body").on("keypress", function(){
    if (!GC.rotatingLock){
      GC.choice++;
    }
  });

});
