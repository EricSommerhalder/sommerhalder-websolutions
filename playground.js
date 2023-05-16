// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let object;
// Load the OBJ file
const loader = new THREE.ObjectLoader();
loader.load(
  'assets/12221_Cat_v1_l3.obj',
  function (object) {
    // Position, scale, or manipulate the loaded object as needed
    object.position.set(0, 0, 0);
    object.scale.set(1, 1, 1);
    scene.add(object);
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
    const clampedX = THREE.MathUtils.clamp(x, -maxTiltAngle, maxTiltAngle);
    const clampedY = THREE.MathUtils.clamp(y, -maxTiltAngle, maxTiltAngle);
  
    // Convert NDC to 3D world coordinates
    const mouse = new THREE.Vector3(clampedX, clampedY, 0.5);
    mouse.unproject(camera);
  
    // Calculate the direction from the camera to the mouse position
    const dir = mouse.sub(camera.position).normalize();
  
    // Set the object's orientation based on the direction
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
  
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