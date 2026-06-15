let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");
let listElement = document.querySelector("#app ul");

let taskList = JSON.parse(localStorage.getItem("localTaskList")) || [];

function addTask() {
    if(inputElement.value.trim() === '') {
        alert('Nothing was typed!');
        return false;
    } else {
        taskList.push(inputElement.value.trim());
        inputElement.value = '';
        renderTask();
        localSaveData();
        inputElement.focus();
    }
}

buttonElement.onclick = addTask;

inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

function renderTask() {
    listElement.innerHTML = "";

    taskList.map((taskValue, index) => {
        let liElement = document.createElement("li");
        let taskText = document.createTextNode(taskValue);

        let linkElement = document.createElement("a");
        let linkText = document.createTextNode("Delete");
        linkElement.appendChild(linkText);

        linkElement.addEventListener("click", (e) => {
            e.preventDefault();
            deleteTask(index);
        });

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