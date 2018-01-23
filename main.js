const ul = document.querySelector('.list-group');
const tasks = [];
for (let i = 1; i <= 10; i++) {
    tasks.push(fetch(`https://jsonplaceholder.typicode.com/users/${i}`));
}

function getInParallel() {
    return Promise.all(tasks)
        .then(responses=>{
            return Promise.all(responses.map(res =>res.json()));
        });
}


function showUserInfo({id, name}) {
    ul.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${name}
                    <span class="badge badge-primary badge-pill">${id}</span></li>`;
}



getInParallel().then(res => res.forEach(user=>showUserInfo(user)));







