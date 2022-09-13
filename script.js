const container = document.getElementById('container');
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
const clearBtn = document.getElementById('clearBtn');
const buttons = {
  'colorBtn': true,
  'rainbowBtn': false,
  'eraserBtn': false
};
let color = '#333333';
let numberOfGrids = 16;
// Initializing the Board
updateHeight();
updateGrid();
// Events Listeners
for (let button in buttons) {
  document.getElementById(button).addEventListener('click', buttonHandler);
}
window.addEventListener('resize', updateHeight);
slider.addEventListener('change', updateGrid);
clearBtn.addEventListener('click', updateGrid);
slider.addEventListener('input', e => {
  numberOfGrids = e.target.value;
  sliderValue.innerText = `${numberOfGrids} x ${numberOfGrids}`;
});
colorPicker.addEventListener('input', e => {
  color = e.target.value;
});
// FUNCTIONS
function updateHeight() {
  const containerWidth = container.clientWidth;
  container.style.height = `${containerWidth}px`;
}
function updateGrid() {
  clearGrid();
  container.style.gridTemplateColumns = `repeat(${numberOfGrids}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${numberOfGrids}, 1fr)`;
  const totalGrids = Math.pow(numberOfGrids, 2);
  for (let index = 0; index < totalGrids; index++) {
    const div = document.createElement('div');
    div.addEventListener('mouseover', colorUpdate);
    div.addEventListener('mousedown', colorUpdate);
    container.appendChild(div);
  }

}
function clearGrid() {
  while (container.firstChild) {
    container.firstChild.remove();
  }
}
function colorUpdate(e) {
  if (e.buttons > 0) {
    if (buttons['colorBtn']) {
      this.style.backgroundColor = color;
    } else if (buttons['eraserBtn']) {
      this.style.backgroundColor = '#ffffff';
    } else if (buttons['rainbowBtn']) {
      this.style.backgroundColor = `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
    }
  }
}
function buttonHandler(e) {
  const pressedButton = e.target.id;
  for (let button in buttons) {
    if (button === pressedButton) {
      buttons[button] = true;
      document.getElementById(button).classList.add('active');
    } else {
      buttons[button] = false;
      document.getElementById(button).classList.remove('active');
    }
  }
}
function randomNumber(range) {
  return Math.floor(Math.random() * range);
}