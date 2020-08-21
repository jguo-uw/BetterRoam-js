// sortTable function modified from 
// https://stackoverflow.com/a/14268260/473961
function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        const aText = a.cells[col].textContent.trim();
        const bText = b.cells[col].textContent.trim();
        let aDate = 0;
        let bDate = 0;
        try { aDate = +new Date(aText.replace(/(th|st|nd|rd)/, '')) } catch { console.log('cant parse', aText)}
        try { bDate = +new Date(bText.replace(/(th|st|nd|rd)/, '')) } catch { console.log('cant parse', bText)}
        if (aDate || bDate) {
            console.warn('sorting by date:', aDate, bDate);
            return reverse * (aDate < bDate ? -1 : 1);
        }
        console.warn('sorting by text:', aText, bText);
        // `-1 *` if want opposite order
        return reverse * (aText.localeCompare(bText, undefined, { numeric: true }));
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function addSortArrow(){
    document.querySelectorAll('.roam-table > table').forEach(table => {
        table.querySelectorAll('thead th').forEach((head, index) => {
        const toggleEl = document.createElement('span');
        toggleEl.innerHTML = '▼&nbsp;';
        toggleEl.style.color = '#A9A9A9';
        toggleEl.style.cursor = 'pointer';
        toggleEl.style.fontsize = '70%';
        toggleEl.id = 'sortArrow';
        toggleEl.onclick = event => {
            event.preventDefault();
            event.stopPropagation();
            if (toggleEl.innerHTML.startsWith('▼')) {
                sortTable(table, index);
                toggleEl.innerHTML = '▲&nbsp;';
            } else {
                sortTable(table, index, true);
                toggleEl.innerHTML = '▼&nbsp;';
            }
        }
        if (head.firstChild.id != 'sortArrow'){
            head.insertBefore(toggleEl, head.firstChild);
        }
        });
    })
};

setInterval(addSortArrow, 100);
