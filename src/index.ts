const addTodo = document.querySelector(
  "#submit-todo-button"
) as HTMLButtonElement;
const allTodos = document.querySelector(".all-todos") as HTMLUListElement;
const todoInput = document.querySelector("#todo-input") as HTMLInputElement;
const checkBox = document.querySelector(".checkBox") as HTMLButtonElement;
const removeTodoButton = document.querySelector(
  ".remove-todo-button"
) as HTMLInputElement;
const todoText = document.querySelector("#todoText") as HTMLInputElement;

const todoListArray: Todo[] = [];
type Todo = {
  id: number;
  title: string;
};
const id: number = todoListArray.length;

const addToList = (todoInput: HTMLInputElement): void => {
  const todoInputValue: string = todoInput.value;
  const todoList: HTMLLIElement = document.createElement("li");
  todoList.classList.add("todo-list");
  todoList.innerHTML = `
            <button class="checkBox"></div><box-icon name='checkBox' ></box-icon></button>
            <div class="todoText" contenteditable="true">${todoInputValue}</div>
            <div class="remove-todo-button"><box-icon name='trash-alt' ></box-icon></div>`;
  allTodos.appendChild(todoList);
  todoInput.value = "";

  const todoData: Todo = {
    id: id,
    title: todoInputValue,
  };
  todoListArray.push(todoData);
  localStorage.setItem("todoData", JSON.stringify(todoListArray));
};
addTodo.addEventListener("click", () => addToList(todoInput));

/* function checkBoxChange(checkBox: HTMLButtonElement) {
  console.log("klick");

  checkBox.classList.toggle("checkbox-checked");
}
checkBox.addEventListener("click", () => checkBoxChange(checkBox)); */
