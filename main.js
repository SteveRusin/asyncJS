const ul = document.querySelector('.list-group');
const modal = document.getElementById('myModal');
const span = document.querySelector('span.close');
const tasks = [];
span.addEventListener('click', () => modal.style.display = "none");

for (let i = 1; i <= 10; i++) {
    tasks.push(`https://jsonplaceholder.typicode.com/users/${i}`);
}
//modal.style.display = "block";
let wait
let timeOut = () => new Promise((res, rej) => {
    wait = setTimeout(() => {
        clearTimeout(wait);
        Promise.reject()
        modal.style.display = "block";
        rej();
    }, 2000)
});

function getInSeries() {
    let sequence = Promise.resolve();
    return tasks.map(task => {
        return sequence = sequence.then(() => {
            return Promise.race([fetch(task), timeOut()])
                .then(res => {
                    clearTimeout(wait);
                    return res.json()
                })
                .then(user => showUserInfo(user));
        });
    }).concat(timeOut);
}

function showUserInfo({id, name}) {
    ul.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${name}
                    <span class="badge badge-primary badge-pill">${id}</span></li>`;
}

getInSeries();







