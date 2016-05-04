// Factory contains regularly used objects and components so I dont have to re-write them
// Call the get function to create a component from the factory

// Creates a cube mesh
var getCubeMesh = function () {
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var cube = new THREE.Mesh( geometry, GC.materials );
  return cube;
}

// Creates a sphere mesh
var getSphereMesh = function () {
  var geometry = new THREE.SphereGeometry(1, 30, 30);
  var material = new THREE.MeshPhongMaterial({color: getRandomColor()});
  var sphere = new THREE.Mesh( geometry, material );
  return sphere
}

// Creates a point light
var getPointLight = function (x, y, z, color) {
  var pointLight = new THREE.PointLight(color);

  // set its position
  pointLight.position.x = x;
  pointLight.position.y = y;
  pointLight.position.z = z;

  return pointLight;
}

// Generates a random color
var getRandomColor = function () {
  return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}
