/* MadLittle Mods */
MM = {};
MM.isDragging = false;
MM.previousMousePosition = {
  x: 0,
  y: 0
};

$(GC.renderer.domElement).on('mousedown', function(e) {
    MM.isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-MM.previousMousePosition.x,
        y: e.offsetY-MM.previousMousePosition.y
    };

    if(MM.isDragging) {

        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));

        GC.scene.traverse( function( node ) {
          if ( node instanceof THREE.Mesh ) {
            GC.camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, GC.camera.quaternion);
          }
        });
    }

    MM.previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

$(document).on('mouseup', function(e) {
    MM.isDragging = false;
});

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}
/* MadLittle Mods */
