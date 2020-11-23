//UI Vars
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

// Load Items
loadItems();

// Call Event Listener
eventListeners();

//Load Items
function loadItems() {
  items = getItemsFromLS();

  items.forEach(function (item) {
    createItem(item);
  });
}

// Get Items From LocalStorage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

// Set Item to LocalStorage
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// Delete Item From LocalStorage
function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

// Create Item
function createItem(text) {
  // Create "li"
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  // Create "a"
  const a = document.createElement("a");
  a.className = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  // Add "li" to "ul"
  taskList.appendChild(li);

  //Add "a" to "li"
  li.appendChild(a);
}

function eventListeners() {
  // Submit Event
  form.addEventListener("submit", addNewItem);

  // Delete an Item Event
  taskList.addEventListener("click", deleteItem);

  // Delete All Items Event
  btnDeleteAll.addEventListener("click", deleteItemAll);
}

// Add New Item
function addNewItem(e) {
  e.preventDefault();
  if (input.value === "") {
    alert("Add new item");
  } else {
    // Create New Item
    createItem(input.value);

    // Save to LocalStorage
    setItemToLS(input.value);

    // Clear "Input"
    input.value = "";
  }
}

// Delete an Item
function deleteItem(e) {
  e.preventDefault();
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();
    // Delete Item From LocalStorage
    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
  }
}

// Delete Item All
function deleteItemAll(e) {
  e.preventDefault();
  if (confirm("Are you sure?")) {
    /* taskList.childNodes.forEach(function (item) {
      if (item.nodeType === 1) {
        item.remove();
      }
    }); */

    /* taskList.innerHTML = ""; */

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Delete All From LocalStorage
    localStorage.clear();
  }
}
