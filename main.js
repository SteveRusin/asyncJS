const ul = document.querySelector('.list-group');
const tasks = [];
for (let i=1; i<=10; i++){
    tasks.push(`https://jsonplaceholder.typicode.com/users/${i}`);
}

function  getInSeries() {
    let sequence = Promise.resolve();
   return tasks.map(task=>{
       return sequence = sequence.then(()=>{
            return fetch(task)
                .then(res=>res.json())
                .then(user=>showUserInfo(user));
        });
    })
}

function showUserInfo({id, name}) {
    ul.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${name}
                    <span class="badge badge-primary badge-pill">${id}</span></li>`;
}

getInSeries();







