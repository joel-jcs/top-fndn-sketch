const sketchpad = document.getElementById('sketch-container');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeSpan = document.getElementById('grid-size-span');
const colorBtn = document.getElementById('color-btn')
const rainbowBtn = document.getElementById('rainbow-btn');
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
    
let RGBA = [0, 0, 0];
let pixelColor = ``;
let isMouseDown = false;
let drawMode = "color";

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
                opacity = Math.min(Number((opacity + 0.1).toFixed(1)), 1);
                pixelColor = `rgba(0,0,0,${opacity})`;
                
                let RGBA_COPY = RGBA.map(index => index = Math.floor(Math.random() * 256));
                if (drawMode === "rainbow") {
                    RGBA = RGBA_COPY.slice();
                    pixelColor = `rgba(${RGBA[0]},${RGBA[1]},${RGBA[2]}, ${opacity})`;
                } else if (drawMode === "erase") {
                    opacity = 0;
                    pixelColor = `rgba(0,0,0,${opacity})`;
                } else {
                    pixelColor = `rgba(0,0,0,${opacity})`;
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

colorBtn.addEventListener('click', () => {
    drawMode = "color";
});

rainbowBtn.addEventListener('click', () => {
    drawMode = "rainbow";
});

eraseBtn.addEventListener('click', () => {
    drawMode = "erase";
});

clearBtn.addEventListener('click', () => {
    squares.forEach(square => {
        square.style.backgroundColor = `rgba(0,0,0,0)`;
    });
    draw();
});