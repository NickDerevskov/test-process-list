const start = document.getElementById('start');
const out = document.getElementById('out');

start.addEventListener('click', async () => {
    const result = await window.electronAPI.getProcessList();
    console.log('getProcessList', result)
    if (result.processes) {
        const processList = result.processes;

        for (let process of processList) {
            const row = out.insertRow();
            row.insertCell(0).innerHTML = process[0]
            row.insertCell(1).innerHTML = process[1];
            row.insertCell(2).innerHTML = '<button type="button" name="kill">Close</button>';
        }
    }
    if (result.error) {
        alert(result.error)
    }
});

out.addEventListener('click', async (evt) => {
    const node = evt.target;
    if (node.name === 'kill') {
        let pid = node.parentElement.parentElement.cells[0].innerText
        const result = await window.electronAPI.killProcByPID(pid);
        console.log('send from rendere', result)
        if (!result.error) {
            node.parentElement.parentElement.remove();
        } else {
            alert(result.error);
        }
    }
});

const modal = document.getElementById('searchModal');
const searchBtn = document.getElementById('searchButton');
const search = document.getElementById('search');
const searchVal = document.getElementById('searchVal');
const span = document.getElementsByClassName('close')[0];

searchBtn.onclick = () => {
    modal.style.display = 'block';
    console.log('hello')
};
search.onclick = () => {
    window.find(searchVal.value);
};

span.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
