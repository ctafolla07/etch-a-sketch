var htmlElements = "";
var container = document.getElementById("container");
var sizeValue = document.getElementById("sizeValue");
var sizeSlider = document.getElementById("sizeSlider");
var defaultSize = '16';
var currentMode = 'colorMode';


const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const rainbow = document.getElementById('rainbowMode');
const color = document.getElementById('colorMode');
color.classList.add('active');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

sizeSlider.onchange = (e) => gridUpdate(e.target.value);
sizeSlider.onmousemove = updateSizeValue;

//These are responsible for button responses
color.onmousedown = () => changeMode('colorMode');
rainbow.onmousedown = () => changeMode('rainbowMode');
eraser.onmousedown = () => changeMode('eraser');
clear.onmousedown = clearGrid;



//Creating our default grid to start 16x16
for (var i = 0; i < defaultSize * defaultSize; i++) {
    const gridElement = document.createElement('div');
    gridElement.style.backgroundColor = 'white';
    gridElement.classList.add('gridElement')
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    container.appendChild(gridElement)
}
//combines 2 functions to be used as event actions
function gridUpdate(value){
    updateGrid(value);
    updateSizeValue();
    
}
//Changing grid square color on mouse hover
function changeColor(e) {
    if (e.type === "mouseover" && !mouseDown) return
    else if (currentMode == 'eraser') {
        e.target.style.backgroundColor = 'white';
    } else if (currentMode == 'rainbowMode') {
        let r = Math.floor(Math.random()*259);
        let g = Math.floor(Math.random()*259);
        let b = Math.floor(Math.random()*259);
        let rgb = `rgb(${r},${g},${b})`;
        e.target.style.backgroundColor = rgb;


    } else {
        e.target.style.backgroundColor = 'black';
    }
    
}
//Updating grid size when moving slider
function updateSizeValue() {
    document.getElementById('sizeValue').textContent = sizeSlider.value + ' x ' + sizeSlider.value;
}
function updateGrid(value) {
    defaultSize = value;

    container.innerHTML ='';

    container.style.gridTemplateRows = `repeat(${value}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${value}, 1fr)`;

    for (var i = 0; i < defaultSize * defaultSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('gridElement')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        container.appendChild(gridElement)
    }
}
function clearGrid() {
    let nodes = document.getElementById('container').getElementsByTagName("div");
        for(var i=0; i<nodes.length; i++) {
            nodes[i].style.background = 'white';
        }
    }

function changeMode (newMode) {
    if (currentMode == 'rainbowMode') {
        rainbow.classList.remove('active');
    } else if ( currentMode == 'eraser') {
        eraser.classList.remove('active');
    } else if (currentMode == 'colorMode') {
        color.classList.remove('active');
    }

    if (newMode == 'rainbowMode') {
        rainbow.classList.add('active')
    } else if (newMode == 'eraser') {
        eraser.classList.add('active')
    } else if (newMode == 'colorMode') {
        color.classList.add('active')
    }
    currentMode = newMode;
}