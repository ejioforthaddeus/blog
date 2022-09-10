const toggleBtn = document.querySelector(".toggle-btn");
const navLinks = document.querySelector(".nav-links");
const closeBtn = document.querySelector(".close-btn");
const darkmodeBtn = document.querySelector(".darkmode-btn");
const redmodeBtn = document.querySelector(".redmode-btn");
const model = document.querySelector(".model-section");
const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".cancel-btn");
toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show-navlinks");
});
closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("show-navlinks");
});

// Darkmode functionality
darkmodeBtn.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");
});
// redmode functionality
redmodeBtn.addEventListener("click", () => {
    document.body.classList.toggle("redmode");
  });

const inputTask = document.querySelector(".input-container input");
const addTaskBtn = document.querySelector(".addTask-btn");
const editTaskBtn = document.querySelector(".editTask-btn");
const alert = document.querySelector(".alert");
const tasksContainer = document.querySelector(".tasks ");

//  the code below help to add line break to a string
function wordWrap(str, maxWidth) {
  var newLineStr = "\n";
  let done = false;
  let res = "";
  while (str.length > maxWidth) {
    let found = false;
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i--) {
      if (testWhite(str.charAt(i))) {
        res = res + [str.slice(0, i), newLineStr].join("");
        str = str.slice(i + 1);
        found = true;
        break;
      }
    }
    // Inserts new line at maxWidth position, the word is too long to wrap
    if (!found) {
      res += [str.slice(0, maxWidth), newLineStr].join("");
      str = str.slice(maxWidth);
    }
  }

  return res + str;
}

function testWhite(x) {
  var white = new RegExp(/^\s$/);
  return white.test(x.charAt(0));
}

const showAllTasks = () => {
  let tasks = localStorage.getItem("tasks");
  tasks = JSON.parse(tasks) || [];
  const task = tasks
    .sort((a, b) => {
      return parseInt(b.id, 10) - parseInt(a.id, 10);
    })
    .map((task) => {
      let { title, id } = task;
      title = wordWrap(title, 20);
      return ` <div class="task" id="${id}">
            <p class="task-info">${title}</p>
           
          <div>
    <a href="#home">
    <i class="fa-solid fa-pen-to-square edit-btn"></i>
    </a>
              <i class="fa-solid fa-trash delete-btn"></i>
              </div>
              </div>`;
    })
    .join("");

  tasksContainer.innerHTML = task;

  // DELETE TASK

  const deleteBtns = document.querySelectorAll(".delete-btn");
  const editBtns = document.querySelectorAll(".edit-btn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      const currentTargetId = e.target.parentElement.parentElement.id;
      model.classList.add("show-model");

      confirmBtn.addEventListener("click", () => {
        deleteTask(currentTargetId, tasks);
        model.classList.remove("show-model");
      });
      cancelBtn.addEventListener("click", () => {
        model.classList.remove("show-model");
      });
    });
  });

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      addTaskBtn.style.display = `none`;
      editTaskBtn.style.display = `block`;
      const currentTargetId =
        e.target.parentElement.parentElement.parentElement.id;
      editTask(tasks, currentTargetId);
    });
  });
  if (tasks.length < 1) {
    tasksContainer.innerHTML = ` <p>You have no comment on your post.</p>`;
    return;
  }
};
window.addEventListener("DOMContentLoaded", () => {
  editTaskBtn.style.display = "none";
  showAllTasks();
});

const deleteTask = (currentTargetId, tasks) => {
  const currentTask = tasks.find((t) => t.id === currentTargetId);

  tasks = tasks.filter((item) => item.id !== currentTask.id);

  if (tasks.length < 1) {
    localStorage.setItem("tasks", JSON.stringify([]));
  } else {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  showAllTasks();
  alert.textContent = `Task deleted`;
  const timeout = setTimeout(() => {
    alert.textContent = ``;
  }, 1000);
};
const editTask = (tasks, currentTargetId) => {
  const edittasks = [...tasks];
  const currentTask = tasks.find((t) => t.id === currentTargetId);

  inputTask.value = currentTask.title;

  editTaskBtn.addEventListener("click", () => {
    addTaskBtn.style.display = `block`;
    editTaskBtn.style.display = `none`;
    const tempTasks = edittasks.filter((task) => {
      if (task.id === currentTargetId) {
        task.title = inputTask.value;
        console.log(tasks);
        return;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(edittasks));

    showAllTasks();
    alert.textContent = `Task updated`;
    const timeout = setTimeout(() => {
      alert.textContent = ``;
      inputTask.value = ``;
    }, 1000);
  });
};
let singleTask = {};

addTaskBtn.addEventListener("click", () => {
  let title = inputTask.value;

  let taskId = new Date().getTime().toString();
  let tasks = localStorage.getItem("tasks");
  tasks = JSON.parse(tasks) || [];
  singleTask = {
    title,
    id: taskId,
  };

  if (!title) {
    alert.textContent = `Please provide input a value`;
    const timeout = setTimeout(() => {
      alert.textContent = ``;
    }, 3000);
  } else {
    tasks.push(singleTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // inputTask.value = ``;
    alert.textContent = `Task added`;
    const timeout = setTimeout(() => {
      alert.textContent = ``;
      inputTask.value = ``;
    }, 1000);
    showAllTasks();
  }
});