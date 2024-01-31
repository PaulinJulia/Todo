const addTodo = document.querySelector(
  "#submit-todo-button"
) as HTMLButtonElement;
const allTodos = document.querySelector(".all-todos") as HTMLUListElement;
const todoInput = document.querySelector("#todo-input") as HTMLInputElement;
const checkBox = document.querySelector("#checkbox") as HTMLDivElement;
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
            <div id="checkbox"></div>
            <div class="todoText" contenteditable="true">${todoInputValue}</div>
            <div id="remove-todo-button"><box-icon name='trash-alt'></box-icon></div>`;
  allTodos.appendChild(todoList);
  todoInput.value = "";

  const todoData: Todo = {
    id: id,
    title: todoInputValue,
  };
  todoListArray.push(todoData);
};
addTodo.addEventListener("click", () => addToList(todoInput));

/* function checkBoxChange(checkBox: any): void {
    if (checkBox.classList.contains("checkBoxIcon")) {
      console.log("Klick");
      checkBox.classList.remove("checkBoxIcon");
    } else {
      checkBox.classList.add("checkBoxIcon");
    }
}
checkBox.addEventListener("click", () => checkBoxChange(checkBox)); */
