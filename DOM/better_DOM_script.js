let todos = [] /// array for todos
function AddToDo(){
    todos.push({
        title: document.querySelector("input").value
    })
    render();
}

// function createtodocomponent(){}

// React - State and components
function render(){
    document.querySelector("#todos").innerHTML = "";
    for(let i=0; i<todos.length; i++){
        const divel = document.createElement("div")
        const h1el = document.createElement("h1")
        h1el.innerHTML = todos[i].title
        const buttonel = document.createElement("button")
        buttonel.innerHTML = "Delete"
        buttonel.onclick = () => DeleteTodo(i)
        divel.appendChild(h1el)
        divel.appendChild(buttonel)
        document.querySelector("#todos").appendChild(divel)
    }
}

function DeleteLastTodo(){
    todos.splice(todos.length-1, 1)
    render()
}

function DeleteFirstTodo(){
    todos.splice(0, 1) // removes the first element (only 1 element)
    render()
}

function DeleteTodo(index){
    todos.splice(index, 1);
    render()
}