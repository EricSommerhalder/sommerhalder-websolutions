// Create the scene
const scene = new THREE.Scene();

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Update the cube's orientation based on cursor position
function updateOrientation(event) {
  const { clientX, clientY } = event;
  const { innerWidth, innerHeight } = window;

  // Calculate normalized device coordinates (NDC)
  const x = (clientX / innerWidth) * 2 - 1;
  const y = -(clientY / innerHeight) * 2 + 1;

  // Convert NDC to 3D world coordinates
  const mouse = new THREE.Vector3(x, y, 0.5);
  mouse.unproject(camera);

  // Calculate the direction from the camera to the mouse position
  const dir = mouse.sub(camera.position).normalize();

  // Set the cube's orientation based on the direction
  cube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
}

// Add event listener to update the cube's orientation on mouse movement
window.addEventListener('mousemove', updateOrientation);

// Check for gyro sensor support
if (window.DeviceOrientationEvent) {
  // Handle device orientation changes
  function handleOrientation(event) {
    const { gamma, beta } = event;
    const angleX = gamma / 90; // Normalize gamma values to range [-1, 1]
    const angleY = beta / 90; // Normalize beta values to range [-1, 1]

    // Rotate the cube based on the device orientation
    cube.rotation.x = angleY;
    cube.rotation.y = angleX;
  }

  // Add event listener to handle device orientation changes
  window.addEventListener('deviceorientation', handleOrientation);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();