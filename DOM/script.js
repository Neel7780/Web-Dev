function AddToDo() {
    const toAdd = document.querySelector("input"); 
    const textNode = document.createElement("div"); 
    textNode.style.display = "flex"; // Add flex styling to the div

    // Set the inner HTML of the div with the to-do text and a delete button
    textNode.innerHTML = "<div><h2>" + toAdd.value + '<button onclick="DeleteToDo(this)">Delete</button></h2></div>'; /// use ' to insert "" inside "" !

    const getParent = document.querySelector(".todo");
    getParent.appendChild(textNode); 

    toAdd.value = ""; // Clear the input box after adding the to-do
}

function DeleteToDo(button) {
    const parentDiv = button.parentNode; // Get the parent div of the button
    parentDiv.remove(); // Remove the parent div
}