$(document).ready(function(){

  // Changes Color of object you clicked
  $("body").on("click", function(){
    if (!GC.rotating) {

      GC.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      GC.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      // update the picking ray with the camera and mouse position
      GC.raycaster.setFromCamera( GC.mouse, GC.camera );

      // calculate objects intersecting the picking ray
      var intersects = GC.raycaster.intersectObjects( GC.scene.children );
      if (intersects.length > 0) {
        console.log(intersects[0].object.position);
        if (GC.choice % 3 === 0) {
          console.log("Here1");
          GC.rotating = true;
          setCubesSelectedZ(intersects[0].object.position.z);
          setCubes();
          GC.rotateAmount = 20;
          // GC.pivot.rotation.z += Math.PI/2;
          // setScene();
        }
        else if (GC.choice % 3 === 1) {
          console.log("Here2");
          GC.rotating = true;
          setCubesSelectedX(intersects[0].object.position.x);
          setCubes();
          GC.rotateAmount = 20;
          // GC.pivot.rotation.x += Math.PI/2;
          // setScene();
        } else {
          GC.rotating = true;
          console.log("Here3");
          setCubesSelectedY(intersects[0].object.position.y);
          setCubes();
          GC.rotateAmount = 20;
          // GC.pivot.rotation.y += Math.PI/2;
          // setScene();
        }

      }
    }
  });

  $("body").on("keypress", function(){
    GC.choice++;
  });

});
