$(document).ready(function(){

  // Changes Color of object you clicked
  $("body").on("click", function(){
    GC.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    GC.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    GC.raycaster.setFromCamera( GC.mouse, GC.camera );

    var intersects = [];
    for (var i = 0; i < GC.objects.length; i++) {
      intersects.push( GC.raycaster.intersectObjects( GC.objects[i].children ) );
    }

    //Find and change closest object
    var closestObject = null;
    for (var i = 0; i < intersects.length; i++) {
      if (intersects[i].length > 0) {
        if(!closestObject){closestObject = intersects[i][0];}
        else if (closestObject.distance > intersects[i][0].distance) {closestObject = intersects[i][0];}
      }
    }
    if (closestObject) {
      // closestObject.object.material.color.set( getRandomColor() );
      // console.log(closestObject);
      // closestObject.object.rotation.z += 0.1;
      closestObject.object.parent.rotateAmount += Math.PI/2;
    }

  });

});
