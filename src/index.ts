const addTodo = document.querySelector(
  "#submit-todo-button"
) as HTMLButtonElement;
const allTodos = document.querySelector(".all-todos") as HTMLUListElement;
const todoInput = document.querySelector("#todo-input") as HTMLInputElement;
const checkedBox = document.querySelector("#completed") as HTMLInputElement;
const todoText = document.querySelector("#todoText") as HTMLInputElement;

const addToList = (todoInput: HTMLInputElement): void => {
  const todoInputValue: string = todoInput.value;
  const todoList: HTMLLIElement = document.createElement("li");
  todoList.classList.add("todo-list");
  todoList.innerHTML = `
            <input type="checkbox" name="completed" id="completed" />
            <label for="completed" id="todoText" contenteditable="true">${todoInputValue}</label>
            <button type="button" id="delete-todo-button">Delete</button>`;
  allTodos.appendChild(todoList);
  todoInput.value = "";
};
addTodo.addEventListener("click", () => addToList(todoInput));

function checkBoxChange(todoInput: HTMLInputElement) {
  console.log("Checkedbox changed:", checkedBox.checked);
  if (checkedBox.checked) {
    todoInput.textContent = "line-through";
  } else {
    todoText.style.textDecoration = "none";
  }
}
checkedBox.addEventListener("change", () => checkBoxChange(todoInput));




