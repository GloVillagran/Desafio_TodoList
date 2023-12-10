// Inicialización del arreglo con tres tareas iniciales
let tasks = [
    {
        id: 1,
        description: "Tarea inicial 1",
        completed: false,
    },
    {
        id: 2,
        description: "Tarea inicial 2",
        completed: true,
    },
    {
        id: 3,
        description: "Tarea inicial 3",
        completed: false,
    }
];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value;

    if (taskDescription !== "") {
        const newTask = {
            id: tasks.length + 1,
            description: taskDescription,
            completed: false,
        };

        tasks.push(newTask);
        taskInput.value = "";
        updateTasks();
    }
}

// Asignar el evento click al botón con la clase "btnAdd"
document.querySelector("#btnAdd").addEventListener("click", addTask);

function taskStatus(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    updateTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateTasks();
}

function updateTasks() {
    const taskListContainer = document.getElementById("taskList");
    const totalTasksElement = document.getElementById("totalTasks");
    const completedTasksElement = document.getElementById("completedTasks");

    totalTasksElement.textContent = tasks.length;
    completedTasksElement.textContent = tasks.filter(task => task.completed).length;

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Nombre de Tarea</th>
        <th></th>
        <th></th>
    `;
    tbody.appendChild(headerRow);

    if (tasks.length === 0) {
        const noTasksRow = document.createElement("tr");
        const noTasksCell = document.createElement("td");
        noTasksCell.colSpan = 4;
        noTasksCell.textContent = "No hay tareas disponibles.";
        noTasksRow.appendChild(noTasksCell);
        tbody.appendChild(noTasksRow);
    } else {
        tasks.forEach(task => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${task.id}</td>
                <td>${task.description}</td>
                <td><input type="checkbox" ${task.completed ? 'checked' : ''} onchange="taskStatus(${task.id})"></td>
                <td><button class="delete" onclick="deleteTask(${task.id})">Eliminar</button></td>
            `;

            tbody.appendChild(row);
        });
    }

    table.appendChild(tbody);
    taskListContainer.innerHTML = "";
    taskListContainer.appendChild(table);

    console.log(tasks);
}

updateTasks();