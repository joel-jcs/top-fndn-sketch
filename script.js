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

        let opacity = 0.1
        square.addEventListener('mouseenter', event => {
            let randomRed = Math.floor(Math.random() * 256);
            let randomGreen = Math.floor(Math.random() * 256);
            let randomBlue = Math.floor(Math.random() * 256);

            square.style.backgroundColor = `rgba(${randomRed},${randomGreen},${randomBlue}, ${opacity})`;
            opacity = Math.min(Number((opacity + 0.1).toFixed(1)), 1);
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
