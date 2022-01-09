//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")
const alert = document.querySelector(".alert")

//functions
const addTodo = (event) => {
    
    //preventing form from submiting
    event.preventDefault()

    if (!todoInput.value) {
        /*  alert("Unable to pass emty input") */
        alert.style.visibility = "visible"
        setTimeout(() => {
            alert.style.visibility = "hidden"
            alert.classList.remove = "alert"
        }, 1500) 

    } else {
       
        //creating todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")

        //creating LI
        const newTodo = document.createElement("li")
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
        saveLocalTodos(todoInput.value)

        //creating complete button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("completed-btn")
        todoDiv.appendChild(completedButton)

        //creating delete button
        const deletedButton = document.createElement("button")
        deletedButton.innerHTML = "<i class='fas fa-trash'></i>"
        deletedButton.classList.add("delete-btn")
        todoDiv.appendChild(deletedButton)


        //append todoDiv to UL 
        todoList.appendChild(todoDiv)

        todoInput.value = ""

        alert.innerText = "Added Successfully"
        alert.classList.add("success")
        alert.style.visibility = "visible"
        setTimeout(() => {
            alert.style.visibility = "hidden"
            /* alert.classList.remove("success") */
        }, 1500)
    }
}

//creating delete and complete function 
const deleteComplete = (event) => {
    const item = event.target;
    if (item.classList.contains("delete-btn")) {
        const todo = item.parentElement;
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    } else if (item.classList.contains("completed-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//creating filter option function 
const filterTodo = (event) => {
    const todos = todoList.childNodes; // all DIVs inside UL
    todos.forEach(function (todo) {
        console.log(todos)
        switch (event.target.value) {

            case "all":
                todo.style.display = "flex"
                break;

            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    })
}


const saveLocalTodos = (todo) => {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}


const getTodos = () => {
    let todos = []
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        //creating todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")

        //creating LI
        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)


        //creating complete button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("completed-btn")
        todoDiv.appendChild(completedButton)

        //creating delete button
        const deletedButton = document.createElement("button")
        deletedButton.innerHTML = "<i class='fas fa-trash'></i>"
        deletedButton.classList.add("delete-btn")
        todoDiv.appendChild(deletedButton)


        //append todoDiv to UL 
        todoList.appendChild(todoDiv)
    })
}


const removeLocalTodos = (todo) => {
    //splice(startingIndex, deleteCount)
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const text = todo.children[0].innerText
    const index = todos.indexOf(text)
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))


}
//event-listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteComplete)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)