const sketchpad = document.getElementById('sketch-container');
const gridSizeSpan = document.getElementById('grid-size-span');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridToggleBtn = document.getElementById('grid-toggle-btn')
const colorPicker = document.getElementById('color-picker');
const colorBtn = document.getElementById('color-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const shaderToggleBtn = document.getElementById('shader-toggle-btn');
const lightenToggleBtn = document.getElementById('lighten-toggle-btn');
const eraseBtn = document.getElementById('erase-btn');
const clearBtn = document.getElementById('clear-btn');

let squares;
let squareSize = 16;
let gridSize = squareSize * squareSize;
let isGridToggled = true;

const gridToggledCheck = () => {
    squares.forEach(square => {
        if (isGridToggled) {
            square.style.border = "solid 1px rgba(0, 0, 0, 0.2)";
        } else {
            square.style.border = "";
        }
    });
}

const setGrid = () => {
    for (let i = 0; i < gridSize; i++) {
        sketchpad.innerHTML += '<div class="square"></div>';
    }
    
    squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.flexBasis = `calc( 100% / ${squareSize})`);
    gridToggledCheck();
}

setGrid();
    
let randomRgb = [0, 0, 0];
let pickerRgba = tinycolor(colorPicker.value).toRgb();
let pixelColor = `rgba(${pickerRgba.r},${pickerRgba.g},${pickerRgba.b},0.1)`;

let isMouseDown = false;
let drawMode = "color";
let opacityMode = "regular";
let isShaderToggled = false;
let isLightenToggled = false;
const draw = () => {
    squares.forEach(square => {
        let opacity = 0;
        
        const updateSquare = () => {
            if (opacityMode === "shader" && isShaderToggled) {
                opacity = Math.min(Number((opacity + 0.1).toFixed(1)), 1);
            } else if (opacityMode === "lighten" && isLightenToggled) {
                opacity = Math.min(Number((opacity - 0.1).toFixed(1)), 1);
            } else {
                opacity = 1;
            }
            
            let randomRgbCopy = randomRgb.map(index => index = Math.floor(Math.random() * 256));
            if (drawMode === "rainbow") {
                randomRgb = randomRgbCopy.slice();
                pixelColor = `rgba(${randomRgb[0]},${randomRgb[1]},${randomRgb[2]}, ${opacity})`;
            } else if (drawMode === "erase") {
                opacity = 0;
                pixelColor = `rgba(0,0,0,${opacity})`;
            } else {
                pixelColor = `rgba(${pickerRgba.r},${pickerRgba.g},${pickerRgba.b},${opacity})`;
            }

            square.style.backgroundColor = `${pixelColor}`;
        }

        square.addEventListener('click', updateSquare);
        square.addEventListener('mousedown', () => isMouseDown = true);
        square.addEventListener('mouseup', () => isMouseDown = false);
        square.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                updateSquare();
            }
        })
    });
}

draw();

gridSizeSlider.addEventListener('input', () => {
    let selection = gridSizeSlider.value;
    gridSizeSpan.textContent = `${selection} x ${selection}`
    sketchpad.innerHTML = ``;
    squareSize = selection;
    gridSize = squareSize * squareSize;
    setGrid();
    draw();
});

gridToggleBtn.addEventListener('click', () => {
    isGridToggled = !isGridToggled;
    gridToggledCheck();
});


colorPicker.addEventListener('input', () => pickerRgba = tinycolor(colorPicker.value).toRgb());
colorBtn.addEventListener('click', () => drawMode = "color");
rainbowBtn.addEventListener('click', () => drawMode = "rainbow");

eraseBtn.addEventListener('click', () => {
    drawMode = "erase";
    opacityMode = "regular";
    isShaderToggled = false;
    isLightenToggled = false;
});

shaderToggleBtn.addEventListener('click', () => {
    opacityMode = "shader";
    isShaderToggled = !isShaderToggled;
    isLightenToggled = false;
});

lightenToggleBtn.addEventListener('click', () => {
    opacityMode = "lighten";
    isLightenToggled = !isLightenToggled;
    isShaderToggled = false;
});

clearBtn.addEventListener('click', () => {
    squares.forEach(square => square.style.backgroundColor = `rgba(0,0,0,0)`);
    draw();
});