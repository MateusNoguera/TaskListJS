let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");
let listElement = document.querySelector("#app ul");

let taskList = JSON.parse(localStorage.getItem("localTaskList")) || [];

function addTask() {
    if(inputElement === '') {
        alert('Nothing was typed!');
        return false;
    } else {
        taskList.push(inputElement.value);
        inputElement.value = '';
        renderTask();
        localSaveData();
    }
}

buttonElement.onclick = addTask;

function renderTask() {
    listElement.innerHTML = "";

    taskList.map((taskValue) => {
        let liElement = document.createElement("li");
        let taskText = document.createTextNode(taskValue);

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        let linkText = document.createTextNode("Delete");
        linkElement.appendChild(linkText);

        let position = taskList.indexOf(taskValue);
        linkElement.setAttribute("onclick", `deleteTask(${position})`);

        liElement.appendChild(taskText);
        liElement.appendChild(linkElement);
        listElement.appendChild(liElement);
    });
}

renderTask();

function deleteTask(position) {
    taskList.splice(position, 1);
    renderTask();
    localSaveData();
}

function localSaveData() {
    localStorage.setItem("localTaskList", JSON.stringify(taskList));
}