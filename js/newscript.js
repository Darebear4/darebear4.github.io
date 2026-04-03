class Task {
    constructor({ text, date, done, id }) {
        this.text = text
        this.date = date
        this.done = done
        this.id = id
    }
    toHTML() {
        if (this.done && document.getElementById("filter").checked)
            return '';
        
        return `
        <tr>
            <td>
                <input type='checkbox' onchange="updateTask(${this.id})"
                ${this.done ? "checked" : ""} class='checkbox-icon'>
            </td>
            <td class = "${this.done ? "task-done" : ""}" >${this.text}</td>
            <td>${this.prettyDate()}</td>
            <td>
                <button onclick="deleteTask(${this.id})" id='delete' class='material-icon'>do_not_disturb_on
                </button>
            </td>
        </tr> `;
    }

    prettyDate() {
        let newdate = new Date(this.date);
        return newdate.toLocaleDateString("en-US");
    }
    
    toggle() {
        if (!(this.done = !this.done))
            return;
    }
}

function createTask(event) {
    event.preventDefault();

    let desc = document.getElementById("task").value;
    let date = document.getElementById("date").value;
    let id = Date.now();

    let newTask = new Task({
        text: desc,
        done: false,
        date: date,
        id: id
    });

    tasks.push(newTask);

    updateStorage(tasks);

    readTasks();
    event.target.reset();

}

let tasks = []

function updateStorage(newData) {
    localStorage.setItem("tasks", JSON.stringify(newData));

}

function readStorage() {
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = data.map(task => new Task(task));

}

function readTasks() {

    let table = document.getElementById("table-body");
    table.innerHTML = "";

    if (document.getElementById("sort").checked) {
        let orderedTasks = [...tasks];
        orderedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        orderedTasks.forEach(task => {
            table.innerHTML += task.toHTML();
        });
        return;
    }
    tasks.forEach(task => {
        table.innerHTML += task.toHTML();
    });

}

function updateTask(id) {
    if (id == "filter" || id == "sort") {
        readTasks();
        return;
    }
    let task = tasks.find(done => done.id === id);
    task.toggle();
    updateStorage(tasks);
    readTasks();
    
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateStorage(tasks);
    readTasks();

}


document.addEventListener("DOMContentLoaded", () => {
    readStorage();
    readTasks();
});