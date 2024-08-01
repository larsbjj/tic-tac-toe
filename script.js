let fields = [
    null,
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
];


function init() {
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
                cellContent = 'o';
            } else if (fields[index] === 'cross') {
                cellContent = 'x';
            }

            tableHTML += `<td>${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}
