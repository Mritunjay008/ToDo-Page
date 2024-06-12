
let mainTodoelem = document.querySelector(".todo-lists-item");
let inputValue = document.getElementById("inputValue");
let addTodo = document.querySelector(".btn");

//now getting back the stored items in localstorage
const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTodoList"))
};

const addTodoListLocalStorage = (localTodoList) => {
    return localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoList));
};

// creating an array for storing in localstorage
let localTodoList = getTodoListFromLocal() || [];

let addTodoDynamicElement = (curElem) => {
    const divElem = document.createElement('div');
    divElem.classList.add("main_todo_div");

    divElem.innerHTML = `<li>${curElem}</li>      <button class="deleteBtn">Delete</button>`

    mainTodoelem.append(divElem)
}

const addTodoList = (e) => {
    e.preventDefault();

    // * storing the information in localstorage
    const todoListValue = inputValue.value.trim();

    if (!localTodoList.includes(todoListValue) && todoListValue != "") {
        localTodoList.push(todoListValue)
        localTodoList = [...new Set(localTodoList)]
        localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoList));

        addTodoDynamicElement(todoListValue);
    }
    inputValue.value = ""
}

const showTodoList = () => {
    localTodoList.forEach((curElem) => {
        addTodoDynamicElement(curElem);
    })
}

showTodoList();

//remove the data 
const removeTodoElem = (e) => {
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.textContent;

    let parentElem = todoToRemove.parentElement;
    parentElem.remove();

    localTodoList = localTodoList.filter((curTodo) => {
        return curTodo != todoListContent;
    });

    addTodoListLocalStorage(localTodoList);
}

// deleting from localstorage
mainTodoelem.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("deleteBtn"))
        removeTodoElem(e);
})

addTodo.addEventListener('click', (e) => {
    addTodoList(e);
});