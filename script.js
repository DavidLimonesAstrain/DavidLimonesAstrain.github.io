const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const movesList = document.getElementById('movesList');


const circleRadius = 22;
const padding = 20;

let rows;
let cols;
let startX;
let startY;
let playerX;
let playerY;
let goalX;
let goalY;
let instructions = [];
let correctPath = [];
let instructionIndex = 0;

let currentLevel = 1;
let subLevel = 1;

const LEVEL_ONE = 1;
const LEVEL_TWO = 2;
const LEVEL_THREE = 3;
const LEVEL_FOUR = 4;
const LEVEL_FIVE = 5;
const LEVEL_SIX = 6;

const SUBLEVEL_ONE = 1;
const SUBLEVEL_TWO = 2;
const SUBLEVEL_THREE = 3;

function updateMovesList(movesListContent) {
    const movesList = document.getElementById('movesList');
    if (movesList) {
        movesList.innerHTML = movesListContent;
    } else {
        console.error('Element movesList not found.');
    }
}

function initializeLevel(level = LEVEL_ONE, subLevel = SUBLEVEL_ONE) {
    rows = 3;
    cols = 5;
    startX = 140;
    startY = 200;

    playerX = startX;
    playerY = startY + 2 * (circleRadius * 2 + padding);

    switch (level) {
        case LEVEL_ONE:
            switch (subLevel) {
                case SUBLEVEL_ONE:
                    goalX = startX + 4 * (circleRadius * 2 + padding); //Meta en la columna 5
                    goalY = startY; //Meta en la fila 1

                    instructions = ['ArrowUp', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowRight'];

                    correctPath = [
                        { x: startX, y: playerY }, // Posicion inicial
                        { x: startX, y: startY + circleRadius * 2 + padding },
                        { x: startX + circleRadius * 2 + padding, y: startY + circleRadius * 2 + padding },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: startY + circleRadius * 2 + padding },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: startY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: startY },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                <li>up()</li>
                <li>right()</li>
                <li>right()</li>
                <li>up()</li>
                <li>right()</li>
                <li>right()</li>
                `;
                    break;
                case SUBLEVEL_TWO:
                    // Define una ruta y meta diferente para 1.2
                    goalX = startX + 3 * (circleRadius * 2 + padding); // Meta en la columna 4
                    goalY = startY + (circleRadius * 2 + padding); // Meta en la fila 2

                    instructions = ['ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowRight'];

                    correctPath = [
                        { x: startX, y: playerY }, // Posición inicial
                        { x: startX + circleRadius * 2 + padding, y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - circleRadius * 2 - padding },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - circleRadius * 2 - padding },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                <li>right()</li>
                <li>right()</li>
                <li>up()</li>
                <li>right()</li>
                `;
                    break;
                case SUBLEVEL_THREE:
                    // Define una ruta y meta diferente para 1.3
                    goalX = startX + 2 * (circleRadius * 2 + padding); // Meta en la columna 3
                    goalY = startY + 2 * (circleRadius * 2 + padding); // Meta en la fila 3

                    instructions = ['ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowRight', 'ArrowDown'];

                    correctPath = [
                        { x: startX, y: playerY }, // Posición inicial
                        { x: startX, y: playerY - circleRadius * 2 - padding },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + circleRadius * 2 + padding, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + circleRadius * 2 + padding, y: playerY - circleRadius * 2 - padding },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - circleRadius * 2 - padding },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                <li>up()</li>
                <li>up()</li>
                <li>right()</li>
                <li>down()</li>
                <li>right()</li>
                <li>down()</li>
                `;
                    break;

                default:
                    console.error(`Subnivel no definido: ${subLevel} en el Nivel ${level}`);
            }
            break;

        case LEVEL_TWO:
            rows = 4;
            cols = 4;
            startX = 190;
            startY = 200;

            playerX = startX;
            playerY = startY + 3 * (circleRadius * 2 + padding);

            switch (subLevel) {
                case SUBLEVEL_ONE:
                    // Configurar la meta y la ruta para el subnivel 1 basado en la imagen
                    goalX = startX + 2 * (circleRadius * 2 + padding); // Meta en la columna 3
                    goalY = startY + 1 * (circleRadius * 2 + padding); // Meta en la fila 2

                    instructions = ['ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                <li>up()</li>
                <li>up()</li>
                <li>right()</li>
                <li>if(orange):</li>
                <li>{</li>
                <li class="move-right">up()</li>
                <li class="move-right">right()</li>
                <li class="move-right">down()</li>
                <li>}</>
                `;

                    break;
                case SUBLEVEL_TWO:
                    // Configurar la meta y la ruta para el subnivel 1 basado en la imagen
                    goalX = startX + 1 * (circleRadius * 2 + padding); // Meta en la columna 2
                    goalY = startY; // Meta en la fila 1

                    instructions = ['ArrowUp', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp'];

                    correctPath = [
                        { x: playerX, y: playerY },
                        { x: playerX, y: playerY - 1 * (circleRadius * 2 + padding) },
                        { x: playerX + (circleRadius * 2 + padding), y: playerY - 1 * (circleRadius * 2 + padding) },
                        { x: playerX + 2 * (circleRadius * 2 + padding), y: playerY - 1 * (circleRadius * 2 + padding) },
                        { x: playerX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: playerX + 1 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: playerX + 1 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                    <li>up()</li>
                    <li>rigth()</li>
                    <li>rigth()</li>
                    <li>if(orange):</li>
                    <li>{</li>
                    <li class="move-right">up()</li>
                    <li class="move-right">left()</li>
                    <li class="move-right">up()</li>
                    <li>}</li>
                    `;

                    break;
                case SUBLEVEL_THREE:
                    goalX = startX + 1 * (circleRadius * 2 + padding); // Meta en la columna 2
                    goalY = startY + 1 * (circleRadius * 2 + padding); // Meta en la fila 2

                    instructions = ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp', 'ArrowLeft'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 1 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) }

                    ];

                    movesListContent = `
                <li>right()</li>
                <li>right()</li>
                <li>rigth()</li>
                <li>if(orange):</li>
                <li>{</li>
                <li class="move-right">up()</li>
                <li class="move-right">left()</li>
                <li class="move-right">up()</li>
                <li class="move-right">left()</li>
                <li>}</li>
                `;
                    break;

                default:
                    console.error(`Subnivel no definido: ${subLevel} en el Nivel ${level}`);
            }
            break;

        case LEVEL_THREE:
            rows = 4;
            cols = 5;
            startX = 140;
            startY = 190;

            playerX = startX;
            playerY = startY + 3 * (circleRadius * 2 + padding);

            switch (subLevel) {
                case SUBLEVEL_ONE:
                    goalX = startX + 3 * (circleRadius * 2 + padding); // Meta en la columna 4
                    goalY = startY; // Meta en la fila 1

                    instructions = ['ArrowUp', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowRight'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                    <li>up()</li>
                    <li>rigth()</li>
                    <li>if(yellow):</li>
                    <li class="move-right">right()</li>
                    <li class="move-right">up()</li>
                    <li>else:</li>
                    <li class="move-right">up()</li>
                    <li>up()</li>
                    <li>right()</li>
                    `;
                    break;

                case SUBLEVEL_TWO:
                    goalX = startX + 3 * (circleRadius * 2 + padding); // Meta en la columna 4
                    goalY = startY + 1 * (circleRadius * 2 + padding); // Meta en la fila 2

                    instructions = ['ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowRight'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta

                    ];

                    movesListContent = `
                    <li>right()</li>
                    <li>right()</li>
                    <li>up()</li>
                    <li>if(orange): </li>
                    <li class="move-right">left()</li>
                    <li class="move-right">up()</li>
                    <li>else: </li>
                    <li class="move-right">right()</li>
                    <li>right()</li>
                    <li>right()</li>
                    `;
                    break;

                case SUBLEVEL_THREE:
                    goalX = startX; // Meta en la columna 1
                    goalY = startY; // Meta en la fila 1

                    instructions = ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                    <li>right()</li>
                    <li>right()</li>
                    <li>right()</li>
                    <li>if(orange):</li>
                    <li class="move-right">up()</li>
                    <li class="move-right">left()</li>
                    <li class="move-right">left()</li>
                    <li class="move-right">left()</li>
                    <li class="move-right">up()</li>
                    <li>else:</li>
                    <li class="move-right">right()</li>
                    <li>right()</li>
                    <li>up()</li>
                    <li>left()</li>  
                    `;
                    break;

                default:
                    console.error(`Subnivel no definido: ${subLevel} en el Nivel ${level}`);

            }
            break;

        case LEVEL_FOUR:
            rows = 5;
            cols = 3;
            startX = 160;
            startY = 190;

            playerX = startX;
            playerY = startY + 4 * (circleRadius * 2 + padding);

            switch (subLevel) {
                case SUBLEVEL_ONE:
                    goalX = startX + (circleRadius * 2 + padding);
                    goalY = startY;

                    instructions = ['ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowLeft',
                        'ArrowUp', 'ArrowUp'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                    <li>for i in range (2):</li>
                    <li class="move-right2">right()</li>
                    <li class="move-right2">up()</li>
                    <li>left</li>
                    <li>if(yellow):</li>
                    <li class="move-right">up()</li>

                    `;

                    break;
                case SUBLEVEL_TWO:
                    goalX = startX;
                    goalY = startY;

                    instructions = ['ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp',
                        'ArrowRight', 'ArrowUp', 'ArrowLeft'];

                    correctPath = [
                        { x: startX, y: playerX },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                    <li>for i in range (2):</li>
                    <li class="move-right2">up()</li>
                    <li class="move-right2">for j in range (2):
                    <li class="move-right3">right()</li>
                    <li class="move-right3">up()</li>
                    <li class="move-right3">left()</li>
                    `;

                    break;
                case SUBLEVEL_THREE:
                    goalX = startX + (circleRadius * 2 + padding);
                    goalY = startY + 2 * (circleRadius * 2 + padding);

                    instructions = ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowRight',
                        'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY } // Meta
                    ];

                    movesListContent = `
                    <li>for i in range (4):</li>
                    <li class="move-right2">up()</li>
                    <li>for j in range (2):</li>
                    <li class="move-right2">right()</li>
                    <li>for k in range (3):</li>
                    <li class="move-right2">down()</li>
                    <li>left()</li>
                    <li>up()</li>
                    `;

                    break;

                default:

                    console.error(`Subnivel no definido: ${subLevel} en el Nivel ${level}`);

                    break;
            }

            break;

        case LEVEL_FIVE:
            rows = 6;
            cols = 5;

            startX = 110;
            startY = 160;

            playerX = startX ;
            playerY = startY + 5 * (circleRadius * 2 + padding);

            switch (subLevel) {
                case SUBLEVEL_ONE:
                    goalX = startX + 4 * (circleRadius * 2 + padding);
                    goalY = startY + (circleRadius * 2 + padding);

                    instructions = ['ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowUp',
                        'ArrowRight', 'ArrowUp', 'ArrowUp'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + 4 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + 4 * (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY }
                    ];

                    movesListContent = `
                    <li>while (blue):</li>
                    <li class="move-right2">right()</li>
                    <li class="move-right2">up()</li>
                    `;

                    drawPath(startX, playerY, circleRadius, padding, 'zigzag');
                    break;

                case SUBLEVEL_TWO:
                    goalX = startX + (circleRadius * 2 + padding);
                    goalY = startY + (circleRadius * 2 + padding);

                    instructions = ['ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowLeft',
                        'ArrowUp'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY }
                    ];

                    movesListContent = `
                    <li>while (blue):</li>
                    <li class="move-right2">up()</li>
                    <li class="move-right2">right()</li>
                    <li>up()</li>
                    <li>if(orange):</li>
                    <li class="move-right">left()</li>
                    <li>up()</li>
                    `;

                    break;

                case SUBLEVEL_THREE:
                    goalX = startX;
                    goalY = startY;

                    instructions = ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp',
                        'ArrowLeft', 'ArrowUp', 'ArrowLeft', 'ArrowUp', 'ArrowUp'
                    ];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY },
                        { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX + 2 * (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 5 * (circleRadius * 2 + padding) }, 
                        { x: goalX, y: goalY }

                    ];

                    movesListContent = `
                    <li>while (blue):</li>
                    <li class="move-right2">for i in range(3):</li>
                    <li class="move-right2">right()</li>
                    <li>up()</li>
                    <li>while (blue):</li>
                    <li class="move-right2">left()</li>
                    <li class="move-right2">up()</li>
                    <li>up()</li>
                    `;
                    break;

                default:
                    console.error(`Subnivel no definido: ${subLevel} en el Nivel ${level}`);
                    break;
            }
            break;

        case LEVEL_SIX:
            rows = 6;
            cols = 2;

            startX = 160;
            startY = 150;

            playerX = startX;
            playerY = startY + 5 * (circleRadius * 2 + padding);

            switch (subLevel) {
                case SUBLEVEL_ONE:
                    goalX = startX;
                    goalY = startY;

                    instructions = ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowLeft'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 5 * (circleRadius * 2 + padding) },
                        {  x: startX, y: playerY - 5 * (circleRadius * 2 + padding) },
                        { x: goalX, y: goalY }

                    ];

                    movesListContent = `
                    <li>position = "purple"</li>
                    <li>do { </li>
                    <li class="move-right2">for i range (3):</li>
                    <li class="move-right3">up()</li>
                    <li class="move-right2">right()</li>
                    <li class="move-right2">up()</li>
                    <li class="move-right2">up()</li>
                    <li class="move-right2">left()</li>
                    <li>} while (position != "green")</li>
                    `;

                    break;
                case SUBLEVEL_TWO:
                    goalX = startX + (circleRadius * 2 + padding);
                    goalY = startY + 3 * (circleRadius * 2 + padding);

                    instructions = ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp', 'ArrowRight'];

                    correctPath = [
                        { x: startX, y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - (circleRadius * 2 + padding) },
                        { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                        { x: goalX, y:goalY }
 
                    ];

                    movesListContent = `
                    <li>position = "purple"</li>
                    <li>do { </li>
                    <li class="move-right2">right()</li>
                    <li class="move-right2">up()</li>
                    <li class="move-right2">left()</li>
                    <li class="move-right2">up()</li>
                    <li class="move-right2">right()</li>
                    <li>} while (position != "green")</li>
                    `;

                    break;
                case SUBLEVEL_THREE:
                    goalX = startX;
                    goalY = startY + 4 * (circleRadius * 2 + padding);

                    instructions = ['ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowLeft',
                        'ArrowDown', 'ArrowDown', 'ArrowDown'
                    ];

                    correctPath = [
                    { x: startX, y: playerY },
                    { x: startX + (circleRadius * 2 + padding), y: playerY },
                    { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
                    { x: startX + (circleRadius * 2 + padding), y: playerY - 2 * (circleRadius * 2 + padding) },
                    { x: startX + (circleRadius * 2 + padding), y: playerY - 3 * (circleRadius * 2 + padding) },
                    { x: startX + (circleRadius * 2 + padding), y: playerY - 4 * (circleRadius * 2 + padding) },
                    { x: startX, y: playerY - 4 * (circleRadius * 2 + padding) },
                    { x: startX, y: playerY - 3 * (circleRadius * 2 + padding) },
                    { x: startX, y: playerY - 2 * (circleRadius * 2 + padding) },
                    { x: startX, y: playerY - (circleRadius * 2 + padding) }

                    ];

                    movesListContent = `
                    <li>position = "purple"</li>
                    <li>do { </li>
                    <li class="move-right2">right()</li>
                    <li class="move-right2">for i in range (4):</li>
                    <li class="move-right3">up()</li>
                    <li class="move-right2">left()</li>
                    <li class="move-right2">for j in range (3):</li>
                    <li class="move-right3">down()</li>
                    <li>} while (position != "green")</li>
                    `;
                    break;
                default:
                    console.error(`Subnivel no definido: ${subLevel} en el Nivel ${level}`);
                    break;
            }
            break;

        default:
            window.location.href = "finjuego.html";
            console.error(`Nivel no definido: ${level}`);
            break;
    }
    updateMovesList(movesListContent);
    updateLevelTitle(level, subLevel);
}

function updateLevelTitle() {
    let structureType;

    //Define el tipo de estrucutra según el nivel actual
    switch (currentLevel) {
        case 1:
            structureType = "Estructura secuenciales";
            break;
        case 2:
            structureType = "Estructura de decisión simple (if)";
            break;
        case 3:
            structureType = "Estructura de decisión doble (if-else)";
            break;
        case 4:
            structureType = "Estructura de repetición for";
            break;
        case 5:
            structureType = "Estructura de repetición while";
            break;
        case 6:
            structureType = "Estructura de repetición do-while";
            break;
        default:
            console.error(`Titulo no establecido: ${level}`);
    }

    const levelTitle = `Nivel ${currentLevel}: ${structureType} ${currentLevel}.${subLevel}`;

    //Actualizar el título en el <h2>
    document.querySelector('h2').textContent = levelTitle;

    //Actualizar el título en la etiqueta <title> del documento
    document.title = levelTitle;

    //document.querySelector('h2').textContent = Nivel 1 Estructuras Secuencias 1.${subLevel};
}

function startNewLevel(level, subLevel) {
    initializeLevel(level, subLevel);
    resetGame();
    updateCanvas();
}
// Definir el desplazamiento para mover el círculo amarillo
const displacement = {
    up: { x: 0, y: -circleRadius * 2 - padding },
    down: { x: 0, y: circleRadius * 2 + padding },
    left: { x: -circleRadius * 2 - padding, y: 0 },
    right: { x: circleRadius * 2 + padding, y: 0 }
};

// Definir niveles y subniveles con diferentes configuracions de filas y columnas
const levels = [
    { rows: 6, cols: 5, path: [] },
];


// Inicializar dirección de desplazamiento
let yellowDirection = 'up'; // Dirección inicial del círculo amarillo
let redDirection = 'right'; //Dirección inicial del círculo 

function getYellowPosition() {
    // Obtener la posición base del círculo amarillo
    let basePos = getOrangePosition(); // Puedes usar la posición del círculo naranja como base

    // Ajustar la posición del círculo amarillo basado en la dirección actual
    let offset = displacement[yellowDirection];
    return { x: basePos.x + offset.x, y: basePos.y + offset.y };
}

/*function getRedPosition() {
    let basePos = getYellowPosition(); //Posición inicial del círculo rojo
    let offset = displacement[redDirection];
    return { x: basePos.x + offset.x, y: basePos.y + offset.y};
}*/

function changeYellowDirection(newDirection) {
    if (displacement[newDirection]) {
        yellowDirection = newDirection;
    }
}

function changeRedDirection(newDirection) {
    if (displacement[newDirection]) {
        redDirection = newDirection;
    }
}

//Dibujar la cuadrícula
function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * (circleRadius * 2 + padding);
            const y = startY + row * (circleRadius * 2 + padding);

            // Obtener el color del círculo basado en la posición
            let circleColor = checkCircleColor(x, y);

            // Determinar el color de relleno según el resultado de checkCircleColor
            let fillColor = 'blue'; // Color por defecto
            if (circleColor === 'orange') {
                fillColor = 'orange';
            } else if (circleColor === 'yellow') {
                fillColor = 'yellow';
            } else if (circleColor === 'red') { //Añadido para el círculo rojo
                fillColor = 'red';
            } else if (circleColor === 'green') {
                fillColor = 'green';
            }

            drawCircle(x, y, circleRadius, fillColor, 'black');
        }
    }

    drawCircle(goalX, goalY, circleRadius, 'green', 'black'); // Dibujar la meta
}

function drawCircle(x, y, radius, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.closePath();
}

function drawPlayer() {
    drawCircle(playerX, playerY, circleRadius/2, 'purple', 'black');
}

function drawPath(startX, playerY, circleRadius, padding, pathType) {
    let pathPoints = [];

    if (pathType === 'zigzag') {
        pathPoints = [
            { x: startX, y: playerY },
            { x: startX + (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) },
            { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
            { x: startX + 3 * (circleRadius * 2 + padding), y: playerY - (circleRadius * 2 + padding) }
        ];
    } else if (pathType === 'straight') {
        pathPoints = [
            { x: startX, y: playerY },
            { x: startX + (circleRadius * 2 + padding), y: playerY },
            { x: startX + 2 * (circleRadius * 2 + padding), y: playerY },
            { x: startX + 3 * (circleRadius * 2 + padding), y: playerY }
        ];
    }

    for (let i = 0; i < pathPoints.length; i++) {
        drawCircle(pathPoints[i].x, pathPoints[i].y, circleRadius / 2, 'red', 'black');
    }
}

function getOrangePosition() {
    const offsetX = subLevel * (circleRadius * 2 + padding);
    const offsetY = subLevel * (circleRadius * 2 + padding);
    return { x: startX + offsetX, y: startY + offsetY };
}

function getYellowPosition() {
    // Cambiar la lógica aquí para cambiar la posición del círculo amarillo
    const yellowOffsetX = (subLevel % 3) * (circleRadius * 2 + padding);
    const yellowOffsetY = ((subLevel + 1) % 3) * (circleRadius * 2 + padding);
    return { x: startX + yellowOffsetX, y: startY + yellowOffsetY };
}

function getRedPosition() {
    const redOffsetX = (subLevel % 5) * (circleRadius * 2 + padding);
    const redOffsetY = ((subLevel + 1) % 5) * (circleRadius * 2 + padding);
    return { x: startX + redOffsetX, y: startY + redOffsetY };
}

function checkCircleColor(x, y) {
    // Obtener las posiciones dinámicas para los círculos naranja y amarillo
    const orangePos = getOrangePosition();
    const yellowPos = getYellowPosition();
    const redPos = getRedPosition();

    // Definir las posiciones esperadas para los diferentes colores
    const expectedPositions = {
        orange: orangePos,
        yellow: yellowPos,
        red: redPos, // Posición esperada del círculo rojo
        blue: { x: startX + 50, y: startY + 50 }, // Ejemplo de posición para un círculo azul
        green: { x: startX + 100, y: startY + 100 } // Ejemplo de posición para un círculo verde
    };

    // Verificar si la posición coincide con alguna posición esperada y devolver el color correspondiente
    for (const [color, pos] of Object.entries(expectedPositions)) {
        if (x === pos.x && y === pos.y) {
            return color; // Devuelve el color del círculo si coincide la posición
        }
    }

    return null; // Si no coincide con ninguna posición esperada, devuelve null
}

function movePlayer(direction) {
    let newX = playerX;
    let newY = playerY;

    switch (direction) {
        case 'ArrowRight':
            newX += circleRadius * 2 + padding;
            break;
        case 'ArrowLeft':
            newX -= circleRadius * 2 + padding;
            break;
        case 'ArrowDown':
            newY += circleRadius * 2 + padding;
            break;
        case 'ArrowUp':
            newY -= circleRadius * 2 + padding;
            break;
    }

    if (isPositionValid(newX, newY)) {
        playerX = newX;
        playerY = newY;
        updateCanvas();
        checkPosition();
    } else {
        displayError('Movimiento no válido');
    }
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
    drawPath();
}

function isPositionValid(x, y) {
    return correctPath.some(position => position.x === x && position.y === y);
}

function checkPosition() {
    if (playerX === goalX && playerY === goalY) {
        updateCanvas();
        setTimeout(() => {
            alert("¡Llegaste a la meta!");
        }, 100);
    }
}

function changeMap(level, subLevel) {
    console.log(`Cambiando al mapa del Nivel ${level}, Subnivel ${subLevel}`);
}

function resetGame(toCurrentPosition = false, newPosition = null) {
    // Configura la posición inicial del jugador
    if (newPosition) {
        // Mueve al jugador a una posición específica si se proporciona
        playerX = newPosition.x;
        playerY = newPosition.y;
    } else if (toCurrentPosition) {
        playerX = startX; // Usa startX para definir la posición horizontal inicial
        playerY = startY + (rows - 1) * (circleRadius * 2 + padding); // Ajusta verticalmente según la fila más baja
    } else {
        // Mueve al jugador a una posición por defecto
        playerX = startX;
        playerY = startY + (rows - 1) * (circleRadius * 2 + padding); // Ajusta verticalmente según la fila más baja
    }

    // Reinicia el índice de instrucciones
    instructionIndex = 0;

    // Actualiza el canvas
    updateCanvas();
}

function displayError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    setTimeout(() => {
        errorElement.textContent = '';
    }, 2000);
}


document.getElementById('levelButton').addEventListener('click', function () {
    subLevel++;
    if (subLevel > 3) {
        subLevel = SUBLEVEL_ONE; // Reiniciar a subnivel 1 si se supera el subnivel 3
        currentLevel++;
        resetGame(true);
        // Aquí podrías agregar lógica para cambiar de nivel si hay más niveles en el futuro
    } else {
        resetGame();
    }
    initializeLevel(currentLevel, subLevel);
    updateCanvas();
});

document.addEventListener('keydown', (event) => {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (arrowKeys.includes(event.key)) {
        const expectedMove = instructions[instructionIndex];

        if (expectedMove === 'if(Orange)' && event.key === 'ArrowRight') {
            // Verificar si el siguiente círculo es naranja
            if (checkCircleColor(playerX + (circleRadius * 2 + padding), playerY)) {
                movePlayer('ArrowRight');
                instructionIndex++;
            } else {
                displayError('Error: Movimiento incorrecto - Se esperaba un círculo naranja');
                resetGame();
            }
        } else if (event.key === expectedMove) {
            movePlayer(event.key);
            instructionIndex++;
        } else {
            displayError('Error: Movimiento incorrecto');
            resetGame();
        }

        // Reiniciar el índice de instrucciones si se llega al final de la lista
        if (instructionIndex >= instructions.length) {
            instructionIndex = 0;
        }
    }
});


initializeLevel(currentLevel, subLevel);
updateCanvas();
updateLevelTitle();

/*const rows = 3;
const cols = 5;
const circleRadius = 22;
const padding = 20;
const startX = 140;
const startY = 230;

let playerX = startX;
let playerY = startY + 2 * (circleRadius * 2 + padding); // Starting at the bottom left

const goalX = startX + 4 * (circleRadius * 2 + padding); // Meta en la columna 5
const goalY = startY; // Meta en la fila 1

const instructions = ['ArrowUp', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowRight', 'ArrowRight'];
let instructionIndex = 0;

function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * (circleRadius * 2 + padding);
            const y = startY + row * (circleRadius * 2 + padding);
            drawCircle(x, y, circleRadius, 'blue', 'gray');
        }
    }
    drawCircle(goalX, goalY, circleRadius, 'green', 'green'); // Dibujar la meta
}

function drawCircle(x, y, radius, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.closePath();
}

function drawPlayer() {
    drawCircle(playerX, playerY, circleRadius, 'pink', 'white');
}

function addMoveToList(moveText) {
    const li = document.createElement('li');
    li.textContent = moveText;
    movesList.appendChild(li);
}

function movePlayer(direction) {
    let newX = playerX;
    let newY = playerY;

    switch (direction) {
        case 'ArrowRight':
            newX += circleRadius * 2 + padding;
            break;
        case 'ArrowLeft':
            newX -= circleRadius * 2 + padding;
            break;
        case 'ArrowDown':
            newY += circleRadius * 2 + padding;
            break;
        case 'ArrowUp':
            newY -= circleRadius * 2 + padding;
            break;
    }

    if (isPositionValid(newX, newY)) {
        playerX = newX;
        playerY = newY;
        updateCanvas();
        checkPosition();
    } else {
        displayError('Movimiento no válido');
    }
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
}

const correctPath = [
    { x: startX, y: startY + 2 * (circleRadius * 2 + padding) }, // Posición inicial
    { x: startX, y: startY + circleRadius * 2 + padding },
    { x: startX + circleRadius * 2 + padding, y: startY + circleRadius * 2 + padding },
    { x: startX + 2 * (circleRadius * 2 + padding), y: startY + circleRadius * 2 + padding },
    { x: startX + 2 * (circleRadius * 2 + padding), y: startY },
    { x: startX + 3 * (circleRadius * 2 + padding), y: startY },
    { x: goalX, y: goalY } // Meta
];

function isPositionValid(x, y) {
    return correctPath.some(position => position.x === x && position.y === y);
}

function checkPosition() {
    if (playerX === goalX && playerY === goalY) {
        updateCanvas();

        setTimeout(() => {
        alert("¡Llegaste a la meta!");
    }, 100);
    }
}

function resetGame() {
    playerX = startX;
    playerY = startY + 2 * (circleRadius * 2 + padding); // Volver a la posición inicial
    instructionIndex = 0;
    //movesList.innerHTML = '';
    updateCanvas();
}

function displayError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    setTimeout(() => {
        errorElement.textContent = '';
    }, 2000);
}

document.getElementById('levelButton').addEventListener('click', function(){
});

document.addEventListener('keydown', (event) => {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(event.key)) {
        const expectedMove = instructions[instructionIndex];

        if (event.key === expectedMove) {
            movePlayer(event.key);
            instructionIndex++;
            if (instructionIndex >= instructions.length) {
                instructionIndex = 0; // Reiniciar el índice si se llega al final de las instrucciones
            }
        } else {
            displayError('Error: Movimiento incorrecto');
            resetGame()
        }
    }
});

updateCanvas();*/