function getX() {
    window.x = localStorage.getItem("x");
    if (isNaN(window.x)){
        window.x = 0;
        console.log("x was NaN, set to 0");
    }
    console.log("Loaded x = " + window.x);
    return Number(window.x);
}

function saveX() {
    //let x = getX();
    localStorage.setItem("x", x);
    x = window.x;
    console.log("Saved x = " + x);
}


function newTask(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let json = JSON.stringify(Object.fromEntries(formData));
    let x = window.x; //getX();
    //addTask("Form", json);
    window.x++;
    let task = "task" + window.x;
    //localStorage.
    addTask(task, json);
    saveX();
}

function addTask(name, task) {
    localStorage.setItem(name, task);
    let p = document.createElement("tr");
    let span = document.createElement("td");
    let newtask = JSON.parse(task);

    span.innerHTML = "<input type='checkbox' class='checkbox-icon'>";
    p.appendChild(span);

    span = document.createElement("td");
    span.textContent = newtask.task;
    p.appendChild(span);

    span = document.createElement("td");
    span.textContent = newtask.date;
    p.appendChild(span);

    span = document.createElement("td");
    span.innerHTML = "<button type='button' id='trash' class='material-icon'>delete_forever</button>";
    p.appendChild(span);

    document.getElementsByTagName("tbody")[0].appendChild(p);
}

function loadTasksFromStorage() {

    //initializeX();
    let x = window.x;// getX();

    for (let i = 1; i <= window.x; i++) {
        let name = "task" + i;
        let json = localStorage.getItem(name);
        console.log(name);
        if (!json)
            return;
        let data = JSON.parse(json);
        document.getElementById("task").value = data.task;
        document.getElementById("date").value = data.date;
        addTask(task, data);
        
        alert("hello");
        
        //addTask(("task" + i), data);
        saveX();
    }

}

/*
function loadFormFromStorage() {

    let json = localStorage.getItem("form");
    if (!json) return;
    let data = JSON.parse(json);
    document.getElementById("name").value = data.name;
    document.getElementById("color").value = data.color;
}*/


window.addEventListener('load', function() { window.x = getX(); });
//window.addEventListener("load", window.x = getX());
//window.addEventListener("load", loadFormFromStorage);
window.addEventListener("load", loadTasksFromStorage);
