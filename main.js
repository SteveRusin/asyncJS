const ul = document.querySelector('.list-group');
const container = document.querySelector('.container');
const modal = document.getElementById('myModal');
const span = document.querySelector('span.close');
const tasks = [];
span.onclick = function() {
    modal.style.display = "none";
}

for (let i=1; i<=10; i++){
    tasks.push(`https://jsonplaceholder.typicode.com/users/${i}`);
}

let timeOut = new Promise((res, rej)=>{
    let wait = setTimeout(()=>{
        clearTimeout(wait);
        rej();
        modal.style.display = "block";
    }, 2000)
});

function  getInSeries() {
    let sequence = Promise.resolve();
   let tempArr = tasks.map(task=>{
       return sequence = sequence.then(()=>{
            return Promise.race([fetch(task), timeOut])
                .then((res, rej) => res.json())
                .then(user=>showUserInfo(user));
        });
    }).concat(timeOut);
}

function showUserInfo({id, name}) {
    ul.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${name}
                    <span class="badge badge-primary badge-pill">${id}</span></li>`;
}

getInSeries();







