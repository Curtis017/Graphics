$(document).ready(function(){

  // Changes Color of object you clicked
  $("body").on("click", function(){
    GC.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    GC.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    GC.raycaster.setFromCamera( GC.mouse, GC.camera );

    // calculate objects intersecting the picking ray
    var intersects = GC.raycaster.intersectObjects( firstRow.children );
    if (intersects.length > 0) {
      intersects[ 0 ].object.material.color.set( getRandomColor() );
    }

    // for ( var i = 0; i < intersects.length; i++ ) {
    //   intersects[ i ].object.material.color.set( getRandomColor() );
    // }
  });

});
