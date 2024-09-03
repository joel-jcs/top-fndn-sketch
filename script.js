const sketchpad = document.getElementById('sketch-container');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeSpan = document.getElementById('grid-size-span');
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
let rainbowMode = false;

const draw = () => {
    squares.forEach(square => {
        let opacity = 0.1;
    
        square.addEventListener('mousedown', () => {
            isMouseDown = true;
        });
    
        square.addEventListener('mouseup', event => {
            isMouseDown = false;
        });
    
        square.addEventListener('mouseenter', event => {
            if (isMouseDown) {
                pixelColor = `rgba(0,0,0,${opacity})`;
                
                let RGBA_COPY = RGBA.map(index => index = Math.floor(Math.random() * 256));
                if (rainbowMode) {
                    RGBA = RGBA_COPY.slice();
                    pixelColor = `rgba(${RGBA[0]},${RGBA[1]},${RGBA[2]}, ${opacity})`;
                } else {
                    pixelColor = `rgba(0,0,0,${opacity})`;
                }
    
                square.style.backgroundColor = `${pixelColor}`;
                opacity = Math.min(Number((opacity + 0.1).toFixed(1)), 1);
    
                console.log(pixelColor);
            }
        })
    });
}

draw();

gridSizeSlider.addEventListener('input', () => {
    selection = gridSizeSlider.value;
    gridSizeSpan.textContent = `${selection} x ${selection}`
    sketchpad.innerHTML = ``;
    squareSize = selection;
    gridSize = squareSize * squareSize;
    setGrid();
    draw();
});

rainbowBtn.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
});