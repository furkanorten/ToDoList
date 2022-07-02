const newTask = document.querySelector('.input-task')
const btnAddTask = document.querySelector('.btn-add-task')
const taskList = document.querySelector('.task-list')
document.addEventListener('DOMContentLoaded', readFromLocalStorage)

btnAddTask.addEventListener('click', addTask)
taskList.addEventListener('click', taskDeleteComplete)

function taskDeleteComplete(e){
    const clickedElement = e.target
    
    if(clickedElement.classList.contains('task-btn-completed')){
        clickedElement.parentElement.classList.toggle('task-completed')
        const updatedTask = clickedElement.parentElement.children[0].innerText
        updateLocalStorage(updatedTask)
    }
    if(clickedElement.classList.contains('task-btn-delete')){
        if(confirm('Are you sure?')){
            clickedElement.parentElement.classList.toggle('disappear')
            const deletedTask = clickedElement.parentElement.children[0].innerText
            deleteFromLocalStorage(deletedTask)
            clickedElement.parentElement.addEventListener('transititionend', function () {
                clickedElement.parentElement.remove()
            })
            const items = document.getElementsByClassName('disappear')
            items[0].outerHTML=""
        }
    }
}

function createTaskItem(task, value) {
    //create div
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task-item')
    
    if(value == 0){
        taskDiv.classList.toggle('task-completed')
    }
    
    //creat li
    const taskLi = document.createElement('li')
    taskLi.classList.add('task-desc')
    taskLi.innerText = task
    taskDiv.appendChild(taskLi)

    //create completed button
    const btnTaskCompleted = document.createElement('button')
    btnTaskCompleted.classList.add('task-btn')
    btnTaskCompleted.classList.add('task-btn-completed')
    btnTaskCompleted.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    taskDiv.appendChild(btnTaskCompleted)

    //create delete button
    const btnTaskDelete = document.createElement('button')
    btnTaskDelete.classList.add('task-btn')
    btnTaskDelete.classList.add('task-btn-delete')
    btnTaskDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    taskDiv.appendChild(btnTaskDelete)

    //add li to ul
    taskList.appendChild(taskDiv)
}

function addTask(e) {
    e.preventDefault()
    
    if(newTask.value.length > 0) {
        createTaskItem(newTask.value, 1)
        saveToLocalStorage(newTask.value)
        newTask.value = ''
    }else {
        alert("Please write a task!")
    }

}

function localStorageToArray() {
    let tasks;
    let values;

    if(localStorage.getItem('tasks') === null) {
        tasks = []
        values = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        values = JSON.parse(localStorage.getItem('values'))
    }

    return [tasks,values]
}

function saveToLocalStorage(newTask) {
    const results = localStorageToArray()
    let tasks = results[0]
    let values = results[1]

    tasks.push(newTask)
    values.push(1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('values', JSON.stringify(values))

}

function readFromLocalStorage() {
    const results = localStorageToArray()
    let tasks = results[0]
    let values = results[1]
    for(let i = 0; i<tasks.length; i++) {
        createTaskItem(tasks[i],values[i])
    }
}

function deleteFromLocalStorage(task) {
    const results = localStorageToArray()
    let tasks = results[0]
    let values = results[1]

    const deletedTaskIndex = tasks.indexOf(task)
    tasks.splice(deletedTaskIndex, 1)
    values.splice(deletedTaskIndex, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('values', JSON.stringify(values))
}

function updateLocalStorage(task) {
    const results = localStorageToArray()
    let tasks = results[0]
    let values = results[1]

    const updatedTaskIndex = tasks.indexOf(task)
    if(values[updatedTaskIndex] == 0) {
        values[updatedTaskIndex] = 1
    }else {
        values[updatedTaskIndex] = 0
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('values', JSON.stringify(values))
}