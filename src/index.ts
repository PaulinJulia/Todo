const addTodo = document.querySelector(
  "#submit-todo-button"
) as HTMLButtonElement;
const allTodos = document.querySelector(".all-todos") as HTMLUListElement;
const todoInput = document.querySelector("#todo-input") as HTMLInputElement;
const todoText = document.querySelector("#todoText") as HTMLDivElement;
const removeTodoButton = document.querySelector(
  ".remove-todo-button"
) as HTMLButtonElement;
const deleteAllButton = document.querySelector(
  ".delete-all-button"
) as HTMLButtonElement;
const deleteForm = document.querySelector(
  ".delete-all-form"
) as HTMLFormElement;
const deleteAll = document.querySelector("#delete-all") as HTMLButtonElement;
const cancelFormButton = document.querySelector(
  "#cancel-form-button"
) as HTMLButtonElement;

type Todo = {
  id: number;
  title: string;
  checkbox: boolean;
  textDecoration: boolean;
};

const todoListArray: Todo[] = [];

//Display Todos
async function displayTodos(todoListArray: Todo[]) {
  const todoListItem = await Promise.all(
    todoListArray.map((todo) => {
      let checkboxClass;
      let textDecorationClass = todo.checkbox ? "line-through" : "none";
      if (todo.checkbox) {
        checkboxClass = "bxs-checkbox-checked";
      } else {
        checkboxClass = "bx-checkbox";
      }
      return `
              <li class="todo-list">
                <i class="check bx ${checkboxClass}" data-checkbox-id="${todo.id}"></i>
                <div class="todoText" style="text-decoration: ${textDecorationClass};" data-edit-id="${todo.id}" contenteditable="true">${todo.title}</div>
                <div>
                <i class="edit bx bx-edit""></i>
                <i class="remove bx bx-trash-alt" data-remove-id="${todo.id}"></i>
                </div>
              </li>`;
    })
  );
  todoInput.value = "";
  allTodos.innerHTML = todoListItem.join("");
}

//Add todo to list and store in localstorage
const addToList = (todoInput: HTMLInputElement) => {
  const todo: Todo = {
    id: todoListArray.length,
    title: todoInput.value,
    checkbox: false,
    textDecoration: false,
  };
  todoListArray.push(todo);

  localStorage.setItem("todoData", JSON.stringify(todoListArray));
  displayTodos(todoListArray);
};

addTodo.addEventListener("click", () => addToList(todoInput));

//Toggle checkbox
document.addEventListener("click", function (e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains("check")) {
    const id = (e.target as HTMLElement).getAttribute("data-checkbox-id");
    const todo = todoListArray.find((todo) => todo.id === parseInt(id));
    if (todo) {
      todo.checkbox = !todo.checkbox;

      const textElement = document.querySelector(
        `.todoText[data-edit-id="${id}"]`
      ) as HTMLElement;

      if (textElement) {
        todo.textDecoration = !todo.textDecoration;
        if (todo.checkbox) {
          textElement.style.textDecoration = "line-through";
        } else {
          textElement.style.textDecoration = "none";
        }
      }
    }
    (e.target as HTMLElement).classList.toggle("bx-checkbox");
    (e.target as HTMLElement).classList.toggle("bxs-checkbox-checked");
    localStorage.setItem("todoData", JSON.stringify(todoListArray));
  }
});

//Display lagrade todos
let storedTodos = localStorage.getItem("todoData");
if (storedTodos) {
  const todoDataArray = JSON.parse(storedTodos);
  todoListArray.push(...todoDataArray);
  displayTodos(todoListArray);
}

//REMOVE a TODO
document.addEventListener("click", (e: Event) => {
  if ((e.target as HTMLElement).classList.contains("remove")) {
    const id = (e.target as HTMLElement).getAttribute("data-remove-id");
    let todosListArray: Todo[] = JSON.parse(
      localStorage.getItem("todoData") || "[]"
    );
    if (todosListArray) {
      todoListArray.splice(id, 1);
      let len = todoListArray.length;
      for (let i = 0; i < len; i++) {
        todoListArray[i].id = i;
      }
      localStorage.setItem("todoData", JSON.stringify(todoListArray));
      displayTodos(todoListArray);
    }
  }
});

//Delete all Todos
const cancelForm = () => {
  deleteForm.style.display = "none";
};
cancelFormButton.addEventListener("click", cancelForm);

const deleteAllTodos = () => {
  todoListArray.splice(0, todoListArray.length);
  localStorage.setItem("todoData", JSON.stringify(todoListArray));
  displayTodos(todoListArray);
};
deleteAll.addEventListener("click", deleteAllTodos);

const displayDeleteForm = () => {
  deleteForm.style.display = "flex";
};

deleteAllButton.addEventListener("click", displayDeleteForm);
