let order = 0;
let timer = null;

function generateGrid() {
    const rows = 5;
    const columns = 9;
    const gridElement = document.querySelector('.grid');
    const gridHTML = new Array(rows)
        .fill()
        .map((_, row) => {
            return `<div class="row">
                ${
                    new Array(columns)
                        .fill()
                        .map((_, column) => `<div class="cell" onclick="revealCell(this)" data-grid-position="${row + 1},${column + 1}">-</div>`)
                        .join('\n')
                }
            </div>`;
        })
        .join('\n');

    gridElement.innerHTML = gridHTML;
}

function changeCellBrackground(color) {
    const elements = document.querySelectorAll('.cell');

    for (let element of elements) element.style.background = color;
}

function startGame() {
    const element = document.querySelector('input');
    order = 0;
    clearTimeout(timer);
    generateGrid();
    generateGame();
    changeCellBrackground('transparent');
    changeStatus('Click on "Start"', 'white');
    timer = setTimeout(() => changeCellBrackground('white'), parseFloat(element.value) * 1000);
}

function randomizeValidElement() {
    const row = Math.floor(Math.random() * 5) + 1;
    const column = Math.floor(Math.random() * 9) + 1;
    const element = document.querySelector(`[data-grid-position="${row},${column}"]`);

    return element.innerHTML == '-' ? element : randomizeValidElement();
}

function generateGame() {
    for (let iteration = 0; iteration < 9; iteration++) {
        const element = randomizeValidElement();

        element.innerHTML = (iteration + 1).toString();
    }
}

function changeStatus(text, color) {
    const element = document.querySelector('#status');

    element.innerHTML = text;
    element.style.color = color;
}

function revealCell(element) {
    if (element.innerHTML === '0' || (order + 1).toString() !== element.innerHTML) {
        changeStatus('You didn\'t get an apple slice', 'red');
        return generateGrid();
    } else {
        order++;
        element.style.background = 'transparent';
    }

    if (element.innerHTML === '9') {
        generateGrid();
        changeStatus('You get an apple slice', 'green');
    }
}

generateGrid();