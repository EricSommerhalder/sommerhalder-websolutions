// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Create the camera
/*
let width = window.innerWidth; // or any other width
let height = window.innerHeight; // or any other height

// Parameters for the perspective camera are (fov, aspect, near, far)
let camera = new THREE.PerspectiveCamera(
    75,           // Field of View
    width / height, // Aspect ratio
    0.1,           // Near plane
    1000          // Far plane
);

camera.position.set(0, 0, 5);
*/
let aspectRatio = window.innerWidth / window.innerHeight;
let viewSize = 10; // This is the height of your viewing area. Adjust as needed.

// Create the camera
let camera = new THREE.OrthographicCamera(
  (-aspectRatio * viewSize) / 2, // left
  (aspectRatio * viewSize) / 2,  // right
  viewSize / 2,                  // top
  viewSize / -2,                 // bottom
  -100,                          // near plane
  100                            // far plane
);

camera.position.set(0, 0, 10); // Adjust this so your model is in view
// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let object;

// Load the OBJ file
const loader = new THREE.ObjectLoader();
loader.load(
  'https://raw.githubusercontent.com/EricSommerhalder/sommerhalder-websolutions/main/assets/model-3.json',
  function ( obj ) {
    // Add the loaded object to the scene
    /*obj.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material = new THREE.MeshBasicMaterial({color: 0xff0000}); // Apply material here
        console.log('Added');
			}
		} );*/
    object = obj;
    scene.add( obj );

},
function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},
function ( err ) {
    console.error( 'An error happened' );
}
);

// Render the scene
function animate() {
requestAnimationFrame( animate );
if (object) {
  object.rotation.x = mouse.y * 0.5;
  object.rotation.y = -mouse.x * 0.5;
}

renderer.render( scene, camera );
}

let mouse = new THREE.Vector2();

window.addEventListener('mousemove', handleMouseMove, false);

function handleMouseMove(event) {
    // here we're converting the mouse position from (-1 to 1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

animate();
window.addEventListener('deviceorientation', handleDeviceOrientation, false);

function handleDeviceOrientation(event) {
    // event.alpha is the compass direction the device is facing in degrees
    // event.beta is the device front/back tilt in degrees (-180, 180)
    // event.gamma is the device left/right tilt in degrees (-90, 90)
    if (object) {
        object.rotation.y = THREE.Math.degToRad(event.beta);  // front/back tilt
        object.rotation.x = THREE.Math.degToRad(event.gamma); // left/right tilt
    }
}
  /*function (loadedObject) {
    // Position, scale, or manipulate the loaded object as needed
    object = loadedObject;
    object.position.set(-10, -10, 1);
    object.scale.set(1, 1, 1);

    const rotationAngle = Math.PI / 4;
    object.rotation.y = rotationAngle;

    scene.add(object);
    console.log(object);

    // Render the scene after loading the object
    renderer.render(scene, camera);
  },
  function (xhr) {
    // Progress callback
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    // Error callback
    console.error('An error occurred while loading the OBJ file', error);
  }
);

// Update the object's orientation based on cursor position or device tilt
function updateOrientation(event) {
  let x, y;
  if (event.type === 'mousemove') {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    x = (clientX / innerWidth) * 2 - 1;
    y = -(clientY / innerHeight) * 2 + 1;
  } else if (event.type === 'deviceorientation') {
    const { gamma, beta } = event;
    x = gamma / 90; // Normalize gamma values to range [-1, 1]
    y = beta / 90; // Normalize beta values to range [-1, 1]
  }

  // Limit the cube's tilt angles
  const maxTiltAngle = Math.PI / 4; // Maximum tilt angle in radians
  const tiltAngleX = x* maxTiltAngle;
  const tiltAngleY = y* maxTiltAngle;
  if (object){
    object.rotation.x = -tiltAngleY;
    //object.rotation.y = tiltAngleX;
  }
  /*const clampedX = THREE.MathUtils.clamp(x, -maxTiltAngle, maxTiltAngle);
  const clampedY = THREE.MathUtils.clamp(y, -maxTiltAngle, maxTiltAngle);

  // Convert NDC to 3D world coordinates
  const mouse = new THREE.Vector3(clampedX, clampedY, 0.5);
  mouse.unproject(camera);

  // Calculate the direction from the camera to the mouse position
  const dir = mouse.sub(camera.position).normalize();

  // Set the object's orientation based on the direction
  if (object) {
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
  }
}

// Add event listeners to update the object's orientation
window.addEventListener('mousemove', updateOrientation);
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', updateOrientation);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
*/