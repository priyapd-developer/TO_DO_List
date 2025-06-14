const Msg = document.getElementById("msg");
let list = document.getElementById("list");
let error = document.getElementById("error");

document.addEventListener("DOMContentLoaded", loadTasks);

function add() {
    let MSG = Msg.value;
    error.textContent = "";

    if (MSG) {
        let taskObj = { text: MSG, completed: false };
        appendTask(taskObj);
        saveTasks(); // Save after adding
        Msg.value = "";
    } else {
        error.textContent = "Enter text before adding.";
    }
}

function appendTask(taskObj) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("check");
    checkbox.checked = taskObj.completed;

    let taskText = document.createElement("p");
    taskText.textContent = taskObj.text;
    taskText.style.marginLeft = "10px";

    if (taskObj.completed) {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "gray";
    }

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.classList.add("deletebutton");
    deleteButton.onclick = function () {
        taskDiv.remove();
        separator.remove();
        saveTasks();
    };

    let separator = document.createElement("hr");
    separator.classList.add("task-divider");

    checkbox.addEventListener("change", function () {
        taskObj.completed = checkbox.checked;
        taskText.style.textDecoration = checkbox.checked ? "line-through" : "none";
        taskText.style.color = checkbox.checked ? "gray" : "black";
        saveTasks();
    });

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(deleteButton);
    list.appendChild(taskDiv);
    list.appendChild(separator);
}

// Function to save tasks in localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll(".task").forEach(taskDiv => {
        let taskText = taskDiv.querySelector("p").textContent;
        let completed = taskDiv.querySelector("input").checked;
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => appendTask(task));
}
