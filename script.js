const sketchpad = document.getElementById('sketch-container');


const colorBtn = document.getElementById('color-btn');

const squareSize = 16;
const gridSize = squareSize * squareSize;

for (let i = 0; i < gridSize; i++) {
    sketchpad.innerHTML += '<div class="square"></div>';
}

const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.style.flexBasis = `calc( 100% / ${squareSize})`;
    square.addEventListener('mouseenter', () => {
        square.style.backgroundColor = 'black';
    })
});