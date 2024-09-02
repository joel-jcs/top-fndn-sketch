const sketchpad = document.getElementById('sketch-container');
const gridSizeBtn = document.getElementById('grid-size-btn');

let squareSize = 16;
let gridSize = squareSize * squareSize;

const setGrid = () => {

    for (let i = 0; i < gridSize; i++) {
        sketchpad.innerHTML += '<div class="square"></div>';
    }
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.flexBasis = `calc( 100% / ${squareSize})`;
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = 'black';
        });
    });
}

setGrid();

gridSizeBtn.addEventListener('click', () => {
    const selection = prompt("Select a new grid size by typing a number from 1 to 100:");
    if (!selection || selection < 1 || selection > 100) {
        alert("You must input a grid size from 1 to 100.");
    } else {
        sketchpad.innerHTML = ``;
        squareSize = selection;
        gridSize = squareSize * squareSize;
        setGrid();
    }
});