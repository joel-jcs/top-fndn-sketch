const sketchpad = document.getElementById('sketch-container');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeSpan = document.getElementById('grid-size-span');
const colorPicker = document.getElementById('color-picker');
const colorBtn = document.getElementById('color-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const shaderBtn = document.getElementById('shader-btn');
const lightenBtn = document.getElementById('lighten-btn');
const eraseBtn = document.getElementById('erase-btn');
const clearBtn = document.getElementById('clear-btn');

let squares;
let squareSize = 16;
let gridSize = squareSize * squareSize;
const setGrid = () => {
    for (let i = 0; i < gridSize; i++) {
        sketchpad.innerHTML += '<div class="square"></div>';
    }
    
    squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.flexBasis = `calc( 100% / ${squareSize})`;
    });
}

setGrid();
    
let randomRgb = [0, 0, 0];
let pickerRgba = tinycolor(colorPicker.value).toRgb();
let pixelColor = `rgba(${pickerRgba.r},${pickerRgba.g},${pickerRgba.b},0.1)`;

let isMouseDown = false;
let drawMode = "color";
let opacityMode = "regular";
let shaderToggle = false;
// to-do: draw function currently only draws if clicking while dragging over mouse, doesn't draw when clicking while mouse is still
const draw = () => {
    squares.forEach(square => {
        let opacity = 0;
    
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
        });
    
        square.addEventListener('mouseup', event => {
            isMouseDown = false;
        });
    
        square.addEventListener('mouseenter', event => {
            if (isMouseDown) {
                if (opacityMode === "shader" && shaderToggle) {
                    opacity = Math.min(Number((opacity + 0.1).toFixed(1)), 1);
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
                
                console.log(pixelColor);
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


colorPicker.addEventListener('input', () => {
    pickerRgba = tinycolor(colorPicker.value).toRgb();
})

colorBtn.addEventListener('click', () => {
    drawMode = "color";
});

rainbowBtn.addEventListener('click', () => {
    drawMode = "rainbow";
});

shaderBtn.addEventListener('click', () => {
    opacityMode = "shader";
    shaderToggle = !shaderToggle;
});

eraseBtn.addEventListener('click', () => {
    drawMode = "erase";
});

clearBtn.addEventListener('click', () => {
    squares.forEach(square => square.style.backgroundColor = `rgba(0,0,0,0)`);
    draw();
});