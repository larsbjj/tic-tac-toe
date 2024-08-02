let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';
let gameOver = false;

function init() {
    render();
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];

    gameOver = false;

    displayRestartButton('none');
    render();
}

// Die render-Funktion, die die Tabelle generiert und in den Container rendert
function render() {
    let contentDiv = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let cellContent = '';

            if (fields[index] === 'circle') {
                cellContent = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                cellContent = generateCrossSVG();
            }

            tableHTML += `<td id="cell-${index}" onclick="handleClick(${index}, this)">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

// Funktion, die beim Klicken auf ein <td>-Element aufgerufen wird
function handleClick(index, cell) {
    if (fields[index] === null && !gameOver) {
        fields[index] = currentPlayer;

        if (currentPlayer === 'circle') {
            cell.innerHTML = generateCircleSVG();
            currentPlayer = 'cross';
        } else {
            cell.innerHTML = generateCrossSVG();
            currentPlayer = 'circle';
        }

        cell.onclick = null;

        // Überprüfen, ob jemand gewonnen hat
        checkWinner();

        if (gameOver !== true) {
            checkDraw();
        }
    }
}

// Funktion zum Generieren des SVG-Kreises
function generateCircleSVG() {
    const svgHTML = `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="none">
            <animate attributeName="stroke-dasharray" from="0, 188.4" to="188.4, 188.4" dur="0.125s" fill="freeze" />
        </circle>
    </svg>
    `;
    return svgHTML;
}

// Funktion zum Generieren des SVG-Kreuzes
function generateCrossSVG() {
    const svgHTML = `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="5" x2="65" y2="65" stroke="#FFC000" stroke-width="5">
            <animate attributeName="stroke-dasharray" from="0, 84.85" to="84.85, 84.85" dur="0.125s" fill="freeze" />
        </line>
        <line x1="65" y1="5" x2="5" y2="65" stroke="#FFC000" stroke-width="5">
            <animate attributeName="stroke-dasharray" from="0, 84.85" to="84.85, 84.85" dur="0.125s" fill="freeze" />
        </line>
    </svg>
    `;
    return svgHTML;
}

// Funktion zur Überprüfung des Spielstatus
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameOver = true;
            drawWinningLine(a, b, c);
            displayRestartButton('block');
            break;
        }
    }
}

function checkDraw() {
    // Prüfen, ob alle Felder besetzt sind und kein Wert null ist
    const isDraw = fields.every(field => field !== null);
    
    if (isDraw) {
        gameOver = true;
        displayRestartButton('block');
    }
}

function displayRestartButton(displayStyle) {
    let restartButton = document.getElementById('restart-button');
    restartButton.style.display = displayStyle;
}

// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(a, b, c) {
    const startCell = document.getElementById(`cell-${a}`);
    const endCell = document.getElementById(`cell-${c}`);

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentDiv = document.getElementById('content');
    const svgNS = "http://www.w3.org/2000/svg";
    const line = document.createElementNS(svgNS, 'line');

    line.setAttribute('x1', startRect.left + startRect.width / 2);
    line.setAttribute('y1', startRect.top + startRect.height / 2);
    line.setAttribute('x2', startRect.left + startRect.width / 2);
    line.setAttribute('y2', startRect.top + startRect.height / 2);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5');

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('style', 'position: absolute; top: 0; left: 0; pointer-events: none;');

    svg.appendChild(line);
    contentDiv.appendChild(svg);

    requestAnimationFrame(() => {
        line.setAttribute('x2', endRect.left + endRect.width / 2);
        line.setAttribute('y2', endRect.top + endRect.height / 2);
    });
}