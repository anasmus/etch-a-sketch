const container = document.getElementById('container');
updateHeight();
window.addEventListener('resize', updateHeight);

// FUNCTIONS
function updateHeight() {
  const containerWidth = container.clientWidth;
  container.style.height = `${containerWidth}px`;
}