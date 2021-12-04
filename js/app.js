const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(function () {
  const Model = {
    tasks: {},
  };

  const Controller = {
    createTask: (taskContent) => {
      const AllContent = Controller.getTasks().map((task) => task.taskContent);
      let task = {
        id: Date.now(),
        taskContent,
        completed: false,
      };

      // Check if the task is already exists
      AllContent.forEach((content) => {
        if (content == taskContent) {
          Helpers.showDialog(true);
          task = false;
        }
      });
      return task;
    },
    getTasks: () => Object.values(Model.tasks),
    updateLocalStorage: (tasks = Model.tasks) =>
      localStorage.setItem("tasks", JSON.stringify(tasks)),

    addTask: function (taskContent) {
      let task = this.createTask(taskContent);

      if (task != false) {
        Model.tasks[task.id] = task;
        this.updateLocalStorage();
        Views.render.add(task);
      }
    },
    removeTask: function (taskID) {
      delete Model.tasks[taskID];
      this.updateLocalStorage();
      Views.render.remove(taskID);
    },
    toggleTask: function (taskID) {
      Model.tasks[taskID].completed = !Model.tasks[taskID].completed;
      this.updateLocalStorage();
      Views.render.toggle(taskID);
    },

    removeAll: function () {
      Model.tasks = {};
      localStorage.removeItem("tasks");
      Views.render.removeAll();
      return Model.tasks;
    },
    completeAll: function () {
      Controller.getTasks().forEach(
        (task) => (Model.tasks[task.id].completed = true)
      );
      Controller.updateLocalStorage();
      Views.render.completeAll();
      return Model.tasks;
    },

    init: function () {
      if (localStorage.tasks) {
        Model.tasks = JSON.parse(localStorage.tasks);
      }
      Views.init();
    },
  };

  const Views = {
    init: function () {
      // [1] Add Task action
      const input = $(".controls input");
      const add = (e) => {
        e.preventDefault();
        input.value ? Controller.addTask(input.value) : Helpers.showDialog();
        input.value = "";
      };
      $(".controls .add-task").addEventListener("click", add);
      input.addEventListener("keydown", (e) => e.keyCode == 13 && add(e));

      // [2] Adding all Tasks
      const tasks = Controller.getTasks();
      tasks.length
        ? tasks.forEach((task) => this.render.add(task))
        : Helpers.addMsgTemplate();

      // [3] Handle App stats
      Helpers.updateUI();
      $(".stats .complete-all").onclick = Controller.completeAll;
      $(".stats .delete-all").onclick = Controller.removeAll;
    },

    render: {
      add: function (task) {
        $(".tasks .no-tasks") && $(".tasks .no-tasks").remove();
        $(".tasks").innerHTML += Helpers.taskTemplate(
          task.id,
          task.taskContent
        );

        $$(".tasks .task").forEach((ele) => {
          Helpers.setTaskActions(ele);
          task.completed && ele.classList.add("completed");
        });

        Helpers.updateUI();
      },

      remove: function (taskID) {
        $$(".tasks > .task").forEach(
          (ele) => ele.getAttribute("data-id") == taskID && ele.remove()
        );

        $(".tasks").childElementCount === 0 && Helpers.addMsgTemplate();
        Helpers.updateUI();
      },

      toggle: function (taskID) {
        $(`.task[data-id="${taskID}"]`).classList.toggle("completed");
        Helpers.updateUI();
      },

      completeAll: function () {
        $$(".tasks > *").forEach((ele) => ele.classList.add("completed"));
        Helpers.updateUI();
      },

      removeAll: function () {
        $$(".tasks > *").forEach((ele) => ele.remove());
        Helpers.addMsgTemplate();
        Helpers.updateUI();
      },
    },
  };

  const Helpers = {
    addMsgTemplate: () => ($(".tasks").innerHTML = $("#msg").innerHTML),

    taskTemplate: function (taskID, taskContent) {
      let task = $('script[data-template="task"]').innerHTML;

      task = task
        .replace("{{taskID}}", taskID)
        .replace(/{{taskContent}}/g, taskContent);

      return task;
    },

    setTaskActions: function (ele) {
      const actions = (e) => {
        e.target.classList.contains("delete-task")
          ? // [1] Delete Action
            Controller.removeTask(
              e.target.parentElement.getAttribute("data-id")
            )
          : // [2] Complete Action
            Controller.toggleTask(e.target.getAttribute("data-id"));
      };

      ele.addEventListener("click", actions);
      ele.addEventListener("keydown", (e) => {
        e.key === "Enter" && e.keyCode === 13 && actions();
      });
    },

    showDialog: function (repeatedTask = false) {
      const dialog = $("#dialog");
      const dialogLabel = $("#label");
      let msg;

      msg = repeatedTask
        ? "This task is already exists"
        : "Enter a valid value";

      dialogLabel.innerHTML = msg;
      dialog.classList.remove("hide");
      $("#dialog button").focus();

      dialog.onclick = () => dialog.classList.add("hide");
      dialog.onkeydown = (e) => {
        e.keyCode === 9 && e.preventDefault();
        e.keyCode === 27 && dialog.classList.add("hide");
      };
    },

    updateUI: () => {
      const completed = $(".stats .completed-tasks span");
      const tasksCounter = $(".stats .tasks-counter span");
      const statsBtns = $$(".stats button");
      const tasks = Controller.getTasks();
      const completedTasks = tasks.filter((task) => task.completed == true);
      const disabled = (ele) => {
        ele.tabIndex = -1;
        ele.classList.add("disabled");
      };
      const enabled = (ele) => {
        ele.tabIndex = 0;
        ele.classList.remove("disabled");
      };

      tasksCounter.innerHTML = tasks.length;
      completed.innerHTML = completedTasks.length;

      tasks.length ? statsBtns.forEach(enabled) : statsBtns.forEach(disabled);
      completedTasks.length == tasks.length &&
        disabled($(".stats .complete-all"));
    },
  };

  Controller.init();
})();
